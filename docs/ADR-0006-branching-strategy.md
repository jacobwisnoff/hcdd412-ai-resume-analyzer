# Branching Strategy and Pull Request Workflow

- Status: Accepted
- Date: 2026-11-06
- Tags: git github workflow branching pull-requests collaboration

## Context and Problem Statement

The team needs a consistent source control workflow that supports collaborative development, code review, and course requirements. Sprint deliverables require all code changes to be reviewed and merged through Pull Requests rather than being committed directly to the main branch.

As the project grows, multiple team members may be working on different features or fixes simultaneously. Without a defined branching strategy, changes can conflict, code quality reviews may be skipped, and the stability of the main branch can be compromised.

The team also needs a process that is easy to follow, minimizes merge conflicts, and provides a clear record of individual contributions throughout the semester.

## Decision Drivers

1. Comply with course requirements regarding Pull Requests.
2. Prevent direct changes to the main branch.
3. Maintain a stable and deployable main branch.
4. Encourage peer review and code accountability.
5. Support multiple developers working in parallel.
6. Create a clear history of contributions and project decisions.
7. Keep the workflow simple for a small development team.
8. Reduce the likelihood of merge conflicts and integration issues.

## Considered Options

1. Trunk-based development with short-lived feature branches.
2. GitFlow with separate develop and release branches.
3. Direct commits to main with no formal branching strategy.

## Decision Outcome

**Chosen option:** Trunk-based development with short-lived feature branches.

Each development task will be completed on a separate branch created from the main branch. Team members will commit changes to their feature branch and submit a Pull Request when the work is ready for review.

The main branch will remain protected and serve as the project's stable version. Direct pushes to main are not permitted. All changes must pass through the Pull Request process before being merged.

Branch names should clearly describe the work being completed. 

Examples:

```text
feature/resume-upload
feature/score-improvements
bugfix/error-message-display
docs/adr-0006
```

Pull Requests must include a summary of changes and be reviewed before merging. This workflow provides accountability and ensures code changes are visible to the entire team.

This option was selected because it satisfies course requirements while remaining simple and practical for a small team. It provides the benefits of code review and branch protection without the added complexity of maintaining separate development and release branches.

## Consequences

### Positive Consequences

1. All changes are reviewed before reaching the main branch.
2. The main branch remains stable and deployment-ready.
3. Pull Requests create a clear record of contributions.
4. Team members can work independently without modifying shared code directly.
5. Branch protection reduces the risk of accidental changes.
6. Short-lived branches help minimize merge conflicts.
7. The workflow aligns with industry-standard GitHub practices.
8. The process satisfies sprint and course requirements.

### Negative Consequences

1. Pull Request reviews can slightly slow development.
2. Team members must remember to create a branch before starting work.
3. Merge conflicts may still occur if branches remain open for long periods.
4. Branch protection requires additional repository configuration.
5. Urgent fixes cannot be committed directly to main without following the review process.

## Pros and Cons of the Options

### Trunk-Based Development with Short-Lived Feature Branches

1. Good, because it keeps the workflow simple and easy to maintain.
2. Good, because it supports Pull Request reviews and branch protection.
3. Good, because it encourages frequent integration and collaboration.
4. Bad, because developers must manage additional branches.

### GitFlow

1. Good, because it provides strong separation between development and release work.
2. Good, because it supports larger teams and more complex release cycles.
3. Bad, because it introduces additional branches and workflow complexity.
4. Bad, because the project does not currently require a formal release management structure.

### Direct Commits to Main

1. Good, because it is fast and requires no branching setup.
2. Good, because it minimizes process overhead.
3. Bad, because changes are not reviewed before integration.
4. Bad, because accidental errors can affect the project's stable version.
5. Bad, because it does not satisfy course requirements regarding Pull Requests and branch protection.

## Confirmation

This decision will be considered successful if all future sprint contributions are completed through feature branches and Pull Requests, the main branch remains protected throughout development, and team members can integrate changes without significant merge conflicts or workflow confusion.

The decision should be revisited if the team size increases significantly, release management becomes more complex, or the current workflow begins creating development bottlenecks.

