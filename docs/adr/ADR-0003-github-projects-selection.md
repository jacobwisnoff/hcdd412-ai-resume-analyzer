# Use GitHub Projects for Team Work Management

- Status: Accepted
- Date: 2026-10-16
- Tags: project-management collaboration planning

## Context and Problem Statement

The AI Resume Analyzer team needs a shared work-management tool to plan project activities, prioritize work, track progress, and coordinate responsibilities. The tool should support the team's existing development workflow, which is centered on GitHub repositories, issues, pull requests, and project documentation.

The team considered GitHub Projects, Trello, and Azure Boards. We need a solution that minimizes context switching, supports transparent collaboration, and is practical for the size and needs of this project.

## Decision Drivers

- Integration with the project's GitHub repository
- Ability to link work items directly to issues and pull requests
- Low setup and maintenance overhead
- Clear visibility into work status and priorities
- Support for collaborative planning and task ownership
- Ease of adoption for all team members
- Availability within the team's existing development workflow
- Suitability for a small academic software project
- Ability to adapt the board as project requirements change

## Considered Options

1. GitHub Projects
2. Trello
3. Azure Boards

## Decision Outcome

Chosen option: GitHub Projects.

The team will use GitHub Projects as the primary tool for planning and tracking project work. GitHub Issues will represent actionable work items, and pull requests will be linked to those issues when implementation begins. The project board will be used to organize priorities, assign work, track status, and provide a shared view of project progress.

GitHub Projects was selected because it keeps planning close to the repository and development workflow. Team members can create, discuss, update, and complete work without maintaining a separate task-management system. This reduces duplication and makes the relationship between planned work, source-code changes, and review activity easier to understand.

## Consequences

### Positive Consequences

- Work items remain connected to the repository, issues, pull requests, and code changes.
- The team can use one primary platform for source control, code review, documentation, and project tracking.
- Linking issues to pull requests improves traceability from requirements to implementation.
- Team members can see project status without switching between unrelated tools.
- GitHub Projects supports flexible views and fields that can evolve with the project.
- The team avoids maintaining duplicate tasks across GitHub and an external planning tool.
- Project activity remains visible and auditable through GitHub history.
- The decision aligns project management with the existing GitHub-based collaboration workflow.

### Negative Consequences

- GitHub Projects may provide fewer specialized project-management features than Azure Boards.
- Team members must learn how to use GitHub Projects effectively in addition to GitHub Issues and pull requests.
- A poorly maintained board can become out of date or fail to reflect the actual project state.
- GitHub Projects may be less suitable if the team later requires advanced portfolio planning, detailed work-item hierarchies, or enterprise reporting.
- The team remains dependent on GitHub availability and on the features supported by GitHub Projects.
- Planning discussions that are not connected to issues or pull requests may be less visible unless the team documents them consistently.

## Pros and Cons of the Options

### GitHub Projects

- Good, because it integrates directly with the repository and GitHub Issues.
- Good, because pull requests can be connected to planned work for end-to-end traceability.
- Good, because it reduces context switching and duplicate data entry.
- Good, because the team already uses GitHub for source control and collaboration.
- Good, because it is appropriate for a small project with lightweight planning needs.
- Bad, because it may not offer the same depth of enterprise planning and reporting as Azure Boards.
- Bad, because the quality of project tracking depends on consistent team maintenance.

### Trello

- Good, because its card-and-board model is easy to understand and adopt.
- Good, because it supports lightweight task tracking and flexible organization.
- Bad, because work items would be managed outside the GitHub repository.
- Bad, because linking cards to issues, pull requests, and code changes would require additional coordination.
- Bad, because maintaining both Trello and GitHub could create duplicated or inconsistent project information.
- Bad, because repository-specific development context is less centralized than with GitHub Projects.

### Azure Boards

- Good, because it provides strong work-item tracking, backlogs, queries, sprint planning, and reporting.
- Good, because it can support more formal Agile and enterprise-scale planning processes.
- Good, because the project already uses Microsoft Azure for cloud infrastructure.
- Bad, because it introduces a separate planning system from the GitHub repository and pull-request workflow.
- Bad, because setup and administration would add overhead for the team's current project size.
- Bad, because team members would need to keep Azure Boards work items synchronized with GitHub development activity.
- Bad, because its broader feature set is more than the team currently needs.

## Confirmation

This decision will be considered successful if the team can use GitHub Projects to maintain a current prioritized backlog, assign work to team members, track work through completion, and connect implementation tasks to the relevant GitHub issues and pull requests. The team should review the decision if project coordination becomes difficult, if advanced reporting or sprint-management capabilities become necessary, or if the project expands beyond GitHub's work-management capabilities.
