# Use Microsoft Azure and Bicep for Cloud Infrastructure

- Status: Accepted
- Date: 2026-10-08

## Context and Problem Statement

The AI Resume Analyzer requires a cloud environment that can be provisioned, managed, and maintained by all team members. The project must satisfy the course requirement that infrastructure be created from code rather than manually configured through a cloud provider portal.

The team requires a cloud platform that supports application hosting, future database integration, monitoring, and AI service connectivity. The team also requires an Infrastructure as Code (IaC) solution that allows infrastructure changes to be tracked through version control and deployed consistently across environments.

## Decision Drivers

- Compliance with course requirements
- Infrastructure must be provisioned from code
- Team collaboration and shared access
- Repeatable deployments
- Version-controlled infrastructure
- Integration with GitHub workflows
- Ease of learning and implementation
- Support for future application growth
- Compatibility with AI and database services
- Azure resource management capabilities

## Considered Options

1. Microsoft Azure and Bicep
2. Microsoft Azure and Terraform
3. Manual Azure Portal configuration

## Decision Outcome

Chosen option: Microsoft Azure and Bicep.

Microsoft Azure will be used as the project's cloud platform, and Bicep will be used as the Infrastructure as Code solution.

Azure provides the cloud resources required to host the AI Resume Analyzer and supports future deployment of the application's frontend, backend services, monitoring tools, database integrations, and AI functionality. Bicep was selected because it is Microsoft's native Infrastructure as Code language and enables cloud resources to be defined, deployed, and maintained through source-controlled code.

The team will store all infrastructure definitions in the project repository and use automated validation through GitHub workflows. Infrastructure will be provisioned from code rather than manually created through the Azure portal.

## Consequences

### Positive Consequences

- Infrastructure can be recreated consistently from source code.
- Infrastructure changes are tracked through Git version control.
- Team members can collaborate on infrastructure through pull requests.
- Deployments become repeatable and auditable.
- Azure integrates well with future application services.
- Bicep simplifies deployment of Azure resources.
- The cloud environment can be expanded to support new project requirements.
- The project aligns with course expectations regarding cloud infrastructure and Infrastructure as Code.

### Negative Consequences

- Team members must learn Azure deployment concepts.
- Team members must learn Bicep syntax and templates.
- The solution is tied to Azure-specific services.
- Infrastructure deployment failures may occur if templates are configured incorrectly.
- Resource usage may result in cloud costs if free-tier limits are exceeded.
- Managing permissions and access control requires additional administration.

## Confirmation

The decision will be considered successful if the team can provision and manage its Azure cloud environment entirely from code, provide contributor access to all team members, validate infrastructure through GitHub workflows, and deploy future project components without manually configuring cloud resources.
