---
marp: true
theme: default
---

# Hospital Management System

## Architecture Design

---

## Architectural Style: Microservices

- **Scalable & Maintainable**: Services can be developed, deployed, and scaled independently.
- **Resilience**: Failure in one service does not bring down the entire system.
- **Clear Boundaries**: Promotes a clear separation of concerns.

---

## Key Design Decisions

- **API Gateway**: A single entry point for all client requests, handling authentication, logging, and rate limiting.
- **Hybrid Communication**:
  - **Synchronous (REST APIs)** for direct queries.
  - **Asynchronous (Message Broker)** for events and notifications.
- **Database-per-Service**: Each microservice has its own database to ensure loose coupling.

---

## Technology Stack

- **Frontend**: React (Single-Page Application)
- **Backend**: Node.js (Express/NestJS), Python (FastAPI), or Java (Spring Boot)
- **Containerization**: Docker
- **Databases**: PostgreSQL (Relational), NoSQL
- **Message Broker**: RabbitMQ or Kafka

---

## Use Cases: Clinical Manager

The primary user, a **Clinical Manager**, can perform the following actions:

- **Login** to the system.
- **Manage Schedules** for staff.
- **Manage Staff Requests** (e.g., leave, swaps).
- **Monitor Team** performance and status.
- **Chat with an AI Assistant** for support.

---

## Use Cases

---

## C4 Model: System Context

The system interacts with several key external entities:

- **Clinical Manager (User)**: Interacts with the system to manage hospital operations.
- **MedStaff AI Backend**: Provides AI capabilities for chat and scheduling assistance.
- **Email System**: Sends notifications to users.
- **HR System**: Syncs staff data.

---

## C4 Model: Containers

The system is composed of several containers:

- **Single-Page App**: The React frontend used by the Clinical Manager.
- **API Gateway**: Routes incoming requests to the appropriate microservice.
- **Microservices**:
  - Authentication Service
  - Staff Service
  - Scheduling Service
  - Request Service
  - Notification Service
  - AI Service
- **Databases**: Each service has a dedicated database.

---

## sitemap
