import { useMemo } from "react";
import useFetch from "../../useFetch";
import { Link, useSearchParams } from "react-router-dom";
import { 
  MdKeyboardArrowLeft, MdKeyboardArrowRight, MdPerson, 
  MdFlag, MdAdd, MdFilterList, MdSearch, MdCheckCircle 
} from "react-icons/md";

function LeadsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'];

  const { data: leads, loading: leadsLoading, error: leadsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);
  const {  salesAgents, loading: salesAgentsLoading, error: salesAgentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);

  const currentStatus = searchParams.get('status') || 'All';
  const currentAgent = searchParams.get('salesAgent') || 'All';

  // Status colors mapping for visual consistency
  const statusColors = {
    New: '#3b82f6',
    Contacted: '#8b5cf6', 
    Qualified: '#10b981',
    'Proposal Sent': '#f59e0b',
    Closed: '#64748b'
  };

  // Optimized filtering with useMemo
  const filterLeads = useMemo(() => {
    if (!leads?.leads) return [];
    return leads.leads.filter(lead => {
      if (currentStatus !== 'All' && lead.status !== currentStatus) return false;
      if (currentAgent !== 'All' && lead.salesAgent?.name !== currentAgent) return false;
      return true;
    });
  }, [leads, currentStatus, currentAgent]);

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

  // Loading State
  if (leadsLoading) {
    return (
      <>
        <style>{`
          :root { --crm-bg: #f8fafc; --crm-primary: #6366f1; }
          body { background: var(--crm-bg); font-family: 'Inter', system-ui, sans-serif; }
          .crm-loading-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem; }
          .crm-loading-spinner { width: 48px; height: 48px; border: 4px solid rgba(99,102,241,0.2); border-top-color: var(--crm-primary); border-radius: 50%; animation: spin 1s linear infinite; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
        <div className="crm-loading-wrapper">
          <div className="crm-loading-spinner"></div>
          <p className="text-muted fw-medium">Loading leads...</p>
        </div>
      </>
    );
  }

  // Error State
  if (leadsError) {
    return (
      <>
        <style>{`
          :root { --crm-bg: #f8fafc; --crm-error: #ef4444; }
          body { background: var(--crm-bg); font-family: 'Inter', system-ui, sans-serif; }
          .crm-error-wrapper { padding: 4rem 1rem; display: flex; justify-content: center; }
          .crm-error-card { background: white; border-radius: 20px; padding: 2.5rem; max-width: 500px; width: 100%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.06); }
        `}</style>
        <div className="crm-error-wrapper">
          <div className="crm-error-card">
            <h4 className="fw-bold mb-2 text-danger">⚠️ Error Loading Leads</h4>
            <p className="text-muted mb-4">{leadsError}</p>
            <Link to="/" className="btn btn-primary">← Back to Dashboard</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        :root {
          --crm-primary: #6366f1;
          --crm-primary-dark: #4f46e5;
          --crm-bg: #f8fafc;
          --crm-card: #ffffff;
          --crm-text: #0f172a;
          --crm-text-secondary: #64748b;
          --crm-border: #e2e8f0;
          --crm-hover: #f1f5f9;
          --crm-success: #22c55e;
        }
        body { 
          background: var(--crm-bg); 
          background-image: radial-gradient(circle at 10% 20%, rgba(99,102,241,0.05) 0%, transparent 20%), 
                            radial-gradient(circle at 90% 80%, rgba(16,185,129,0.05) 0%, transparent 20%);
          font-family: 'Inter', system-ui, -apple-system, sans-serif; 
        }
        .crm-wrapper { padding: 3rem 1rem; }
        .crm-card {
          border: none; border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.06); overflow: hidden;
          background: var(--crm-card); max-width: 1200px; margin: 0 auto;
        }
        .crm-header {
          padding: 2rem 2rem 1.5rem; border-bottom: 1px solid var(--crm-border);
          display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;
        }
        .crm-back-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--crm-text-secondary); text-decoration: none;
          font-weight: 500; font-size: 0.9rem; transition: all 0.2s ease;
        }
        .crm-back-link:hover { color: var(--crm-primary); transform: translateX(-3px); }
        
        .crm-body { padding: 1.5rem 2rem; }
        
        .crm-filters-bar {
          display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;
          padding: 1rem; background: var(--crm-hover); border-radius: 16px;
          margin-bottom: 1.5rem; border: 1px solid var(--crm-border);
        }
        .crm-filter-group { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
        .crm-filter-label {
          font-size: 0.8rem; font-weight: 600; color: var(--crm-text-secondary);
          text-transform: uppercase; letter-spacing: 0.6px; margin-right: 0.5rem;
        }
        .crm-filter-chip {
          padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 500;
          background: white; border: 2px solid var(--crm-border); color: var(--crm-text-secondary);
          cursor: pointer; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 6px;
        }
        .crm-filter-chip:hover { border-color: var(--crm-primary); color: var(--crm-primary); }
        .crm-filter-chip.active {
          background: var(--crm-primary); border-color: var(--crm-primary);
          color: white; box-shadow: 0 4px 12px rgba(99,102,241,0.25);
        }
        .crm-filter-chip.status-new { border-left: 4px solid var(--crm-primary); }
        .crm-filter-chip.status-contacted { border-left: 4px solid #8b5cf6; }
        .crm-filter-chip.status-qualified { border-left: 4px solid var(--crm-success); }
        .crm-filter-chip.status-proposal-sent { border-left: 4px solid #f59e0b; }
        .crm-filter-chip.status-closed { border-left: 4px solid var(--crm-text-secondary); }
        
        .crm-leads-header {
          display: grid; grid-template-columns: 2fr 1.5fr 1fr 0.5fr; gap: 1rem;
          padding: 1rem 1.5rem; background: var(--crm-hover); border-radius: 12px 12px 0 0;
          font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px;
          color: var(--crm-text-secondary); border-bottom: 1px solid var(--crm-border);
        }
        .crm-lead-row {
          display: grid; grid-template-columns: 2fr 1.5fr 1fr 0.5fr; gap: 1rem;
          padding: 1rem 1.5rem; border-bottom: 1px solid var(--crm-border);
          transition: all 0.2s ease; align-items: center; text-decoration: none; color: inherit;
        }
        .crm-lead-row:hover { background: var(--crm-hover); transform: translateX(4px); }
        .crm-lead-row:last-child { border-bottom: none; }
        
        .crm-lead-name {
          display: flex; align-items: center; gap: 10px; font-weight: 600; color: var(--crm-text);
        }
        .crm-lead-avatar {
          width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--crm-primary), var(--crm-primary-dark));
          display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 0.9rem; flex-shrink: 0;
        }
        .crm-lead-status {
          display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px;
          border-radius: 12px; font-size: 0.8rem; font-weight: 600;
        }
        .crm-lead-agent { display: flex; align-items: center; gap: 8px; color: var(--crm-text-secondary); font-size: 0.9rem; }
        .crm-lead-agent-avatar {
          width: 24px; height: 24px; border-radius: 50%; background: var(--crm-hover);
          display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: var(--crm-text-secondary);
        }
        .crm-lead-arrow {
          color: var(--crm-text-secondary); transition: transform 0.2s ease; display: flex; justify-content: flex-end;
        }
        .crm-lead-row:hover .crm-lead-arrow { transform: translateX(4px); color: var(--crm-primary); }
        
        .crm-empty-state {
          text-align: center; padding: 4rem 2rem; color: var(--crm-text-secondary);
        }
        .crm-empty-icon {
          width: 80px; height: 80px; border-radius: 50%; background: var(--crm-hover);
          display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; color: var(--crm-primary);
        }
        
        .crm-meta-bar {
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;
          padding: 1rem 1.5rem; background: var(--crm-hover); border-radius: 0 0 12px 12px;
          font-size: 0.85rem; color: var(--crm-text-secondary); border-top: 1px solid var(--crm-border);
          margin-top: 0;
        }
        .crm-add-btn {
          background: linear-gradient(135deg, var(--crm-primary), var(--crm-primary-dark));
          border: none; padding: 12px 20px; border-radius: 14px; font-weight: 600;
          display: inline-flex; align-items: center; gap: 8px; color: white;
          text-decoration: none; transition: all 0.2s ease; cursor: pointer;
        }
        .crm-add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(99,102,241,0.35); color: white; }
        
        @media (max-width: 992px) {
          .crm-leads-header, .crm-lead-row {
            grid-template-columns: 1.5fr 1fr 0.5fr;
          }
          .crm-lead-row > span:nth-child(2) { display: none; }
        }
        @media (max-width: 768px) {
          .crm-filters-bar { flex-direction: column; align-items: stretch; }
          .crm-header { flex-direction: column; align-items: flex-start; }
          .crm-leads-header, .crm-lead-row {
            grid-template-columns: 1fr; gap: 0.5rem; padding: 1.25rem 1.5rem;
          }
          .crm-lead-row { border-bottom: 2px solid var(--crm-border); border-radius: 12px; background: white; margin-bottom: 1rem; }
          .crm-lead-row > span { display: flex; align-items: center; gap: 8px; }
          .crm-lead-arrow { display: none; }
        }
      `}</style>

      <div className="container crm-wrapper">
        <div className="crm-card">
          {/* Header */}
          <div className="crm-header">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: 'var(--crm-text)', letterSpacing: '-0.5px' }}>All Leads</h2>
              <p className="text-muted mb-0">View and manage your entire pipeline</p>
            </div>
            <Link to="/" className="crm-back-link">
              <MdKeyboardArrowLeft /> Back to Dashboard
            </Link>
          </div>

          <div className="crm-body">
            {/* Filters Bar */}
            <div className="crm-filters-bar">
              <div className="crm-filter-group">
                <span className="crm-filter-label"><MdFlag size={16} /> Status:</span>
                <span 
                  className={`crm-filter-chip ${currentStatus === 'All' ? 'active' : ''}`}
                  onClick={() => updateFilter({ status: 'All' })}
                >
                  All
                </span>
                {statuses.map(status => (
                  <span 
                    key={status}
                    className={`crm-filter-chip status-${status.toLowerCase().replace(' ', '-')} ${currentStatus === status ? 'active' : ''}`}
                    onClick={() => updateFilter({ status })}
                  >
                    {status}
                  </span>
                ))}
              </div>
              
              <div className="crm-filter-group mt-3 mt-md-0">
                <span className="crm-filter-label"><MdPerson size={16} /> Agent:</span>
                <span 
                  className={`crm-filter-chip ${currentAgent === 'All' ? 'active' : ''}`}
                  onClick={() => updateFilter({ salesAgent: 'All' })}
                >
                  All
                </span>
                {salesAgentsLoading ? (
                  <span className="crm-filter-chip" style={{ cursor: 'wait' }}>Loading...</span>
                ) : salesAgentsError ? (
                  <span className="crm-filter-chip text-danger">Error</span>
                ) : salesAgents?.length > 0 ? (
                  salesAgents.map(agent => (
                    <span 
                      key={agent._id}
                      className={`crm-filter-chip ${currentAgent === agent.name ? 'active' : ''}`}
                      onClick={() => updateFilter({ salesAgent: agent.name })}
                    >
                      {agent.name}
                    </span>
                  ))
                ) : (
                  <span className="crm-filter-chip" style={{ cursor: 'not-allowed' }}>No agents</span>
                )}
              </div>
            </div>

            {/* Table Header */}
            <div className="crm-leads-header">
              <span>Lead</span>
              <span>Status</span>
              <span>Agent</span>
              <span></span>
            </div>

            {/* Leads List */}
            <div>
              {filterLeads.length > 0 ? (
                filterLeads.map((lead) => (
                  <Link key={lead._id} to={`/leads/${lead._id}`} className="crm-lead-row">
                    <span className="crm-lead-name">
                      <span className="crm-lead-avatar">
                        {lead.name?.charAt(0)?.toUpperCase() || 'L'}
                      </span>
                      {lead.name?.length > 24 ? lead.name.slice(0, 24) + '...' : lead.name}
                    </span>
                    
                    <span>
                      <span 
                        className="crm-lead-status"
                        style={{ 
                          backgroundColor: `${statusColors[lead.status]}15`, 
                          color: statusColors[lead.status] 
                        }}
                      >
                        {lead.status}
                      </span>
                    </span>
                    
                    <span className="crm-lead-agent">
                      <span className="crm-lead-agent-avatar">
                        {lead.salesAgent?.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                      {lead.salesAgent?.name || 'Unassigned'}
                    </span>
                    
                    <span className="crm-lead-arrow">
                      <MdKeyboardArrowRight size={20} />
                    </span>
                  </Link>
                ))
              ) : (
                <div className="crm-empty-state">
                  <div className="crm-empty-icon">
                    <MdSearch />
                  </div>
                  <h5 className="fw-bold mb-2">No leads found</h5>
                  <p className="mb-0">
                    {currentStatus !== 'All' || currentAgent !== 'All' 
                      ? 'Try adjusting your filters to see more results.' 
                      : 'No leads have been added yet.'}
                  </p>
                </div>
              )}
            </div>

            {/* Meta Bar & Action */}
            <div className="crm-meta-bar">
              <span className="d-flex align-items-center gap-1">
                <MdCheckCircle size={16} className="text-success" />
                Showing <strong className="mx-1">{filterLeads.length}</strong> of <strong>{leads?.leads?.length || 0}</strong> leads
              </span>
              <Link to="/createLead" className="crm-add-btn">
                <MdAdd size={20} /> Add New Lead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadsList;