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
  fileName.textContent = file.name;
  dropZone.hidden = true;
  fileSelected.hidden = false;
  formMessage.textContent = "";
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
  const allowedTypes = [".pdf", ".doc", ".docx", ".txt"];
  const extension = `.${file.name.split(".").pop().toLowerCase()}`;
  if (!allowedTypes.includes(extension)) {
    formMessage.textContent = "Please choose a PDF, DOC, DOCX, or TXT file.";
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
  formMessage.textContent = "Sample job description added.";
  updateFormState();
});

analyzeButton.addEventListener("click", () => {
  analyzeButton.disabled = true;
  analyzeLabel.textContent = "Analyzing...";
  formMessage.textContent = "Demo analysis complete. Anthropic API integration will be added later.";
  window.setTimeout(() => {
    results.hidden = false;
    analyzeLabel.textContent = "Analyze again";
    analyzeButton.disabled = false;
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 700);
});

updateFormState();
