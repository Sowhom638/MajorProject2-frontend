import { Link } from "react-router-dom";
import useFetch from "../../useFetch";
import {
  MdKeyboardArrowLeft,
  MdDelete,
  MdPerson,
  MdFlag,
  MdEmail,
  MdAdd,
  MdSettings,
  MdWarning,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

function Settings() {
  const {
    data: leads,
    loading: leadsLoading,
    error: leadsError,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);
  const {
    data: salesAgents,
    loading: salesAgentsLoading,
    error: salesAgentsError,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);

  // === YOUR EXACT DELETE FUNCTIONS - PRESERVED 100% ===
  async function handleDeleteAgent(agentId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/agents/${agentId}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log(data);
          toast.info("Agent is deleted!");
          setInterval(() => window.location.reload(), 2000);
        } else {
          throw "Failed to delete the Agent";
        }
      } else {
        const errData = await response.json();
        throw new Error(errData.message);
      }
    } catch (error) {
      toast.warning(error.message || "An unknown error occurred");
    }
  }
  async function handleDeleteLead(leadId) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/leads/${leadId}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log(data);
          toast.info("Lead is deleted!");
          setInterval(() => window.location.reload(), 2000);
        } else {
          throw "Failed to delete the Lead";
        }
      } else {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to delete lead");
      }
    } catch (error) {
      toast.warning(error.message || "An unknown error occurred");
    }
  }
  // === END PRESERVED LOGIC ===

  // Status colors for visual consistency
  const statusColors = {
    New: "#3b82f6",
    Contacted: "#8b5cf6",
    Qualified: "#10b981",
    "Proposal Sent": "#f59e0b",
    Closed: "#64748b",
  };

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                
                .crm-settings-wrapper {
                    --crm-bg: #f8fafc; --crm-card: #ffffff; --crm-text: #0f172a; 
                    --crm-text-muted: #64748b; --crm-primary: #6366f1; --crm-primary-dark: #4f46e5;
                    --crm-border: #e2e8f0; --crm-hover: #f1f5f9; --crm-danger: #ef4444;
                    --radius: 20px; --shadow: 0 12px 32px rgba(0,0,0,0.06);
                    
                    min-height: 100vh; background: var(--crm-bg);
                    background-image: radial-gradient(circle at 10% 20%, rgba(99,102,241,0.04) 0%, transparent 25%),
                                      radial-gradient(circle at 90% 80%, rgba(16,185,129,0.04) 0%, transparent 25%);
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    padding: 2.5rem 1rem;
                }
                
                .crm-card {
                    max-width: 1200px; margin: 0 auto; background: var(--crm-card);
                    border-radius: var(--radius); box-shadow: var(--shadow);
                    border: 1px solid var(--crm-border); overflow: hidden;
                }
                
                .crm-header {
                    padding: 2rem 2rem 1.5rem; border-bottom: 1px solid var(--crm-border);
                    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;
                }
                .crm-header h2 { margin: 0; font-size: 1.6rem; font-weight: 700; color: var(--crm-text); }
                .crm-header p { margin: 0.25rem 0 0; color: var(--crm-text-muted); font-size: 0.9rem; }
                .crm-back-btn {
                    display: inline-flex; align-items: center; gap: 6px; color: var(--crm-text-muted);
                    text-decoration: none; font-weight: 500; padding: 8px 12px; border-radius: 10px;
                    transition: all 0.2s ease;
                }
                .crm-back-btn:hover { background: var(--crm-hover); color: var(--crm-primary); }
                
                .crm-layout { display: flex; min-height: 600px; }
                
                .crm-sidebar {
                    width: 240px; background: var(--crm-hover); border-right: 1px solid var(--crm-border);
                    padding: 1.5rem; display: flex; flex-direction: column;
                }
                .crm-nav-title { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1.5px; color: var(--crm-text-muted); margin-bottom: 1rem; font-weight: 700; }
                .crm-nav-link {
                    display: flex; align-items: center; justify-content: space-between; padding: 12px 14px;
                    border-radius: 12px; color: var(--crm-text-muted); text-decoration: none; font-weight: 500;
                    margin-bottom: 6px; transition: all 0.2s ease;
                }
                .crm-nav-link:hover { background: white; color: var(--crm-primary); transform: translateX(4px); }
                .crm-nav-link.active { background: white; color: var(--crm-primary); font-weight: 600; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                
                .crm-main { flex: 1; padding: 2rem; }
                .crm-section { margin-bottom: 2.5rem; }
                .crm-section-header { 
                    display: flex; justify-content: space-between; align-items: center; 
                    margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px dashed var(--crm-border);
                }
                .crm-section-title { 
                    font-size: 1.1rem; font-weight: 600; color: var(--crm-text); 
                    display: flex; align-items: center; gap: 8px; margin: 0;
                }
                .crm-section-title::before {
                    content: ''; display: inline-block; width: 4px; height: 16px;
                    background: var(--crm-primary); border-radius: 2px;
                }
                .crm-count { 
                    background: var(--crm-hover); color: var(--crm-text-muted); 
                    font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 20px; 
                }
                
                .crm-list { display: flex; flex-direction: column; gap: 0.75rem; }
                
                /* Lead Item Card */
                .crm-lead-item {
                    display: grid; grid-template-columns: 2fr 1fr 1.5fr 0.5fr; gap: 1rem;
                    align-items: center; padding: 14px 18px; background: white;
                    border: 1px solid var(--crm-border); border-radius: 14px;
                    transition: all 0.2s ease;
                }
                .crm-lead-item:hover { 
                    background: var(--crm-hover); border-color: var(--crm-primary);
                    transform: translateX(3px); 
                }
                .crm-lead-name { 
                    font-weight: 600; color: var(--crm-text); 
                    display: flex; align-items: center; gap: 8px;
                }
                .crm-lead-name::before {
                    content: ''; width: 8px; height: 8px; border-radius: 50%;
                    background: var(--crm-primary);
                }
                .crm-lead-status {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 4px 10px; border-radius: 12px; font-size: 0.8rem; font-weight: 600;
                }
                .crm-lead-agent { 
                    display: flex; align-items: center; gap: 6px; 
                    color: var(--crm-text-muted); font-size: 0.9rem; 
                }
                .crm-delete-btn {
                    display: inline-flex; align-items: center; justify-content: center;
                    width: 32px; height: 32px; border-radius: 10px;
                    background: var(--crm-danger); color: white; border: none;
                    cursor: pointer; transition: all 0.2s ease;
                }
                .crm-delete-btn:hover { 
                    background: #dc2626; transform: scale(1.05); 
                    box-shadow: 0 4px 12px rgba(239,68,68,0.3); 
                }
                
                /* Agent Item Card */
                .crm-agent-item {
                    display: flex; align-items: center; gap: 14px; padding: 14px 18px;
                    background: white; border: 1px solid var(--crm-border); border-radius: 14px;
                    transition: all 0.2s ease;
                }
                .crm-agent-item:hover { 
                    background: var(--crm-hover); border-color: var(--crm-primary);
                    transform: translateX(3px); 
                }
                .crm-agent-avatar {
                    width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
                    background: linear-gradient(135deg, var(--crm-primary), var(--crm-primary-dark));
                    display: flex; align-items: center; justify-content: center;
                    color: white; font-weight: 600; font-size: 0.95rem;
                }
                .crm-agent-info { flex: 1; min-width: 0; }
                .crm-agent-name { font-weight: 600; color: var(--crm-text); margin-bottom: 2px; }
                .crm-agent-email { font-size: 0.85rem; color: var(--crm-text-muted); display: flex; align-items: center; gap: 4px; }
                
                /* Empty/Loading States */
                .crm-empty { 
                    text-align: center; padding: 2.5rem 1rem; color: var(--crm-text-muted);
                    background: var(--crm-hover); border-radius: 14px; border: 1px dashed var(--crm-border);
                }
                .crm-empty-icon { 
                    width: 56px; height: 56px; background: white; border-radius: 50%; 
                    display: flex; align-items: center; justify-content: center; 
                    margin: 0 auto 1rem; font-size: 1.4rem; color: var(--crm-primary);
                    border: 2px solid var(--crm-border);
                }
                .crm-spinner { 
                    width: 32px; height: 32px; border: 3px solid rgba(99,102,241,0.2); 
                    border-top-color: var(--crm-primary); border-radius: 50%; 
                    animation: spin 0.8s linear infinite; margin: 0 auto 0.5rem; 
                }
                @keyframes spin { to { transform: rotate(360deg); } }
                
                /* Action Buttons */
                .crm-actions { 
                    display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem; 
                }
                .crm-action-btn {
                    display: inline-flex; align-items: center; gap: 8px; 
                    background: linear-gradient(135deg, var(--crm-primary), var(--crm-primary-dark));
                    color: white; padding: 12px 20px; border-radius: 14px; 
                    text-decoration: none; font-weight: 600; transition: all 0.2s ease;
                    border: none; cursor: pointer;
                }
                .crm-action-btn:hover { 
                    transform: translateY(-2px); box-shadow: 0 8px 20px rgba(99,102,241,0.35); 
                }
                
                @media (max-width: 900px) {
                    .crm-layout { flex-direction: column; }
                    .crm-sidebar { width: 100%; border-right: none; border-bottom: 1px solid var(--crm-border); padding: 1rem 1.5rem; }
                    .crm-lead-item { grid-template-columns: 1fr; gap: 0.75rem; }
                    .crm-lead-item > span { display: flex; align-items: center; gap: 6px; }
                }
                @media (max-width: 600px) {
                    .crm-actions { flex-direction: column; }
                    .crm-action-btn { width: 100%; justify-content: center; }
                }
            `}</style>

      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={3000}
      />

      <div className="crm-settings-wrapper">
        <div className="crm-card">
          {/* Header */}
          <div className="crm-header">
            <div>
              <h2>Settings</h2>
              <p>Manage leads, agents, and system preferences</p>
            </div>
            <Link to="/" className="crm-back-btn">
              <MdKeyboardArrowLeft /> Back to Dashboard
            </Link>
          </div>

          <div className="crm-layout">
            {/* Main Content */}
            <main className="crm-main">
              {/* Leads Section */}
              <section className="crm-section">
                <div className="crm-section-header">
                  <h3 className="crm-section-title">Leads Management</h3>
                  <span className="crm-count">
                    {leads?.leads?.length || 0} total
                  </span>
                </div>

                {leadsLoading ? (
                  <div className="crm-empty">
                    <div className="crm-spinner"></div>
                    <p>Loading leads...</p>
                  </div>
                ) : leadsError ? (
                  <div
                    className="crm-empty"
                    style={{
                      borderColor: "var(--crm-danger)",
                      color: "var(--crm-danger)",
                    }}
                  >
                    <div className="crm-empty-icon">
                      <MdWarning />
                    </div>
                    <p className="fw-medium">Failed to load data</p>
                    <p style={{ fontSize: "0.85rem" }}>{leadsError}</p>
                  </div>
                ) : leads && leads?.leads?.length > 0 ? (
                  <div className="crm-list">
                    {leads.leads.map((lead) => (
                      <div key={lead._id} className="crm-lead-item">
                        <span className="crm-lead-name">
                          {lead.name?.length > 20
                            ? lead.name.slice(0, 20) + "…"
                            : lead.name}
                        </span>
                        <span>
                          <span
                            className="crm-lead-status"
                            style={{
                              backgroundColor: `${statusColors[lead.status]}15`,
                              color: statusColors[lead.status],
                            }}
                          >
                            {lead.status}
                          </span>
                        </span>
                        <span className="crm-lead-agent">
                          <MdPerson size={16} />
                          {lead.salesAgent?.name || "Unassigned"}
                        </span>
                        <button
                          className="crm-delete-btn"
                          onClick={() => handleDeleteLead(lead._id)}
                          title="Delete this lead"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="crm-empty">
                    <div className="crm-empty-icon">
                      <MdFlag />
                    </div>
                    <p className="fw-medium">No leads added yet</p>
                    <p style={{ fontSize: "0.85rem" }}>
                      Create your first lead to get started
                    </p>
                  </div>
                )}
              </section>
              <div className="crm-actions">
                <Link to="/createLead" className="crm-action-btn">
                  <MdAdd size={18} /> Add New Lead
                </Link>
              </div>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px dashed var(--crm-border)",
                  margin: "2rem 0",
                }}
              />

              {/* Agents Section */}
              <section className="crm-section">
                <div className="crm-section-header">
                  <h3 className="crm-section-title">Sales Agents</h3>
                  <span className="crm-count">
                    {salesAgents?.length || 0} total
                  </span>
                </div>

                {salesAgentsLoading ? (
                  <div className="crm-empty">
                    <div className="crm-spinner"></div>
                    <p>Loading agents...</p>
                  </div>
                ) : salesAgentsError ? (
                  <div
                    className="crm-empty"
                    style={{
                      borderColor: "var(--crm-danger)",
                      color: "var(--crm-danger)",
                    }}
                  >
                    <div className="crm-empty-icon">
                      <MdWarning />
                    </div>
                    <p className="fw-medium">Failed to load data</p>
                    <p style={{ fontSize: "0.85rem" }}>{salesAgentsError}</p>
                  </div>
                ) : salesAgents && salesAgents?.length > 0 ? (
                  <div className="crm-list">
                    {salesAgents.map((agent) => (
                      <div key={agent._id} className="crm-agent-item">
                        <div className="crm-agent-avatar">
                          {agent.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="crm-agent-info">
                          <div className="crm-agent-name">
                            <span
                              style={{
                                fontSize: "0.7rem",
                                color: "var(--crm-text-muted)",
                                fontWeight: 500,
                                marginRight: "4px",
                              }}
                            >
                              Agent:
                            </span>
                            {agent.name}
                          </div>
                          <div className="crm-agent-email">
                            <MdEmail size={14} /> {agent.email}
                          </div>
                        </div>
                        <button
                          className="crm-delete-btn"
                          onClick={() => handleDeleteAgent(agent._id)}
                          title="Delete this agent"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="crm-empty">
                    <div className="crm-empty-icon">
                      <MdPerson />
                    </div>
                    <p className="fw-medium">No sales agents listed</p>
                    <p style={{ fontSize: "0.85rem" }}>
                      Add agents to assign leads and track performance
                    </p>
                  </div>
                )}
              </section>

              <div className="crm-actions">
                <Link to="/createAgent" className="crm-action-btn">
                  <MdAdd size={18} /> Add New Agent
                </Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
