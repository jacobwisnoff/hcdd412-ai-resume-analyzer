# HCDD412 AI Resume Analyzer

An AI-assisted resume analyzer that helps users evaluate how well their resume matches a job opportunity.

## Project Overview

Users submit their resume and paste a job description. The analyzer compares the keywords and skills found in both documents and returns a match score that indicates how closely the resume aligns with the position.

## How It Works

1. The user submits a resume.
2. The user pastes a job description.
3. The application extracts relevant keywords and skills from both inputs.
4. The analyzer compares the results.
5. The user receives a match score based on the overlap between the resume and job description.

## Planned Features

- Resume upload and text extraction
- Job description text input
- Keyword and skill matching
- Resume-to-job match score
- Identification of missing or underrepresented keywords
- Suggestions for improving resume alignment

## Use Case

The project is intended to help job seekers quickly understand whether their resume highlights the qualifications and terminology employers are looking for in a specific job description.

## Project Status

This project is currently in development.

## Run Locally

The application uses a small Node.js server so the same command can run locally
and on Render.

```bash
npm start
```

Then open <http://localhost:10000>.

## Configure the Anthropic API key

The Anthropic API key must only be available to the server. Do not add it to
`src/`, commit it to GitHub, or paste it into browser developer tools.

For local development, copy `.env.example` to `.env` and set
`ANTHROPIC_API_KEY` in that file. The application reads environment variables
provided by the process; if your local Node setup does not load `.env` files,
set the variable in your shell before starting the server. For PowerShell:

```powershell
$env:ANTHROPIC_API_KEY = "your-key"
npm start
```

For Render, create the service from [`render.yaml`](./render.yaml), then add
the key under **Environment → Environment Variables**. The Blueprint marks
`ANTHROPIC_API_KEY` as a secret value that must be entered in the Render
dashboard; it is not stored in this repository.

For Azure App Service, set the application setting through Azure rather than
putting the value in [`infra/main.bicep`](./infra/main.bicep):

```bash
az webapp config appsettings set \
  --resource-group <resource-group> \
  --name <app-name> \
  --settings ANTHROPIC_API_KEY="<your-key>"
```

If a key has ever been committed or shared publicly, revoke it in the
Anthropic console and create a replacement before using it.

## Deploy to Render

1. Push this repository to GitHub.
2. In Render, choose **New → Blueprint** and select the repository.
3. Render will use [`render.yaml`](./render.yaml) to configure the web service.
4. Deploy the service and open the generated URL.

The server binds to Render's `PORT` environment variable and exposes `GET /health`
for deployment health checks. The user interface is still in demo mode; the
server-side key configuration is ready for the future Anthropic analysis
endpoint.
