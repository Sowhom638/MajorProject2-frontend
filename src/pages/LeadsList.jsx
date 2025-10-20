import { useState, useEffect } from "react";
import useFetch from "../../useFetch";
import { Link, useSearchParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

function LeadsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'];

  const { data: leads, loading: leadsLoading, error: leadsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);
  const { data: salesAgents, loading: salesAgentsLoading, error: salesAgentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);

  const currentStatus = searchParams.get('status') || 'All';
  const currentAgent = searchParams.get('salesAgent') || 'All';

  let filterLeads = [];
  if (leads?.leads) {
    filterLeads = leads.leads.filter(lead => {

      if (currentStatus !== 'All' && lead.status !== currentStatus) {
        return false;
      }

      if (currentAgent !== 'All' && lead.salesAgent?.name !== currentAgent) {
        return false;
      }
      return true;
    });
  }


  const updateFilter = (newParams) => {
    const updated = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === 'All') {
        updated.delete(key);
      } else {
        updated.set(key, value);
      }
    });
    setSearchParams(updated);
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Anvaya CRM</h2>

        <div className="card shadow-sm border rounded-3">
          <div className="card-header bg-white text-center py-3">
            <h5 className="mb-0 fw-bold text-primary text-center">Leads List</h5>
          </div>

          <div className="card-body p-0">
            <div className="row g-0">
              {/* Sidebar */}
              <div className="col-md-3 border-end bg-light">
                <div className="p-3">
                  <h6 className="text-secondary fw-bold mb-3">Sidebar</h6>
                  <Link to="/" className="text-dark text-decoration-none d-block p-2">
                    <MdKeyboardArrowLeft /> Back to Dashboard
                  </Link>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-md-9 p-4">
                <h6 className="text-secondary fw-bold mb-3">Lead Names</h6>

                <div className="d-flex flex-column mb-4">
                  <div className="py-2 d-flex fw-bold border-bottom">
                    <span className="mx-2 flex-grow-1">--Lead Name--</span>
                    <span className="mx-2 flex-grow-1">--Status--</span>
                    <span className="mx-2 flex-grow-1">--SalesAgent--</span>
                  </div>

                  {filterLeads?.length > 0 ? (
                    filterLeads.map((lead) => (
                      <div className="py-2 d-flex align-items-center border-bottom" key={lead._id}>
                        <Link to={`/leads/${lead._id}`} className="text-decoration-none text-dark d-flex w-100">
                          <span className="mx-2 flex-grow-1" style={{ color: `#4C763B` }}>
                            --{lead.name.length > 8 ? lead.name.slice(0, 10) + '...' : lead.name}--
                          </span>
                          <span className="mx-2 flex-grow-1">--{lead.status}--</span>
                          <span className="mx-2 flex-grow-1">
                            --{lead.salesAgent?.name || 'N/A'}--<MdKeyboardArrowRight />
                          </span>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="py-3">
                      {leadsLoading ? (
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : leadsError ? (
                        <p className="text-danger">{leadsError}</p>
                      ) : (
                        'No leads match the current filters.'
                      )}
                    </div>
                  )}
                </div>

                <hr />

                <div className="mb-4">
                  <h6 className="text-secondary fw-bold mb-3">Quick Filters</h6>
                  
                  <div>
                    <strong>Status:</strong>
                    <span
                      className="badge bg-primary ms-2"
                      onClick={() => updateFilter({ status: 'All' })}
                      style={{ cursor: 'pointer' }}
                    >
                      All
                    </span>
                    {statuses.map((status) => (
                      <span
                        key={status}
                        onClick={() => updateFilter({ status })}
                        className="badge bg-primary ms-2"
                        style={{ cursor: 'pointer' }}
                      >
                        {status}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2">
                    <strong>SalesAgents:</strong>
                    <span
                      className="badge bg-secondary ms-2"
                      onClick={() => updateFilter({ salesAgent: 'All' })}
                      style={{ cursor: 'pointer' }}
                    >
                      All
                    </span>
                    {salesAgents?.length > 0 ? (
                      salesAgents.map((agent) => (
                        <span
                          key={agent._id}
                          onClick={() => updateFilter({ salesAgent: agent.name })}
                          className="badge bg-secondary ms-2"
                          style={{ cursor: 'pointer' }}
                        >
                          {agent.name}
                        </span>
                      ))
                    ) : (
                      <span className="badge bg-secondary ms-2">
                        {salesAgentsLoading ? (
                          <div className="spinner-border spinner-border-sm text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        ) : salesAgentsError ? (
                          <span className="text-danger">{salesAgentsError}</span>
                        ) : (
                          'No sales agents listed'
                        )}
                      </span>
                    )}
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
    </>
  );
}

export default LeadsList;