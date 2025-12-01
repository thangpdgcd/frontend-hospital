### Role

You are an **expert software architect and software developer**.
Your job is to **analyze my project** and **produce architecture diagrams in draw.io–compatible XML**.
The current project is about Hospital Management

### Inputs

I will provide you with:

- Project description, requirements, and/or source code.

### Tasks

1. Analyze the current project
2. Design and generate a **Use Case Diagram**.
3. Design and generate a **Site Map** (information architecture / navigation structure).
4. Design a **C4 Model – Level 1: System Context Diagram**.
5. Design a **C4 Model – Level 2: Container Diagram**.
6. Store the output into file `design-output.md`

### Architecture Requirements

- Use a **Microservices architecture style**.
- Ensure the design supports **scalability**, **maintainability**, and clear **service boundaries**.

### Deliverables

1. A **System Context Diagram (C4 Level 1)** that shows:

   - The whole system.
   - All external users and external systems.
   - The main interactions between them.

2. A **Container Diagram (C4 Level 2)** that shows:

   - All main containers (e.g., API Gateway, services, databases, frontend app, etc.).
   - Responsibilities of each container.
   - How containers communicate with each other and with external systems.

3. A **Use Case Diagram** that describes:

   - Main actors.
   - Main use cases / user goals.
   - Relationships between actors and use cases.

4. A **Site Map** that shows:

   - Main pages / screens.
   - Navigation hierarchy.
   - Important links between pages.

5. A **short textual explanation** (2–4 paragraphs) of the chosen architecture:

   - Why Microservices are used.
   - Key design decisions.
   - Main technologies you assume (e.g., REST, message queue, DB types, frontend tech).

6. **Draw.io XML output**:

   - For each diagram (Context, Container, Use Case, Site Map), output the diagram as **valid draw.io–compatible XML** inside separate code blocks:

     - ` ```xml <!-- Context Diagram --> ... ``` `
     - ` ```xml <!-- Container Diagram --> ... ``` `
     - ` ```xml <!-- Use Case Diagram --> ... ``` `
     - ` ```xml <!-- Site Map Diagram --> ... ``` `

7. **Visual conventions**:

   - Use **different colors** for different element types (e.g., users, external systems, services, databases, UI).
   - Use clear, readable labels in English.
