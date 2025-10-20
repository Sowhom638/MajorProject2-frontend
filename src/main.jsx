import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LeadsList from './pages/LeadsList.jsx'
import LeadManagement from './pages/LeadManagement.jsx'
import CreateLeadForm from './pages/CreateLeadForm.jsx'
import SalesAgentManagement from './pages/SalesAgentManagement.jsx'
import CreateAgentForm from './pages/CreateAgentForm.jsx'
import LeadByStatus from './pages/LeadByStatus.jsx'
import LeadsByAgent from './pages/LeadsByAgent.jsx'
import Settings from './pages/Settings.jsx'
import EditLeads from './pages/EditLeads.jsx'
import Reports from './pages/Reports.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/leads",
    element: <LeadsList />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/reports",
    element: <Reports />
  },
  {
    path: "/salesagents",
    element: <SalesAgentManagement />
  },
  {
    path: "/salesagents/:agentId",
    element: <LeadsByAgent />
  },
  {
    path: "/leads/:leadId",
    element: <LeadManagement />
  },
  {
    path: "/createLead",
    element: <CreateLeadForm />
  },
  {
    path: "/editLead/:leadId",
    element: <EditLeads />
  },
  {
    path: "/createAgent",
    element: <CreateAgentForm />
  },
  {
    path: "/status/:statusName",
    element: <LeadByStatus />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
