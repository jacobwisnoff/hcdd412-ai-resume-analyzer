# Use Node.js for the Backend

- Status: Accepted
- Date: 2026-10-01

## Context and Problem Statement

The application requires a backend to process uploaded resumes, communicate with MongoDB, analyze job descriptions, interact with AI services, and provide data to the frontend. The backend needs to integrate with the project's JavaScript-based technology stack.

## Decision Drivers

- JavaScript compatibility
- Integration with MongoDB
- Support for REST APIs
- Large ecosystem of packages
- Efficient handling of web requests
- Compatibility with GitHub Actions

## Considered Options

- Node.js
- Python
- Java

## Decision Outcome

Chosen option: Node.js, because it provides a JavaScript-based backend environment and integrates well with MongoDB and the rest of the project's web technologies.

## Consequences

### Positive Consequences

- The frontend and backend can share JavaScript knowledge.
- Node.js provides a large ecosystem of web-development packages.
- MongoDB integration is straightforward.
- REST APIs can be developed for communication between the frontend and backend.
- Node.js applications can be easily tested through GitHub Actions.

### Negative Consequences

- CPU-intensive processing can block the event loop if not handled appropriately.
- The team will need to manage dependencies carefully.
- Additional libraries may be required for processing PDF or DOCX resumes.

## Confirmation

The decision will be considered successful if the Node.js backend can receive resume and job-description data, communicate with MongoDB, perform analysis operations, and return results to the frontend through an API.
