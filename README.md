# EVENTHORIZON SHOWCASE

This repository contains the **interactive project showcase website for EventHorizon**, an open-source observability platform under active development. The website presents the project vision, implementation progress, architectural direction, and an interactive simulated log experience in a visual and accessible format.

---

## TABLE OF CONTENTS

1. [Overview](#overview)
2. [Purpose](#purpose)
3. [Website Features](#website-features)
4. [EventHorizon](#eventhorizon)
5. [Related Links](#related-links)
6. [License](#license)
7. [Contact](#contact)

---

## OVERVIEW

The EventHorizon Showcase is a dedicated website created to present the development of **EventHorizon** through a more visual and interactive experience.

Rather than acting as the main source-code repository, this website focuses on communicating:

* What EventHorizon is
* What has already been implemented
* What is currently under development
* What is planned for future versions
* How the platform is expected to evolve over time

The site is designed as a public-facing project overview for developers, recruiters, potential contributors, and anyone interested in following the project.

---

## PURPOSE

The showcase serves as the public entry point to the EventHorizon project.

Its main goals are to:

* Present the project in a concise and professional format
* Make the development roadmap easy to understand
* Clearly separate implemented functionality from work still in development
* Provide an interactive preview of the intended observability experience
* Direct visitors to the main EventHorizon source-code repository

The website intentionally avoids presenting planned functionality as completed functionality.

---

## WEBSITE FEATURES

* **Interactive Hero Section**

  * Animated EventHorizon visual
  * Active-development status
  * Direct navigation to the main project sections

* **Simulated Live Log Stream**

  * Dynamically generated application logs
  * INFO, WARNING, and ERROR severity levels
  * Severity filtering
  * Search functionality
  * Live counters and log clearing
  * Clearly identified as a simulated demonstration

* **Current Capabilities**

  * Overview of functionality already implemented in EventHorizon
  * Clear implementation-status indicators

* **Interactive Architecture View**

  * Visual representation of the intended system flow
  * Implemented, in-development, and planned components shown separately

* **Development Roadmap**

  * Current development stage
  * Planned project milestones
  * Visual progression of the platform

* **Technology Overview**

  * Technologies currently used
  * Technologies planned for later development stages

* **Responsive Design**

  * Desktop and mobile-friendly layout
  * Interactive animations and transitions
  * Dark observability-inspired interface

---

## EVENTHORIZON

EventHorizon is an open-source observability project focused on generating, collecting, querying, filtering, and analyzing application service logs.

The current implemented backend foundation includes a **Python / Flask API**, modular route organization, health monitoring, log retrieval, severity-based filtering, and service-layer separation.

The project also now includes the foundation of a standalone **C++ log generator** component, intended to simulate realistic application workloads and produce structured logs for the EventHorizon platform.

Future development is expected to expand the platform with:

* PostgreSQL persistence
* OpenSearch indexing and search
* A dedicated React frontend
* Docker-based local infrastructure
* CI/CD workflows
* OpenShift deployment support

The main EventHorizon repository contains the actual project source code and development history.

---

## RELATED LINKS

* **EventHorizon Repository:** [github.com/ChristosGkovaris/EventHorizon-Observatory-Platform](https://github.com/ChristosGkovaris/EventHorizon-Observatory-Platform)

---

## LICENSE

No formal software license is currently specified for this showcase repository.

The licensing approach may be updated as the EventHorizon project evolves.

---

## CONTACT

**Christos-Grigorios Gkovaris**
Computer Science and Engineering
University of Ioannina