import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LeadsList from './pages/LeadsList.jsx'
import LeadManagement from './pages/LeadManagement.jsx'

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
    path: "/leads/:leadId",
    element: <LeadManagement />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
