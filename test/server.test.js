// Smoke tests for the HTTP server. They never call the Anthropic API.
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { after, before, test } from "node:test";

const port = 10987;
const base = `http://127.0.0.1:${port}`;
let server;

before(async () => {
  server = spawn(process.execPath, ["server.js"], {
    env: { ...process.env, PORT: String(port), ANTHROPIC_API_KEY: "test-key-not-used" },
    stdio: ["ignore", "pipe", "inherit"]
  });
  // Wait until the server logs that it is listening.
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Server did not start")), 10000);
    server.stdout.on("data", (chunk) => {
      if (chunk.toString().includes("listening")) {
        clearTimeout(timer);
        resolve();
      }
    });
  });
});

after(() => server?.kill());

test("health check returns ok", async () => {
  const response = await fetch(`${base}/health`);
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "ok");
});

test("home page is served", async () => {
  const response = await fetch(base);
  assert.equal(response.status, 200);
  assert.match(await response.text(), /ResumeIQ/);
});

test("path traversal is blocked", async () => {
  const response = await fetch(`${base}/..%2fserver.js`);
  assert.equal(response.status, 404);
});

test("analyze rejects non-multipart requests", async () => {
  const response = await fetch(`${base}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}"
  });
  assert.equal(response.status, 400);
});

test("analyze requires both a resume and a job description", async () => {
  const form = new FormData();
  form.append("jobDescription", "Product manager role");
  const response = await fetch(`${base}/api/analyze`, { method: "POST", body: form });
  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /required/);
});

test("analyze rejects an over-long job description", async () => {
  const form = new FormData();
  form.append("resume", new Blob(["%PDF-1.4 test"], { type: "application/pdf" }), "resume.pdf");
  form.append("jobDescription", "x".repeat(5001));
  const response = await fetch(`${base}/api/analyze`, { method: "POST", body: form });
  assert.equal(response.status, 400);
  assert.match((await response.json()).error, /5,000/);
});
