import { createReadStream, promises as fs } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";
import Busboy from "busboy";
import "dotenv/config";
import { PDFParse } from "pdf-parse";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const publicRoot = path.join(projectRoot, "src");
const port = Number.parseInt(process.env.PORT || "10000", 10);
const maxResumeBytes = 10 * 1024 * 1024;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8"
};

function sendText(response, statusCode, body, contentType = "text/plain; charset=utf-8") {
  response.writeHead(statusCode, {
    "Content-Type": contentType,
    "Content-Length": Buffer.byteLength(body)
  });
  response.end(body);
}

function sendJson(response, statusCode, body) {
  sendText(response, statusCode, JSON.stringify(body), "application/json; charset=utf-8");
}

function readUpload(request) {
  return new Promise((resolve, reject) => {
    const fields = {};
    let resume = null;
    let fileTooLarge = false;
    let parser;

    try {
      parser = Busboy({
        headers: request.headers,
        limits: { fileSize: maxResumeBytes, files: 1, fields: 2 }
      });
    } catch {
      reject(Object.assign(new Error("Expected a multipart form submission."), { statusCode: 400 }));
      return;
    }

    parser.on("field", (name, value) => {
      fields[name] = value;
    });

    parser.on("file", (name, stream, info) => {
      const chunks = [];
      stream.on("limit", () => {
        fileTooLarge = true;
      });
      stream.on("data", chunk => chunks.push(chunk));
      stream.on("end", () => {
        resume = { filename: info.filename, mimeType: info.mimeType, buffer: Buffer.concat(chunks) };
      });
    });

    parser.on("error", reject);
    parser.on("finish", () => {
      if (fileTooLarge) {
        reject(Object.assign(new Error("The resume must be 10 MB or smaller."), { statusCode: 413 }));
        return;
      }
      resolve({ fields, resume });
    });
    request.pipe(parser);
  });
}

async function extractPdfText(buffer) {
  const parser = new PDFParse({ data: buffer });
  try {
    const result = await parser.getText();
    return result.text.trim();
  } finally {
    await parser.destroy();
  }
}

async function analyzeResume(request, response) {
  if (!process.env.ANTHROPIC_API_KEY) {
    sendJson(response, 503, { error: "The Anthropic API key is not configured on the server." });
    return;
  }

  const { fields, resume } = await readUpload(request);
  const jobDescription = fields.jobDescription?.trim();
  if (!resume || !jobDescription) {
    sendJson(response, 400, { error: "A PDF resume and job description are required." });
    return;
  }
  if (!resume.filename.toLowerCase().endsWith(".pdf") || resume.mimeType !== "application/pdf") {
    sendJson(response, 400, { error: "Please upload a PDF resume." });
    return;
  }
  if (!resume.buffer.subarray(0, 5).equals(Buffer.from("%PDF-"))) {
    sendJson(response, 400, { error: "The uploaded file is not a valid PDF." });
    return;
  }

  let resumeText;
  try {
    resumeText = await extractPdfText(resume.buffer);
  } catch (error) {
    console.error("Failed to extract resume text:", error);
    sendJson(response, 422, { error: "The PDF could not be read. Please upload a text-based PDF." });
    return;
  }
  if (!resumeText) {
    sendJson(response, 422, { error: "No readable text was found in the PDF." });
    return;
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1200,
    system: "You are a careful resume reviewer. Only use evidence present in the resume and job description. Return valid JSON only, with no markdown.",
    messages: [{
      role: "user",
      content: `Compare this resume to the job description.

Resume:
${resumeText.slice(0, 30000)}

Job description:
${jobDescription}

Return exactly this JSON shape:
{
  "score": 0,
  "summary": "one concise sentence",
  "strengths": ["short item", "short item", "short item"],
  "gaps": ["short item", "short item", "short item"],
  "recommendations": ["specific action", "specific action", "specific action"]
}
The score must be an integer from 0 to 100.`
    }]
  });

  const responseText = message.content.find(block => block.type === "text")?.text;
  if (!responseText) {
    throw new Error("Anthropic returned no text.");
  }
  let analysis;
  try {
    analysis = JSON.parse(responseText);
  } catch {
    throw new Error("Anthropic returned invalid analysis JSON.");
  }
  sendJson(response, 200, analysis);
}

async function resolvePublicFile(requestUrl) {
  const requestPath = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  const relativePath = requestPath === "/" ? "index.html" : requestPath.slice(1);
  const resolvedPath = path.resolve(publicRoot, relativePath);

  if (resolvedPath !== publicRoot && !resolvedPath.startsWith(`${publicRoot}${path.sep}`)) {
    return null;
  }

  try {
    const fileStats = await fs.stat(resolvedPath);
    return fileStats.isFile() ? resolvedPath : null;
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      return null;
    }
    throw error;
  }
}

const server = createServer(async (request, response) => {
  const requestPath = new URL(request.url || "/", "http://localhost").pathname;
  if (request.method === "POST" && requestPath === "/api/analyze") {
    try {
      await analyzeResume(request, response);
    } catch (error) {
      console.error("Analysis request failed:", error);
      if (!response.headersSent) {
        sendJson(response, error.statusCode || 500, {
          error: error.statusCode ? error.message : "The analysis could not be completed."
        });
      }
    }
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    sendText(response, 405, "Method Not Allowed");
    return;
  }

  if (requestPath === "/health") {
    sendText(response, 200, "ok");
    return;
  }

  try {
    const filePath = await resolvePublicFile(request.url || "/");
    if (!filePath) {
      sendText(response, 404, "Not Found");
      return;
    }

    const contentType = contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    const fileStats = await fs.stat(filePath);
    response.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": fileStats.size
    });

    if (request.method === "HEAD") {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch (error) {
    console.error("Failed to serve request:", error);
    if (!response.headersSent) {
      sendText(response, 500, "Internal Server Error");
    } else {
      response.destroy(error);
    }
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`ResumeIQ server listening on port ${port}`);
});
