const resumeFile = document.querySelector("#resume-file");
const dropZone = document.querySelector("#drop-zone");
const fileSelected = document.querySelector("#file-selected");
const fileName = document.querySelector("#file-name");
const removeFile = document.querySelector("#remove-file");
const jobDescription = document.querySelector("#job-description");
const characterCount = document.querySelector("#character-count");
const analyzeButton = document.querySelector("#analyze-button");
const analyzeLabel = document.querySelector("#analyze-label");
const sampleButton = document.querySelector("#sample-button");
const formMessage = document.querySelector("#form-message");
const results = document.querySelector("#results");
const copyButton = document.querySelector("#copy-button");
const maxResumeBytes = 10 * 1024 * 1024;

const sampleDescription = `We are looking for a Product Manager to lead the development of customer-focused digital products. You will collaborate with engineering, design, and marketing teams to define product strategy, prioritize the roadmap, and deliver measurable outcomes.

The ideal candidate has 3+ years of product management experience, strong communication skills, and a track record of working in Agile environments. Experience with user research, data analysis, stakeholder management, and SaaS products is preferred.`;

function updateFormState() {
  const hasResume = Boolean(resumeFile.files.length);
  const hasDescription = Boolean(jobDescription.value.trim());
  analyzeButton.disabled = !hasResume || !hasDescription;
  characterCount.textContent = `${jobDescription.value.length.toLocaleString()} / 5,000`;
}

function showSelectedFile(file) {
  if (!file) return;
  if (file.size > maxResumeBytes) {
    resumeFile.value = "";
    setMessage("That file is over 10 MB. Please choose a smaller PDF.", true);
    updateFormState();
    return;
  }
  fileName.textContent = file.name;
  dropZone.hidden = true;
  fileSelected.hidden = false;
  setMessage("");
  updateFormState();
}

resumeFile.addEventListener("change", () => showSelectedFile(resumeFile.files[0]));
jobDescription.addEventListener("input", updateFormState);

removeFile.addEventListener("click", () => {
  resumeFile.value = "";
  dropZone.hidden = false;
  fileSelected.hidden = true;
  updateFormState();
});

["dragenter", "dragover"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.add("drag-over");
  });
});

["dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    dropZone.classList.remove("drag-over");
  });
});

dropZone.addEventListener("drop", (event) => {
  const [file] = event.dataTransfer.files;
  if (!file) return;
  const allowedTypes = [".pdf"];
  const extension = `.${file.name.split(".").pop().toLowerCase()}`;
  if (!allowedTypes.includes(extension)) {
    setMessage("Please choose a PDF file.", true);
    return;
  }
  const transfer = new DataTransfer();
  transfer.items.add(file);
  resumeFile.files = transfer.files;
  showSelectedFile(file);
});

sampleButton.addEventListener("click", () => {
  jobDescription.value = sampleDescription;
  jobDescription.focus();
  setMessage("Sample job description added.");
  updateFormState();
});

let lastAnalysis = null;

function fillList(listElement, items) {
  listElement.replaceChildren(...items.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));
}

function scoreBand(score) {
  if (score >= 75) return { label: "Strong match", className: "band-strong" };
  if (score >= 50) return { label: "Partial match", className: "band-partial" };
  return { label: "Weak match", className: "band-weak" };
}

function renderAnalysis(analysis) {
  lastAnalysis = analysis;
  const band = scoreBand(analysis.score);
  const scoreCard = document.querySelector(".score-card");
  scoreCard.classList.remove("band-strong", "band-partial", "band-weak");
  scoreCard.classList.add(band.className);

  document.querySelector("#score-value").textContent = analysis.score;
  document.querySelector("#score-band").textContent = band.label;
  document.querySelector("#score-summary").textContent = analysis.summary;
  // Animate the bar from 0 so the score feels "computed" rather than static.
  const bar = document.querySelector("#score-bar");
  bar.style.width = "0%";
  requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.width = `${analysis.score}%`; }));

  fillList(document.querySelector("#strengths-list"), analysis.strengths);
  fillList(document.querySelector("#gaps-list"), analysis.gaps);
  fillList(document.querySelector("#recommendations-list"), analysis.recommendations);

  const keywords = analysis.missingKeywords || [];
  document.querySelector("#keywords-block").hidden = keywords.length === 0;
  fillList(document.querySelector("#keyword-list"), keywords);
}

function setMessage(text, isError = false) {
  formMessage.textContent = text;
  formMessage.classList.toggle("is-error", isError);
}

function setLoading(isLoading) {
  analyzeButton.classList.toggle("is-loading", isLoading);
  analyzeButton.setAttribute("aria-busy", String(isLoading));
}

analyzeButton.addEventListener("click", async () => {
  analyzeButton.disabled = true;
  setLoading(true);
  analyzeLabel.textContent = "Analyzing...";
  setMessage("Reviewing your resume. This can take a few seconds.");
  // The free hosting tier sleeps when idle, so the first request can be slow.
  const slowNotice = setTimeout(() => {
    setMessage("Still working… the server may be waking up. The first analysis can take up to a minute.");
  }, 12000);

  const formData = new FormData();
  formData.append("resume", resumeFile.files[0]);
  formData.append("jobDescription", jobDescription.value.trim());

  try {
    const response = await fetch("/api/analyze", { method: "POST", body: formData });
    let data;
    try {
      data = await response.json();
    } catch {
      // Hosting errors (e.g. a 502 page) come back as HTML, not JSON.
      throw new Error("The server didn't respond correctly. Please wait a moment and try again.");
    }
    if (!response.ok) throw new Error(data.error || "The analysis could not be completed.");
    renderAnalysis(data);
    results.hidden = false;
    analyzeLabel.textContent = "Analyze again";
    setMessage("Analysis complete.");
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    setMessage(error.message, true);
    analyzeLabel.textContent = "Try again";
  } finally {
    clearTimeout(slowNotice);
    setLoading(false);
    updateFormState();
  }
});

copyButton.addEventListener("click", async () => {
  if (!lastAnalysis) return;
  const a = lastAnalysis;
  const section = (title, items) => `${title}\n${items.map((item) => `- ${item}`).join("\n")}`;
  const text = [
    `ResumeIQ match: ${a.score}% (${scoreBand(a.score).label})`,
    a.summary,
    section("Strengths", a.strengths),
    section("Could be stronger", a.gaps),
    section("Next best moves", a.recommendations),
    a.missingKeywords?.length ? `Missing keywords: ${a.missingKeywords.join(", ")}` : ""
  ].filter(Boolean).join("\n\n");
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = "Copied!";
  } catch {
    copyButton.textContent = "Copy failed — select the text manually";
  }
  setTimeout(() => { copyButton.textContent = "Copy results"; }, 2000);
});

updateFormState();
