
# Hospital Management System: Architecture Design

## Architectural Explanation

The proposed architecture for the Hospital Management System is based on a **Microservices style**. This choice was driven by the need for a system that is scalable, maintainable, and has clear service boundaries, which are critical requirements for a complex hospital management application. By breaking down the system into smaller, independent services, we can develop, deploy, and scale each service separately. This approach promotes resilience, as the failure of one service does not necessarily bring down the entire system.

Key design decisions include the introduction of an **API Gateway** to act as a single entry point for all client requests. This simplifies the frontend application by providing a unified interface to the various backend services and allows for centralized handling of concerns like authentication, logging, and rate limiting. Communication between services is designed to be both synchronous (via REST APIs for direct queries) and asynchronous (via a **Message Broker** for events like notifications), ensuring that the system is both responsive and robust. Each microservice has its own dedicated database, following the "database per service" pattern to ensure loose coupling and independent data management.

The technology stack assumes a modern, cloud-native approach. The frontend is a **React Single-Page Application (SPA)**. The backend services would ideally be implemented using a framework like **Node.js with Express or NestJS, Python with FastAPI, or Java with Spring Boot**, and containerized using **Docker**. Data persistence is handled by a mix of **PostgreSQL** for relational data and potentially NoSQL databases where appropriate. For asynchronous communication, a message broker like **RabbitMQ** or **Kafka** is recommended.

## Use Case Diagram

```xml
<!-- Use Case Diagram -->
<mxGraphModel dx="1434" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="2" value="Clinical Manager" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;" parent="1" vertex="1">
      <mxGeometry x="130" y="350" width="30" height="60" as="geometry" />
    </mxCell>
    <mxCell id="3" value="Manage Schedule" style="ellipse;whiteSpace=wrap;html=1;" parent="1" vertex="1">
      <mxGeometry x="360" y="190" width="140" height="70" as="geometry" />
    </mxCell>
    <mxCell id="4" value="Manage Staff Requests" style="ellipse;whiteSpace=wrap;html=1;" parent="1" vertex="1">
      <mxGeometry x="360" y="290" width="140" height="70" as="geometry" />
    </mxCell>
    <mxCell id="5" value="Monitor Team" style="ellipse;whiteSpace=wrap;html=1;" parent="1" vertex="1">
      <mxGeometry x="360" y="390" width="140" height="70" as="geometry" />
    </mxCell>
    <mxCell id="6" value="Chat with AI Assistant" style="ellipse;whiteSpace=wrap;html=1;" parent="1" vertex="1">
      <mxGeometry x="360" y="490" width="140" height="70" as="geometry" />
    </mxCell>
    <mxCell id="7" value="" style="endArrow=none;html=1;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" parent="1" source="2" target="3" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="220" y="440" as="sourcePoint" />
        <mxPoint x="270" y="390" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="8" value="" style="endArrow=none;html=1;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" parent="1" source="2" target="4" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="220" y="440" as="sourcePoint" />
        <mxPoint x="270" y="390" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="9" value="" style="endArrow=none;html=1;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" parent="1" source="2" target="5" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="220" y="440" as="sourcePoint" />
        <mxPoint x="270" y="390" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="10" value="" style="endArrow=none;html=1;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" parent="1" source="2" target="6" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="220" y="440" as="sourcePoint" />
        <mxPoint x="270" y="390" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="11" value="Staff/Doctor" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;" parent="1" vertex="1">
      <mxGeometry x="690" y="350" width="30" height="60" as="geometry" />
    </mxCell>
    <mxCell id="12" value="" style="endArrow=none;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" parent="1" source="4" target="11" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="550" y="360" as="sourcePoint" />
        <mxPoint x="600" y="310" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="13" value="MedStaff AI Backend" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;" vertex="1" parent="1">
      <mxGeometry x="680" y="500" width="50" height="60" as="geometry" />
    </mxCell>
    <mxCell id="14" value="" style="endArrow=none;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1" source="6" target="13">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="510" y="535" as="sourcePoint" />
        <mxPoint x="680" y="530" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="15" value="Login" style="ellipse;whiteSpace=wrap;html=1;" vertex="1" parent="1">
      <mxGeometry x="360" y="90" width="140" height="70" as="geometry" />
    </mxCell>
    <mxCell id="16" value="" style="endArrow=none;html=1;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="2" target="15">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="170" y="385" as="sourcePoint" />
        <mxPoint x="370" y="235" as="targetPoint" />
      </mxGeometry>
    </mxCell>
  </root>
</mxGraphModel>
```

