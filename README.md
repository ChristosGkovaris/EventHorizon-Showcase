# EVENTHORIZON SHOWCASE

This repository contains the **interactive project showcase website for EventHorizon**, an observability and incident investigation platform under active development.

The website presents the project vision, implemented capabilities, architectural direction, development roadmap, and an interactive simulated log experience.

The showcase is a standalone website built with **HTML, CSS, and JavaScript**. It is separate from the EventHorizon backend and the planned React application.

---

## TABLE OF CONTENTS

1. [Overview](#overview)
2. [Purpose](#purpose)
3. [Website Features](#website-features)
4. [EventHorizon](#eventhorizon)
5. [Development Roadmap](#development-roadmap)
6. [Technology Overview](#technology-overview)
7. [Running the Showcase](#running-the-showcase)
8. [Related Links](#related-links)
9. [License](#license)
10. [Contact](#contact)

---

## OVERVIEW

The EventHorizon Showcase presents the development of **EventHorizon** through a visual and interactive project overview.

The website communicates:

- What EventHorizon aims to achieve
- Which backend capabilities have been implemented
- Which components are partially implemented
- Which features remain planned
- How the platform is expected to evolve

The site is intended for developers, recruiters, potential contributors, and anyone interested in following the project.

Implementation labels describe functionality present in the project source. They do not imply that the complete platform has been deployed, tested against live infrastructure, or verified for production use.

---

## PURPOSE

The showcase serves as a public-facing introduction to EventHorizon.

Its main goals are to:

- Present the project clearly and professionally
- Explain the current implementation and architectural direction
- Distinguish implemented functionality from remaining work
- Make the development roadmap easy to follow
- Provide an interactive preview of the intended log exploration experience
- Provide access to the showcase repository and the author's related profiles

The website is separate from the main platform implementation. Its simulated log stream does not connect to the Flask API or OpenSearch.

---

## WEBSITE FEATURES

### Interactive Hero Section

- Animated EventHorizon visual
- Active-development indicator
- Project and backend information
- Direct navigation to the demo and architecture sections

### Simulated Log Stream

- Browser-generated sample events
- INFO, WARNING, and ERROR severity levels
- Client-side severity filtering
- Client-side search across service, severity, and message
- Pause and resume controls
- Log-buffer clearing
- Counters for the buffered events
- A maximum buffer of 50 sample events
- Automatic suspension of event generation while the page is hidden

The demo is clearly labeled as a simulation.

Its timestamps, search controls, and continuously generated events illustrate the intended user experience. They do not demonstrate implemented backend timestamp handling, full-text search, or live event streaming.

### Current Capabilities

The showcase describes the implemented backend foundation, including:

- Flask application factory and Blueprints
- Injectable storage
- Validated log ingestion
- Log retrieval and severity filtering
- Event-ID generation and preservation
- Duplicate-event conflict handling
- OpenSearch storage adapter
- Automated backend tests using fake storage and mocked clients
- API liveness endpoint
- Local OpenSearch Docker Compose configuration

### Architecture Overview

The architecture section distinguishes:

- **Implemented:** Flask API functionality
- **Partially implemented:** OpenSearch integration
- **Scaffold only:** C++ log generator
- **Planned:** React application

The current backend request path is:

Client → Flask routes → LogStorage → OpenSearch

The planned React application will communicate with the Flask API. The C++ generator will produce events and submit them through the API once implemented.

### Development Roadmap

The roadmap covers:

- Implemented backend and storage foundations
- Remaining local OpenSearch reliability work
- Richer search and incident investigation
- C++ workload simulation
- Proposed private AWS staging
- Longer-term platform and delivery capabilities

Milestones describe development direction rather than release dates or calculated completion percentages.

### Technology Overview

The website separates technologies already represented in the implementation from those intended for future stages.

### Responsive and Accessible Presentation

- Responsive layouts for desktop and smaller screens
- Dark visual design
- Keyboard focus indicators
- Accessible search labeling and filter states
- Reduced-motion support
- Project information available without JavaScript

JavaScript is required for the interactive log simulation.

---

## EVENTHORIZON

EventHorizon is an observability platform being developed for collecting, validating, storing, querying, and investigating application service logs.

Its longer-term direction includes native workload simulation, richer search, a dedicated web application, and deployment infrastructure.

### Implemented Backend Foundation

The current backend includes:

- **Python and Flask**
- An application factory with injectable storage
- Modular routes organized with Flask Blueprints
- A storage interface separating API behavior from OpenSearch operations
- Structured JSON request and response handling
- Log ingestion and retrieval
- Severity-based filtering
- Request validation
- Event-ID generation and preservation
- Duplicate-event conflict handling
- API liveness reporting

### Current API Behavior

| Endpoint | Implemented behavior |
| --- | --- |
| `GET /api/health` | Returns the API's liveness response |
| `GET /api/logs` | Retrieves log results through the configured storage implementation |
| `GET /api/logs?severity=ERROR` | Retrieves results filtered by an accepted severity |
| `POST /api/logs` | Validates and stores a log event |

Supported severity values are:

- `INFO`
- `WARNING`
- `ERROR`

Log ingestion requires non-empty string values for:

- `service`
- `severity`
- `message`

The API generates an `event_id` when one is not supplied and preserves a valid client-provided ID.

Successful creation returns **HTTP 201**. Invalid input returns **HTTP 400**. Duplicate event IDs return **HTTP 409** without overwriting the existing event.

The health endpoint reports API liveness. It does not currently verify OpenSearch availability.

### OpenSearch Integration

OpenSearch is already represented in the backend implementation.

The storage adapter supports:

- Indexing log events
- Using event IDs as document IDs
- Create-only indexing when an event ID is supplied
- Retrieving indexed results
- Building severity-filtered queries
- Translating duplicate-document conflicts into application exceptions
- Translating connection failures into storage-unavailable exceptions

OpenSearch integration remains incomplete.

Remaining work includes explicit index mappings, consistent API responses for storage outages, storage-aware readiness checks, and verification against a real OpenSearch instance.

The current retrieval implementation does not yet provide pagination or explicit deterministic sorting.

### Local Infrastructure

A Docker Compose configuration defines:

- A single-node OpenSearch service
- A localhost-bound endpoint
- A named volume for OpenSearch data

This configuration provides a local development foundation. It does not establish that persistence after restart, end-to-end behavior, or production deployment has been verified.

### Automated Tests

The backend contains pytest tests using injected fake storage and mocked OpenSearch clients.

The tests cover areas such as:

- Storage injection
- Log ingestion and retrieval
- Input validation
- Severity filtering
- Event-ID behavior
- Duplicate-event conflicts
- OpenSearch adapter operations
- Simulated storage connection failures

These tests are distinct from integration tests against a running OpenSearch service.

### C++ Log Generator

The repository contains scaffolding for a standalone C++ log generator.

The structured log model, runtime generation, HTTP transmission, and CMake build remain to be implemented.

The intended generator will eventually support:

- Multiple simulated services
- Configurable generation rates
- Structured log events
- Multiple severity levels
- Concurrent workloads
- HTTP transmission to the Flask API
- Integration, load, and stress-testing scenarios

The showcase's JavaScript simulation is independent of this planned C++ component.

---

## DEVELOPMENT ROADMAP

### 1. Backend and Storage Foundation — Implemented

- Flask application factory and modular routes
- Validated log ingestion
- Log retrieval and severity filtering
- Event-ID generation and preservation
- Duplicate-event handling
- OpenSearch storage adapter
- Tests using fake storage and mocked clients
- Local OpenSearch Compose configuration

### 2. Local OpenSearch Reliability — Next

- Return consistent JSON responses with HTTP 503 when storage is unavailable
- Define explicit index creation and mappings
- Define timestamp handling
- Add storage-aware readiness checks
- Add integration tests against a real OpenSearch instance
- Verify ingestion, retrieval, filtering, and conflict handling end to end
- Verify persistence after OpenSearch restarts

### 3. Search and Investigation — Planned

- Service filtering
- Time-range filtering
- Full-text search
- Deterministic sorting
- Pagination
- React-based log exploration
- Incident investigation views

### 4. C++ Workload Simulation — Planned Implementation

- Structured log model
- Log-generation logic
- Configurable services and generation rates
- HTTP transmission
- Concurrent workload generation
- Backend integration
- Generator and load-testing coverage

### 5. Private AWS Staging — Proposed

The proposed deployment direction is to establish reliable local backend and OpenSearch behavior before validating a private AWS staging environment.

Preparation would include:

- Backend packaging
- Environment-specific configuration
- Secrets handling
- Access controls
- Budget controls
- Deployment verification

The AWS service selection remains open. This milestone does not represent an existing deployment.

### 6. Platform and Delivery — Longer Term

- PostgreSQL for relational application data and metadata
- Authentication and authorization
- Full-stack containerization
- GitHub Actions workflows
- Retention policies
- Operational monitoring and hardening
- Deployment automation
- Evaluation of OpenShift as a deployment option

The scope and order of later milestones may evolve as earlier implementation work is completed.

---

## TECHNOLOGY OVERVIEW

### Showcase Website

- HTML
- CSS
- JavaScript

The showcase does not require a frontend framework or a build step.

### Current Platform Implementation and Configuration

- Python
- Flask
- REST APIs
- JSON
- OpenSearch client and storage adapter
- pytest
- Docker Compose configuration for local OpenSearch
- Git

### Planned or Proposed Platform Technologies

- C++ and CMake for workload simulation
- React / TypeScript for the application frontend
- PostgreSQL for relational data and metadata
- Full-stack container infrastructure
- GitHub Actions for CI/CD
- AWS for proposed private staging
- OpenShift as a future deployment option

---

## RUNNING THE SHOWCASE

The showcase consists of three main files:

- `index.html` — Page structure and project content
- `style.css` — Visual design, responsive layouts, and motion preferences
- `script.js` — Simulated logs, filtering, search, stream controls, and interactions

Keep these files in the same directory and open `index.html` in a modern browser.

No Flask server, OpenSearch instance, Docker service, or C++ executable is required to use the showcase.

Use the matching revised versions of all three files so that the controls and layout remain consistent.

---

## RELATED LINKS

- [EventHorizon Showcase Repository](https://github.com/ChristosGkovaris/EventHorizon-Showcase)
- [GitHub Profile](https://github.com/ChristosGkovaris)
- [Personal Portfolio](https://christosgkovaris.github.io/Personal-Portfolio-Project/)
- [LinkedIn](https://www.linkedin.com/in/christosgkovaris)

The EventHorizon Observatory Platform is maintained separately from this showcase.

---

## LICENSE

Copyright © 2026 Christos-Grigorios Gkovaris. All rights reserved.

The EventHorizon Showcase website and its original content are proprietary and are not offered under an open-source license. Unauthorized copying, modification, or redistribution is prohibited, except where permitted by applicable law.

The EventHorizon Observatory Platform is developed separately. Licensing terms for distributed versions of the application and access to hosted services will be provided through the applicable End User License Agreement (EULA) or Terms of Service.

Third-party components and assets remain subject to their respective licenses.

---

## CONTACT

**Christos-Grigorios Gkovaris**  
Computer Science and Engineering  
University of Ioannina