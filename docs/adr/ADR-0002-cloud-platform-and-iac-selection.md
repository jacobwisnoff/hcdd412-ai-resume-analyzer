# Use Microsoft Azure and Bicep for Cloud Infrastructure

- Status: Accepted
- Date: 2026-10-08

## Context and Problem Statement

The AI Resume Analyzer requires a cloud environment that can be provisioned, managed, and maintained by all team members. The project must satisfy the course requirement that infrastructure be created from code rather than manually configured through a cloud provider portal.

The team requires a cloud platform that supports application hosting, future database integration, monitoring, and AI service connectivity. The team also requires an Infrastructure as Code (IaC) solution that allows infrastructure changes to be tracked through version control and deployed consistently across environments.

## Decision Drivers

1. Compliance with course requirements
2. Infrastructure must be provisioned from code
3. Team collaboration and shared access
4. Repeatable deployments
5. Version-controlled infrastructure
6. Integration with GitHub workflows
7. Ease of learning and implementation
8. Support for future application growth
9. Compatibility with AI and database services
10. Azure resource management capabilities

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

1. Infrastructure can be recreated consistently from source code.
2. Infrastructure changes are tracked through Git version control.
3. Team members can collaborate on infrastructure through pull requests.
4. Deployments become repeatable and auditable.
5. Azure integrates well with future application services.
6. Bicep simplifies deployment of Azure resources.
7. The cloud environment can be expanded to support new project requirements.
8. The project aligns with course expectations regarding cloud infrastructure and Infrastructure as Code.

### Negative Consequences

1. Team members must learn Azure deployment concepts.
2. Team members must learn Bicep syntax and templates.
3. The solution is tied to Azure-specific services.
4. Infrastructure deployment failures may occur if templates are configured incorrectly.
5. Resource usage may result in cloud costs if free-tier limits are exceeded.
6. Managing permissions and access control requires additional administration.

## Confirmation

The decision will be considered successful if the team can provision and manage its Azure cloud environment entirely from code, provide contributor access to all team members, validate infrastructure through GitHub workflows, and deploy future project components without manually configuring cloud resources.