## Site Map

```xml
<!-- Site Map Diagram -->
<mxGraphModel dx="1434" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="2" value="Login Page" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" parent="1" vertex="1">
      <mxGeometry x="350" y="110" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="3" value="Dashboard" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" parent="1" vertex="1">
      <mxGeometry x="350" y="230" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="4" value="" style="endArrow=classic;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;" parent="1" source="2" target="3" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="400" y="180" as="sourcePoint" />
        <mxPoint x="450" y="130" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="5" value="Schedule Planning" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" parent="1" vertex="1">
      <mxGeometry x="130" y="350" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="6" value="Manage Requests" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" parent="1" vertex="1">
      <mxGeometry x="290" y="350" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="7" value="Chat" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" parent="1" vertex="1">
      <mxGeometry x="450" y="350" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="8" value="Settings" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e1d5e7;strokeColor=#9673a6;" parent="1" vertex="1">
      <mxGeometry x="610" y="350" width="120" height="60" as="geometry" />
    </mxCell>
    <mxCell id="9" value="" style="endArrow=classic;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;" parent="1" source="3" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="410" y="300" as="sourcePoint" />
        <mxPoint x="410" y="320" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="10" value="" style="endArrow=none;html=1;exitX=0.5;exitY=0;exitDx=0;exitDy=0;" parent="1" source="5" target="9" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="190" y="350" as="sourcePoint" />
        <mxPoint x="410" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="11" value="" style="endArrow=none;html=1;exitX=0.5;exitY=0;exitDx=0;exitDy=0;" parent="1" source="6" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="350" y="350" as="sourcePoint" />
        <mxPoint x="410" y="320" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="12" value="" style="endArrow=none;html=1;exitX=0.5;exitY=0;exitDx=0;exitDy=0;" parent="1" source="7" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="510" y="350" as="sourcePoint" />
        <mxPoint x="410" y="320" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="13" value="" style="endArrow=none;html=1;exitX=0.5;exitY=0;exitDx=0;exitDy=0;" parent="1" source="8" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="670" y="350" as="sourcePoint" />
        <mxPoint x="410" y="320" as="targetPoint" />
      </mxGeometry>
    </mxCell>
  </root>
</mxGraphModel>
```

## C4 Model – Level 1: System Context Diagram

```xml
<!-- Context Diagram -->
<mxGraphModel dx="1434" dy="794" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1100" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="2" value="Clinical Manager" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" parent="1" vertex="1">
      <mxGeometry x="130" y="350" width="30" height="60" as="geometry" />
    </mxCell>
    <mxCell id="3" value="Hospital Management System" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" parent="1" vertex="1">
      <mxGeometry x="340" y="340" width="140" height="80" as="geometry" />
    </mxCell>
    <mxCell id="4" value="Manages schedules, staff, and requests" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" parent="1" source="2" target="3" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="200" y="400" as="sourcePoint" />
        <mxPoint x="250" y="350" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="5" value="MedStaff AI Backend" style="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;opacity=95;fillColor=#e1d5e7;strokeColor=#9673a6;" parent="1" vertex="1">
      <mxGeometry x="620" y="220" width="120" height="80" as="geometry" />
    </mxCell>
    <mxCell id="6" value="Provides AI for chat and scheduling" style="endArrow=classic;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.25;entryDx=0;entryDy=0;" parent="1" source="5" target="3" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="550" y="260" as="sourcePoint" />
        <mxPoint x="500" y="370" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="7" value="Email System" style="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;opacity=95;fillColor=#e1d5e7;strokeColor=#9673a6;" parent="1" vertex="1">
      <mxGeometry x="620" y="340" width="120" height="80" as="geometry" />
    </mxCell>
    <mxCell id="8" value="Sends notifications" style="endArrow=classic;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=1;entryY=0.75;entryDx=0;entryDy=0;" parent="1" source="7" target="3" edge="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="550" y="380" as="sourcePoint" />
        <mxPoint x="500" y="390" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="9" value="HR System" style="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;opacity=95;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
      <mxGeometry x="620" y="460" width="120" height="80" as="geometry" />
    </mxCell>
    <mxCell id="10" value="Provides staff data" style="endArrow=classic;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1" source="9">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="610" y="500" as="sourcePoint" />
        <mxPoint x="480" y="420" as="targetPoint" />
      </mxGeometry>
    </mxCell>
  </root>
</mxGraphModel>
```

