import { useState, useEffect } from "react";
import useFetch from "../../useFetch";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function LeadsByAgent() {
  const { agentId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams(); // ✅ Correct way
  const [sortFilter, setSortFilter] = useState('');

  const priorities = ['High', 'Medium', 'Low'];
  const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'];

  // Fetch data
  const { data: leadsData, loading: leadsLoading, error: leadsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);
  const { data: agentsData, loading: agentsLoading, error: agentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);

  // Get current agent
  const currentAgent = agentsData?.find(agent => agent._id === agentId) || {};

  // 🔍 Read filters FROM the URL
  const urlPriority = searchParams.get('priority') || 'All';
  const urlStatus = searchParams.get('status') || 'All';

  // 🧹 Filter leads step by step
  let filteredLeads = [];

  if (leadsData?.leads) {
    // Step 1: Filter by agent
    filteredLeads = leadsData.leads.filter(lead => lead.salesAgent?._id === agentId);

    // Step 2: Filter by priority (if not "All")
    if (urlPriority !== 'All') {
      filteredLeads = filteredLeads.filter(lead => lead.priority === urlPriority);
    }

    // Step 3: Filter by status (if not "All")
    if (urlStatus !== 'All') {
      filteredLeads = filteredLeads.filter(lead => lead.status === urlStatus);
    }
  }

  // 📊 Sort leads
  if (filteredLeads.length > 0) {
    if (sortFilter === "HighToLow") {
      filteredLeads = [...filteredLeads].sort((a, b) => b.timeToClose - a.timeToClose);
    } else {
      filteredLeads = [...filteredLeads].sort((a, b) => a.timeToClose - b.timeToClose);
    }
  }

  // ✨ Helper: Update URL without losing other filters
  const updateFilters = (newFilters) => {
    const newParams = new URLSearchParams(searchParams); // Copy current URL params

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === 'All') {
        newParams.delete(key); // Optional: remove "All" to keep URL clean
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams); // Update the URL
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Anvaya CRM</h2>

      <div className="card shadow-sm border rounded-3">
        <div className="card-header bg-white text-center py-3">
          <h5 className="mb-0 fw-bold text-primary">Leads By Agent</h5>
        </div>

        <div className="card-body p-0">
          <div className="row g-0">
            {/* Sidebar */}
            <div className="col-md-3 border-end bg-light">
              <div className="p-3">
                <h6 className="text-secondary fw-bold mb-3">Menu</h6>
                <Link to="/" className="text-dark text-decoration-none d-block p-2">
                  <MdKeyboardArrowLeft /> Back to Dashboard
                </Link>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-9 p-4">
              <h6 className="text-secondary fw-bold mb-3">
                Leads for <strong>{currentAgent.name || 'Unknown Agent'}</strong>
              </h6>

              {/* Table Header */}
              <div className="d-flex fw-bold py-2 border-bottom">
                <span className="mx-2 flex-grow-1">Lead Name</span>
                <span className="mx-2 flex-grow-1">Agent</span>
              </div>

              {/* Leads List */}
              {leadsLoading ? (
                <div className="py-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : leadsError ? (
                <p className="text-danger py-3">Error: {leadsError}</p>
              ) : filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <div className="d-flex align-items-center py-2 border-bottom" key={lead._id}>
                    <Link to={`/leads/${lead._id}`} className="text-dark text-decoration-none w-100 d-flex">
                      <span className="mx-2 flex-grow-1" style={{ color: '#4C763B' }}>
                        {lead.name.length > 15 ? lead.name.slice(0, 15) + '...' : lead.name}
                      </span>
                      <span className="mx-2 flex-grow-1">
                        {lead.salesAgent?.name || '—'}
                        <MdKeyboardArrowRight className="ms-2" />
                      </span>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="py-3">No leads match your filters.</p>
              )}

              <hr />

              {/* FILTERS */}
              <div className="mb-4">
                <h6 className="text-secondary fw-bold mb-3">Quick Filters</h6>

                {/* Priority Filter */}
                <div className="mb-2">
                  <strong>Priority:</strong>
                  <span
                    className="badge bg-primary ms-2"
                    onClick={() => updateFilters({ priority: 'All' })}
                    style={{ cursor: 'pointer' }}
                  >
                    All
                  </span>
                  {priorities.map((priority) => (
                    <span
                      key={priority}
                      className="badge bg-primary ms-2"
                      onClick={() => updateFilters({ priority })}
                      style={{ cursor: 'pointer' }}
                    >
                      {priority}
                    </span>
                  ))}
                </div>

                {/* Status Filter */}
                <div>
                  <strong>Status:</strong>
                  <span
                    className="badge bg-secondary ms-2"
                    onClick={() => updateFilters({ status: 'All' })}
                    style={{ cursor: 'pointer' }}
                  >
                    All
                  </span>
                  {statuses.map((status) => (
                    <span
                      key={status}
                      className="badge bg-secondary ms-2"
                      onClick={() => updateFilters({ status })}
                      style={{ cursor: 'pointer' }}
                    >
                      {status}
                    </span>
                  ))}
                </div>
              </div>

              {/* SORTING */}
              <div className="mb-3">
                <strong>Sort By:</strong>
                <div className="form-check form-check-inline ms-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sort"
                    id="lowToHigh"
                    value="LowToHigh"
                    onChange={(e) => setSortFilter(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="lowToHigh">
                    Less time to close
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sort"
                    id="highToLow"
                    value="HighToLow"
                    onChange={(e) => setSortFilter(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="highToLow">
                    More time to close
                  </label>
                </div>
              </div>

              <Link to="/createLead" className="btn btn-primary">
                + Add New Lead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadsByAgent;