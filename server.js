import { createReadStream, promises as fs } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
const publicRoot = path.join(projectRoot, "src");
const port = Number.parseInt(process.env.PORT || "10000", 10);

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
  if (request.method !== "GET" && request.method !== "HEAD") {
    sendText(response, 405, "Method Not Allowed");
    return;
  }

  const requestPath = new URL(request.url || "/", "http://localhost").pathname;
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
