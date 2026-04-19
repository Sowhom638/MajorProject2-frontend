import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useFetch from '../useFetch'
import { MdKeyboardArrowRight, MdAdd, MdPeople, MdBarChart, MdSettings } from "react-icons/md";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'];
  const { data: leads, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);

  const currentStatus = searchParams.get('status') || 'All';
  let filterLeads = [];
  if (leads?.leads) {
    filterLeads = currentStatus === 'All' ? leads.leads : leads.leads.filter(lead => lead.status === currentStatus);
  }

  const statusColors = {
    New: '#3b82f6',
    Contacted: '#8b5cf6',
    Qualified: '#10b981',
    'Proposal Sent': '#f59e0b',
    Closed: '#64748b'
  };

  const handleFilter = (status) => {
    setSearchParams(status === 'All' ? {} : { status });
  };

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
        }
        body { background-color: var(--crm-bg); font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        .crm-wrapper { padding: 2rem 1rem; }
        .crm-card { 
          border: none; border-radius: 20px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.06); overflow: hidden; 
          background: var(--crm-card);
        }
        .crm-sidebar { background: var(--crm-card); border-right: 1px solid var(--crm-border); }
        .crm-nav-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px; border-radius: 12px; color: var(--crm-text-secondary);
          text-decoration: none; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
          font-weight: 500; margin-bottom: 6px;
        }
        .crm-nav-link:hover { background: var(--crm-hover); color: var(--crm-primary); transform: translateX(4px); }
        .crm-nav-link.active { background: #eef2ff; color: var(--crm-primary); font-weight: 600; }
        
        .crm-lead-pill {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 18px; border-radius: 50px; background: white;
          border: 1.5px solid var(--crm-border); color: var(--crm-text);
          text-decoration: none; font-weight: 500; transition: all 0.2s ease;
        }
        .crm-lead-pill:hover { 
          transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.08); 
          border-color: var(--crm-primary); color: var(--crm-primary); 
        }
        .crm-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        
        .crm-filter-btn {
          padding: 8px 16px; border-radius: 20px; background: #f1f5f9; color: var(--crm-text-secondary);
          border: 1px solid transparent; font-size: 0.85rem; font-weight: 500; cursor: pointer; 
          transition: all 0.2s ease;
        }
        .crm-filter-btn:hover { background: #e2e8f0; color: var(--crm-text); }
        .crm-filter-btn.active { background: var(--crm-primary); color: white; border-color: var(--crm-primary); box-shadow: 0 4px 12px rgba(99,102,241,0.25); }
        
        .crm-add-btn {
          background: linear-gradient(135deg, var(--crm-primary), var(--crm-primary-dark));
          border: none; padding: 12px 24px; border-radius: 14px; font-weight: 600;
          display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s ease;
        }
        .crm-add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(99,102,241,0.35); color: white; }
        
        .crm-stat-card {
          background: white; border: 1px solid var(--crm-border); border-radius: 16px;
          padding: 16px; transition: all 0.2s ease;
        }
        .crm-stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
        
        .loading-overlay { color: var(--crm-primary); }
      `}</style>

      <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
      
      <div className="container crm-wrapper">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: 'var(--crm-text)', letterSpacing: '-0.5px' }}>Anvaya CRM</h2>
            <p className="text-muted mb-0">Manage your pipeline efficiently</p>
          </div>
          <Link to="/createLead" className="crm-add-btn text-decoration-none text-white">
            <MdAdd size={20} /> New Lead
          </Link>
        </div>

        <div className="crm-card">
          <div className="row g-0">
            {/* Sidebar */}
            <div className="col-md-3 col-lg-2 crm-sidebar p-4 d-flex flex-column">
              <h6 className="text-uppercase fw-bold mb-4" style={{ fontSize: '0.7rem', letterSpacing: '1.5px', color: 'var(--crm-text-secondary)' }}>Navigation</h6>
              <ul className="list-unstyled mb-0 flex-grow-1">
                {[
                  { label: 'Leads', icon: <MdPeople />, path: '/leads' },
                  { label: 'Sales Agents', icon: <MdBarChart />, path: '/salesagents' },
                  { label: 'Reports', icon: <MdBarChart />, path: '/reports' },
                  { label: 'Settings', icon: <MdSettings />, path: '/settings' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.path} className={`crm-nav-link ${window.location.pathname.startsWith(item.path) ? 'active' : ''}`}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {item.icon} {item.label}
                      </span>
                      <MdKeyboardArrowRight />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-3 border-top">
                <small className="text-muted d-block text-center">v1.0.0</small>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-md-9 col-lg-10 p-4 p-md-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0 d-flex align-items-center gap-2" style={{ color: 'var(--crm-text)' }}>
                  Lead Directory
                </h5>
                <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                  {filterLeads.length} {filterLeads.length === 1 ? 'lead' : 'leads'} found
                </span>
              </div>

              {/* Quick Filters */}
              <div className="d-flex flex-wrap gap-2 mb-5">
                {['All', ...statuses].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleFilter(status)}
                    className={`crm-filter-btn ${currentStatus === status ? 'active' : ''}`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Leads List */}
              <div className="mb-5 min-height-200">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border loading-overlay" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted fw-medium">Syncing pipeline...</p>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger d-flex align-items-center bg-light border-0 rounded-4" role="alert">
                    <div className="fw-medium">⚠️ {error}</div>
                  </div>
                ) : filterLeads.length > 0 ? (
                  <div className="d-flex flex-wrap gap-3">
                    {filterLeads.map((lead) => (
                      <Link key={lead._id} to={`/leads/${lead._id}`} className="crm-lead-pill">
                        <span className="crm-dot" style={{ backgroundColor: statusColors[lead.status] || '#94a3b8' }}></span>
                        {lead.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5 bg-light rounded-4 border border-dashed">
                    <p className="mb-0 fw-medium text-muted">No leads match this status</p>
                  </div>
                )}
              </div>

              {/* Status Overview */}
              <div className="p-4 rounded-4" style={{ background: '#f8fafc', border: '1px solid var(--crm-border)' }}>
                <h6 className="fw-bold mb-3" style={{ color: 'var(--crm-text)' }}>Pipeline Overview</h6>
                <div className="row g-3">
                  {statuses.map((status) => {
                    const count = leads?.leads?.filter(l => l.status === status)?.length || 0;
                    return (
                      <Link to={`/status/${status}`} key={status} className="col-6 col-md-4 col-lg-3 text-decoration-none">
                        <div className="crm-stat-card">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <span className="crm-dot me-2" style={{ backgroundColor: statusColors[status] }}></span>
                              <span className="fw-medium" style={{ color: 'var(--crm-text-secondary)' }}>{status}</span>
                            </div>
                            <span className="badge bg-light text-dark fw-bold px-3 py-2 border">{count}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;