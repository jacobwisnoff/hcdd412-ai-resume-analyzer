# Use JavaScript as the Primary Programming Language

- Status: Accepted
- Date: 2026-10-01

## Context and Problem Statement

The AI Resume Analyzer requires both frontend and backend functionality. The team needs a programming language that can be used consistently across the application and integrates well with Node.js and the selected web technologies.

## Decision Drivers

- Compatibility with Node.js
- Ability to develop both frontend and backend functionality
- Large ecosystem of libraries
- Integration with MongoDB
- Familiarity among team members
- Availability of tools for web development and AI integration

## Considered Options

- JavaScript
- Python
- Java

## Decision Outcome

Chosen option: JavaScript, because it can be used throughout the application's frontend and backend while providing direct compatibility with Node.js and MongoDB.

## Consequences

### Positive Consequences

- The team can use one primary language across the project.
- JavaScript has extensive web-development libraries.
- JavaScript integrates directly with Node.js.
- MongoDB provides strong JavaScript and Node.js support.
- The team can reuse knowledge between frontend and backend development.

### Negative Consequences

- JavaScript's dynamic typing can allow certain errors to go undetected until runtime.
- Managing asynchronous code can add complexity.
- The team must establish coding standards to maintain consistency.

## Confirmation

The decision will be considered successful if the team can develop the application's frontend, backend, database interactions, and AI-related functionality primarily using JavaScript.