## C4 Model – Level 2: Container Diagram

```xml
<!-- Container Diagram -->
<mxGraphModel dx="2151" dy="1191" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1200" pageHeight="1000" math="0" shadow="0">
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="2" value="Clinical Manager" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
      <mxGeometry x="80" y="420" width="30" height="60" as="geometry" />
    </mxCell>
    <mxCell id="3" value="Single-Page Application" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
      <mxGeometry x="240" y="410" width="140" height="80" as="geometry" />
    </mxCell>
    <mxCell id="4" value="Manages schedules, staff, and requests" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="2" target="3">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="150" y="470" as="sourcePoint" />
        <mxPoint x="200" y="420" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="5" value="API Gateway" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;" vertex="1" parent="1">
      <mxGeometry x="450" y="410" width="120" height="80" as="geometry" />
    </mxCell>
    <mxCell id="6" value="Makes API calls" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="3" target="5">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="390" y="450" as="sourcePoint" />
        <mxPoint x="440" y="400" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="7" value="Authentication Service" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
      <mxGeometry x="640" y="150" width="140" height="70" as="geometry" />
    </mxCell>
    <mxCell id="8" value="Staff Service" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
      <mxGeometry x="640" y="250" width="140" height="70" as="geometry" />
    </mxCell>
    <mxCell id="9" value="Scheduling Service" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
      <mxGeometry x="640" y="350" width="140" height="70" as="geometry" />
    </mxCell>
    <mxCell id="10" value="Request Service" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
      <mxGeometry x="640" y="450" width="140" height="70" as="geometry" />
    </mxCell>
    <mxCell id="11" value="Notification Service" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
      <mxGeometry x="640" y="550" width="140" height="70" as="geometry" />
    </mxCell>
    <mxCell id="12" value="AI Service" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;" vertex="1" parent="1">
      <mxGeometry x="640" y="650" width="140" height="70" as="geometry" />
    </mxCell>
    <mxCell id="13" value="Routes to" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1" source="5">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="580" y="450" as="sourcePoint" />
        <mxPoint x="630" y="185" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="14" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="570" y="450" as="sourcePoint" />
        <mxPoint x="630" y="285" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="15" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="570" y="450" as="sourcePoint" />
        <mxPoint x="630" y="385" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="16" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="570" y="450" as="sourcePoint" />
        <mxPoint x="630" y="485" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="17" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="570" y="450" as="sourcePoint" />
        <mxPoint x="630" y="585" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="18" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="1">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="570" y="450" as="sourcePoint" />
        <mxPoint x="630" y="685" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="19" value="Database" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
      <mxGeometry x="850" y="150" width="60" height="80" as="geometry" />
    </mxCell>
    <mxCell id="20" value="Database" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
      <mxGeometry x="850" y="250" width="60" height="80" as="geometry" />
    </mxCell>
    <mxCell id="21" value="Database" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
      <mxGeometry x="850" y="350" width="60" height="80" as="geometry" />
    </mxCell>
    <mxCell id="22" value="Database" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
      <mxGeometry x="850" y="450" width="60" height="80" as="geometry" />
    </mxCell>
    <mxCell id="23" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="7" target="19">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="790" y="185" as="sourcePoint" />
        <mxPoint x="840" y="135" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="24" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="8" target="20">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="790" y="285" as="sourcePoint" />
        <mxPoint x="840" y="235" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="25" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="9" target="21">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="790" y="385" as="sourcePoint" />
        <mxPoint x="840" y="335" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="26" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="10" target="22">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="790" y="485" as="sourcePoint" />
        <mxPoint x="840" y="435" as="targetPoint" />
      </mxGeometry>
    </mxCell>
    <mxCell id="27" value="MedStaff AI Backend" style="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;opacity=95;fillColor=#e1d5e7;strokeColor=#9673a6;" vertex="1" parent="1">
      <mxGeometry x="850" y="650" width="120" height="80" as="geometry" />
    </mxCell>
    <mxCell id="28" value="" style="endArrow=classic;html=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="12" target="27">
      <mxGeometry width="50" height="50" relative="1" as="geometry">
        <mxPoint x="790" y="685" as="sourcePoint" />
        <mxPoint x="840" y="635" as="targetPoint" />
      </mxGeometry>
    </mxCell>
  </root>
</mxGraphModel>
```
