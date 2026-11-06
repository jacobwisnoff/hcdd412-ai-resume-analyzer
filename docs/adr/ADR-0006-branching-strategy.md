# ADR-0006: Branching Strategy

- Status: Accepted
- Date: 2026-11-06

## Context

Our team requires a consistent Git workflow that supports collaboration, code review, and course requirements. Sprint deliverables require all code changes to be merged through Pull Requests and prohibit direct pushes to the main branch.

## Decision

The team will use a trunk-based development variant.

### Workflow

1. The `main` branch is the stable branch.
2. Developers create a separate feature branch for each task.
3. Changes are committed to the feature branch.
4. A Pull Request (PR) is opened when development is complete.
5. The PR is reviewed before merging.
6. Required status checks must pass before merging.
7. Changes are merged into `main` through the PR process.
8. Direct pushes to `main` are not allowed.

### Branch Naming Convention

```text
feature/<feature-name>
bugfix/<bug-name>
docs/<documentation-update>
```

Examples:

```text
feature/login-page
feature/student-dashboard
bugfix/navbar-overlap
docs/adr-0006
```

## Rationale

This strategy was chosen because it:

- Supports required pull request reviews.
- Prevents direct changes to the main branch.
- Encourages peer review and accountability.
- Keeps development simple for a small team.
- Reduces the risk of introducing unstable code.

## Consequences

### Positive

- Improved code quality through reviews.
- Clear record of contributions via Pull Requests.
- Better protection of the main branch.
- Easier tracking of sprint work.

### Negative

- Additional time is needed for code review.
- Developers must create a branch before beginning work.
- Merge requests may be delayed if reviewers are unavailable.

## Outcome

The team will continue development using short-lived feature branches and Pull Requests while protecting the `main` branch with required reviews and status checks.
