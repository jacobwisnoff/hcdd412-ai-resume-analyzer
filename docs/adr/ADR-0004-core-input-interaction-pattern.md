# Use a Single-Screen, Side-by-Side Input Form for the Core Analysis Flow

- Status: Accepted
- Date: 2026-10-22
- Tags: ux design interaction-pattern user-flow

## Context and Problem Statement

The core flow of the AI Resume Analyzer requires the user to provide two inputs, a resume and a job description, before the application can run an analysis. How these inputs are collected determines how quickly users reach their results, how clearly the application communicates what it needs, and how often users abandon the flow or submit incomplete information.

The team needs an interaction pattern for this input step that is easy to understand on first use, makes both required inputs obvious, prevents incomplete submissions, and fits the application's single primary task of comparing one resume against one role.

The team considered a single-screen side-by-side form, a multi-step wizard, and a conversational chat-style interface.

## Decision Drivers

- Minimize the number of steps between landing on the site and receiving an analysis
- Make both required inputs visible and clearly labeled
- Prevent users from submitting an incomplete analysis request
- Reduce confusion for first-time users with no onboarding
- Reflect the comparative nature of the task (resume vs. job description)
- Keep input constraints (file type, file size, character limits) visible before submission
- Support users who do not have a job description ready
- Low implementation complexity for the team's timeline
- Compatibility with the backend analysis flow defined in ADR-0001

## Considered Options

1. Single-screen side-by-side input form
2. Multi-step wizard
3. Conversational chat-style interface

## Decision Outcome

Chosen option: Single-screen side-by-side input form.

Both inputs will be presented together on the landing page inside a single input card. The resume upload panel (labeled 01) and the job description panel (labeled 02) will sit side by side, with the primary "Analyze my resume" action below them. The resume panel will support drag-and-drop with a "browse files" fallback and will display its constraints (PDF only, 10MB maximum). The job description panel will use a text area with a visible character counter (5,000 characters maximum) and guidance to include responsibilities and requirements.

The "Analyze my resume" button will remain disabled until both inputs are provided. A "Use a sample job description" link will let users try the tool without first finding a posting.

This option was selected because the analysis is fundamentally a comparison between two documents, and placing them side by side communicates that relationship directly. It keeps the entire input step on one screen, makes the requirements visible up front, and lets users reach results with the fewest possible interactions.

## Consequences

### Positive Consequences

- Users can see everything required for an analysis at a glance without navigating between steps.
- The side-by-side layout reinforces the comparison between the resume and the job description.
- Disabling the submit action until both inputs are present prevents incomplete analysis requests.
- Displaying file type, file size, and character limits up front reduces failed submissions.
- The sample job description lowers the barrier for first-time users exploring the tool.
- Numbered panels (01, 02) provide a lightweight sense of order without the overhead of a wizard.
- The pattern requires less state management and routing than a multi-step flow.

### Negative Consequences

- The side-by-side layout must collapse into a stacked layout on narrow screens, requiring responsive design work.
- A disabled submit button can be unclear if users do not understand which input is missing; the interface should indicate what remains.
- Drag-and-drop upload must be paired with an accessible keyboard and screen-reader alternative ("browse files").
- Restricting uploads to PDF narrows support compared to the PDF and DOCX processing anticipated in ADR-0001; DOCX support may need to be added later.
- The 5,000-character limit may truncate unusually long job descriptions.
- A single screen leaves less room for contextual guidance than a step-by-step flow would provide.

## Pros and Cons of the Options

### Single-Screen Side-by-Side Input Form

- Good, because both required inputs are visible at once.
- Good, because the layout mirrors the comparative nature of the analysis.
- Good, because it minimizes clicks and screens between landing and results.
- Good, because input constraints and validation are visible before submission.
- Good, because it is simple to implement and maintain.
- Bad, because it requires responsive adjustments for mobile screens.
- Bad, because it provides limited space for detailed instructions.

### Multi-Step Wizard

- Good, because each step can focus the user on a single input.
- Good, because each step can include more detailed guidance and validation.
- Bad, because it adds screens and navigation to a flow with only two inputs.
- Bad, because users cannot see both inputs together, obscuring the comparison.
- Bad, because it requires additional state management between steps.
- Bad, because the added steps increase opportunities for users to abandon the flow.

### Conversational Chat-Style Interface

- Good, because it aligns with the AI-powered nature of the product.
- Good, because it could support follow-up questions after the analysis.
- Bad, because the required inputs and their constraints are less discoverable.
- Bad, because pasting long job descriptions and uploading files fits poorly in a chat message pattern.
- Bad, because it makes it harder to guarantee both inputs are provided before analysis.
- Bad, because it adds significant interface and conversation-state complexity.
- Bad, because open-ended chat may set expectations the analysis feature is not designed to meet.

## Confirmation

This decision will be considered successful if first-time users can upload a resume, provide a job description, and start an analysis from the landing page without assistance, and if incomplete or invalid submissions are prevented before they reach the backend. The team should validate this through usability testing with representative users and review the decision if testing shows users struggle to identify missing inputs, if mobile usability suffers, or if follow-up interaction with results becomes a core requirement that a conversational pattern would better support.