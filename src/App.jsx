import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Link } from 'react-router-dom';
import useFetch from '../useFetch'
import { MdKeyboardArrowRight } from "react-icons/md";

function App() {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'];
  const { data: leads, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);

// Generating random color
function getRandomReadableColorOnWhite() {
  // Keep RGB values low enough for good contrast with white
  // Values between 0-100 generally work well
  const max = 100;
  const r = Math.floor(Math.random() * (max + 1));
  const g = Math.floor(Math.random() * (max + 1));
  const b = Math.floor(Math.random() * (max + 1));
  
  return '#' + 
    r.toString(16).padStart(2, '0') + 
    g.toString(16).padStart(2, '0') + 
    b.toString(16).padStart(2, '0');
}
  const randomColor = getRandomReadableColorOnWhite();

  let filterLeads = [];
  if (leads || leads?.leads?.length > 0) {
    filterLeads = selectedStatus === "All" ? leads?.leads : leads?.leads?.filter((lead) => lead.status === selectedStatus);
  }

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Anvaya CRM</h2>

        <div className="card shadow-sm border rounded-3">
          <div className="card-header bg-white text-center py-3">
            <h5 className="mb-0 fw-bold text-primary text-center">Dashboard</h5>
          </div>

          <div className="card-body p-0">
            <div className="row g-0">
              {/* Sidebar */}
              <div className="col-md-3 border-end bg-light">
                <div className="p-3">
                  <h6 className="text-secondary fw-bold mb-3">Sidebar</h6>
                  <ul className="list-unstyled mb-0">
                    {['Leads', 'SalesAgents', 'Reports', 'Settings'].map((item) => (
                      <li key={item} className="mb-2">
                        <Link to={`/${item.toLowerCase()}`} className="text-dark text-decoration-none d-block p-2 rounded hover-bg">
                          {item}<MdKeyboardArrowRight/>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-md-9 p-4">
                <h6 className="text-secondary fw-bold mb-3">Lead Names</h6>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  {filterLeads?.length > 0 ? filterLeads?.map((lead) => (
                    <span key={lead._id} className="fs-5 bg-light text-dark rounded-pill px-2 py-1" style={{border: `1px solid ${randomColor}` }}>
                      <Link to={`/leads/${lead._id}`} className="text-decoration-none text-dark" >{lead.name}</Link>
                      </span>
                  )) : (
                    <span className="badge fs-5 bg-light text-dark border">
                      {loading && <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>}
                      {error && <p className="text-danger">{error}</p>}
                      {'  '}No lead of this status</span>
                  )}
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold mb-2">Lead Status:</h6>
                  <ul className="list-unstyled ms-3">
                    {statuses.map((status) => (
                      <li className="mb-1">- {status}: <span className="badge bg-success">2</span> leads</li>
                    ))}

                  </ul>
                </div>

                <div className="mb-4">
                  <strong>Quick Filters:</strong>
                  <span className="badge bg-primary ms-2" style={{ cursor: 'pointer' }}>All</span>
                  {statuses.map((status) => (
                    <span onClick={() => setSelectedStatus(status)} className="badge bg-primary ms-2" style={{ cursor: 'pointer' }}>{status}</span>
                  ))}
                </div>

                <button className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2">+</i>Add New Lead
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
