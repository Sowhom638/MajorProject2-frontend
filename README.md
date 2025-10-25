# Anvaya CRM
A modern CRM application designed to streamline lead management for sales teams. Track, filter, and update leads through their lifecycle, assign them to sales agents, add comments for progress tracking, and visualize key performance metrics through interactive dashboards.

Built with React frontend, Express/Node backend, and MongoDB database.

---

## Demo Link
[Live Demo](https://major-project2-frontend-eight.vercel.app)

---

## Quick Start
```
git clone https://github.com/Sowhom638/MajorProject2-frontend
cd AnvayaCRM-frontend
npm install
npm run dev
```
---

## Technologies
- React JS
- React Router Dom
- Bootstrap
- recharts
- Node JS
- Express JS
- MongoDB

---
## Demo Video
Watch a walkthrough of all the major features in a demo vide0;
[Google Drive Link]()

---

## Features

**Lead Form**
- Create new leads with essential fields:
    - Lead Name: Name of the potential customer or company.
    - Lead Source: Dropdown (Website, Referral, Cold Call, etc.).
    - Assigned Sales Agent: Assign from a list of available agents.
    - Lead Status: Predefined stages (New, Contacted, Qualified, Proposal Sent, Closed).
    - Tags: Multi-select tags for categorization (e.g., High Value, Follow-up).
    - Time to Close: Estimated days to close the deal.
    - Priority: Dropdown (High, Medium, Low).
- Submit via API to store in the database.

**Lead List**
- Displays all leads in a responsive table view.
- Displays all leads in a responsive table/card view.
    - ```/leads?salesAgent=John```
    - ```/leads?status=Qualified```
    - ```/leads?source=Referral```
    - Combine filters: ```/leads?salesAgent=John&status=Proposal%20Sent```
- Sorting by priority or estimated close date.
- Real-time UI updates based on query parameters.

**Lead Details**
- View full lead information:
    - Name, source, assigned agent, status, tags, time to close, priority.
- Comments Section:
    - Add timestamped comments with author attribution.
    - View full interaction history.
- Update Lead:
    - Modify status, agent, priority, or other fields directly from this view.

**Lead Status View**
- Group leads by their current status (```New```, ```Contacted```, etc.).
- Each group shows lead name, agent, time to close, and priority.
- Apply nested filters (e.g., filter by agent within “Qualified” leads).

**Sales Agent View**
- Group leads by assigned sales agent.
- Assess individual agent workload and pipeline health.
- Filter and sort by status or priority within each agent’s section.

**Reports & Visualizations**
- Powered by recharts, the dashboard includes:

    - Total Leads in Pipeline: Bar chart showing lead count per status stage.
    - Leads by Sales Agent: Pie or bar chart comparing agent performance.
    - Lead Status Distribution: Visual breakdown of where leads stand in the funnel.
- All reports pull from dedicated API endpoints for accurate, real-time insights.


---

## API References
### Leads
**POST /leads**
Create a new lead
Sample Response
```
{ _id, name, source, salesAgent, status, tags, timeToClose, priority }
```

**GET /leads**
Get all leads
Sample Response
```
[
{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt},
{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt}, ... 
]
```

**GET /leads/:id**
Get lead by it's id
Sample Response
```
{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt}
```

**POST /leads/:id**
Update lead by it's id
Sample Response
```
{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt}
```

**DELETE /leads/:id**
Delete lead by it's id
Sample Response
```
{ _id, name, source, salesAgent, status, tags, timeToClose, priority, createdAt, updatedAt}
```

### SalesAgents
**POST /agents**
Add new agent
Sample Response
```
{ _id, name, email, createdAt }
```

**GET /agents**
Get all agents
Sample Response
```
[
{ _id, name, email, createdAt },
{ _id, name, email, createdAt }, ... 
]
```

**DELETE /agents/:id**
Delete agent by id
Sample Response
```
{ _id, name, email, createdAt }
```

### Comments
**POST /leads/:id/comments**
Create a comment
Sample Response
```
{ _id, lead, author, commentText, createdAt }
```
**GET /leads/:id/comments**
Get all comments
Sample Response
```
[
{_id, lead, author, commentText, createdAt },
{_id, lead, author, commentText, createdAt }, ... 
]
```

### Tags
**POST /tags**
Create new tag
Sample Response
```
{ _id , name,  createdAt }
```
**GET /tags**
Get all tags
Sample Response
```
[
{ _id , name,  createdAt },
{ _id , name,  createdAt }, ... 
]
```

---

## Contact
for bugs informing or feature requesting , reach out to ghoshsowhom638@gmail.com