# Improve Analysis Feedback, Resilience, and Input Guardrails

- Status: Accepted
- Date: 2026-10-31
- Tags: ux results error-handling validation prompt-design

## Context and Problem Statement

The resume analysis flow needs to communicate AI output clearly, remain understandable while the hosted server is starting, and provide actionable feedback when an analysis cannot be completed. A single run-on results line, an unqualified score, and opaque loading or server errors make it difficult for users to interpret results or recover from failures.

The application also needs explicit resource and content boundaries. Resume uploads must not exceed the service's practical limits, job descriptions must be bounded before and during processing, and generated insights must remain concise enough to scan.

## Decision Drivers

- Make analysis results scannable and actionable
- Explain score quality without requiring users to infer meaning from a number
- Help users understand missing keywords and improve alignment
- Set expectations during Render cold starts
- Distinguish application errors from unexpected HTML/proxy responses
- Prevent oversized uploads and oversized server-side inputs
- Keep generated insights concise and consistent
- Preserve a simple single-screen analysis flow from ADR-0004

## Considered Options

1. Improve the existing results and submission flow incrementally
2. Replace the results page with a dashboard and introduce a separate validation service
3. Return raw model output and rely on users to interpret it

## Decision Outcome

Chosen option: Improve the existing results and submission flow incrementally.

The results view will render each result as a bullet list rather than one run-on line. The AI response will include missing keywords, which will be displayed as tags beneath the score so users can quickly identify gaps in their resume-to-role match. The score will use semantic color coding for strong, partial, and weak results; the color must be paired with text or other accessible labeling and must not be the only indication of status.

While an analysis request is pending, the interface will show a loading spinner and a “server waking up” message to set expectations for Render cold starts. Errors will be displayed in red with a clear, user-facing message. If the server returns HTML instead of the expected API response, the client will show a friendly fallback message rather than exposing raw markup or an opaque parsing error.

The results view will include a “Copy results” button that copies the human-readable analysis to the clipboard. The client will reject resume uploads larger than 10 MB before sending them. The server will enforce a 5,000-character limit for job-description input regardless of client behavior, returning a clear validation error when the limit is exceeded. The analysis prompt will cap each generated insight at 20 words to keep output concise and scannable.

This option was selected because it improves clarity and reliability at the existing product boundaries, addresses both normal and failure states, and avoids introducing a separate service or a larger navigation model for a focused analysis tool.

## Consequences

### Positive Consequences

- Results are easier to scan and compare.
- Missing keywords turn the score into an actionable improvement signal.
- Semantic score states make strong, partial, and weak outcomes immediately recognizable.
- Cold-start messaging reduces uncertainty while the Render service wakes up.
- Friendly error handling prevents raw HTML and implementation details from reaching users.
- Copying results supports sharing, notes, and downstream job-application workflows.
- Client- and server-side limits reduce avoidable processing, memory, and request failures.
- A 20-word insight cap keeps AI output focused and consistent.

### Negative Consequences

- Color coding requires accessible text or equivalent status labels and additional visual-state testing.
- Clipboard access may be unavailable or restricted in some browsers, so the button needs a visible failure state or fallback.
- A 10 MB client check does not replace server-side upload validation if other clients call the API directly.
- The 5,000-character limit can exclude unusually long job descriptions.
- A strict 20-word cap can remove nuance from complex insights and may require prompt tuning.
- HTML-response detection adds client-side response handling beyond normal JSON parsing.

## Pros and Cons of the Options

### Improve the Existing Results and Submission Flow

- Good, because it directly addresses the observed usability and reliability problems.
- Good, because it preserves the single-screen flow and existing backend boundary.
- Good, because validation and prompt limits reduce failures without new infrastructure.
- Bad, because the client must handle additional loading, error, clipboard, and response states.

### Replace the Results Page with a Dashboard and Introduce a Separate Validation Service

- Good, because it could support richer analytics and centralized validation.
- Good, because additional result types could be added without expanding one view.
- Bad, because it adds infrastructure and operational complexity disproportionate to the current flow.
- Bad, because it increases implementation time and creates another service boundary to maintain.

### Return Raw Model Output and Rely on Users to Interpret It

- Good, because it minimizes formatting and prompt work.
- Good, because it preserves more of the model's original wording.
- Bad, because run-on or unconstrained output is difficult to scan.
- Bad, because users receive less actionable guidance and less predictable behavior.
- Bad, because it does not address cold starts, malformed responses, or input limits.

## Confirmation

This decision will be considered successful if users can identify the score state and missing keywords at a glance, copy a readable result, understand that a cold-start request is still progressing, and receive a useful recovery message for invalid input or server failure. The implementation should be reviewed if users cannot distinguish score states without color, clipboard failures are common, the 5,000-character limit blocks common job descriptions, or the 20-word cap consistently produces incomplete insights.

## Links

- Refines [ADR-0004: Use a Single-Screen, Side-by-Side Input Form for the Core Analysis Flow](ADR-0004-core-input-interaction-pattern.md)
