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

## Deploy to Render

1. Push this repository to GitHub.
2. In Render, choose **New → Blueprint** and select the repository.
3. Render will use [`render.yaml`](./render.yaml) to configure the web service.
4. Deploy the service and open the generated URL.

The server binds to Render's `PORT` environment variable and exposes `GET /health`
for deployment health checks. Anthropic integration has not been added yet; when
it is implemented, its API key should be added to Render environment variables,
not committed to this repository.
