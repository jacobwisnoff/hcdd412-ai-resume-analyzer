# ADR-002: Cloud Platform and Infrastructure as Code Selection

## Status

Accepted

## Context and Problem Statement

The AI Resume Analyzer project requires a cloud environment that can be provisioned, maintained, and shared among all team members. The course requires infrastructure to be created from code rather than manually configured through a cloud provider portal. The team needs a cloud platform and Infrastructure as Code (IaC) solution that support collaboration, version control, repeatable deployments, and future deployment of the application's front end, back end, database integrations, and AI services.

## Decision Drivers

- Compliance with course requirements
- Infrastructure must be provisioned from code
- Team collaboration
- Repeatable deployments
- Version-controlled infrastructure
- Integration with GitHub workflows
- Ease of implementation
- Support for future project growth

## Considered Options

### Option 1: Microsoft Azure + Bicep

Use Microsoft Azure as the cloud platform and Bicep as the Infrastructure as Code solution.

#### Pros

- Native Azure IaC solution
- Simple syntax and deployment process
- Easy integration with Azure resources
- Well suited for a semester project
  
#### Cons

- Azure-specific implementation
- Less portable to other cloud providers

### Option 2: Microsoft Azure + Terraform

Use Microsoft Azure as the cloud platform and Terraform as the Infrastructure as Code solution.

#### Pros

- Industry-standard IaC tool
- Supports multiple cloud providers
- Strong community support

#### Cons

- More complex setup and configuration
- Requires state management
- Higher learning curve

## Decision Outcome

The team selected Microsoft Azure as the cloud platform and Bicep as the Infrastructure as Code tool.

Azure was selected because it provides the cloud environment required for the project while supporting future deployment of the AI Resume Analyzer application. Bicep was selected because it is Azure's native Infrastructure as Code language and allows infrastructure to be defined, reviewed, version controlled, and deployed through source code.

The initial cloud environment will consist of Azure resources required to support application deployment and future integration of back end services, databases, and AI functionality. Infrastructure definitions will be stored in the project repository and validated through pull requests and automated workflows before deployment.

## Consequences

### Positive

### Negative 
