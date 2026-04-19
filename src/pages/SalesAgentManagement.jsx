import useFetch from "../../useFetch";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdEmail, MdAdd, MdPerson, MdPeople, MdBarChart, MdSettings } from "react-icons/md";

function SalesAgentManagement() {
    const { data: salesAgents, loading: salesAgentsLoading, error: salesAgentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                
                .crm-agents-wrapper {
                    --crm-bg: #f8fafc; --crm-card: #ffffff; --crm-text: #0f172a; 
                    --crm-text-muted: #64748b; --crm-primary: #6366f1; --crm-primary-dark: #4f46e5;
                    --crm-border: #e2e8f0; --crm-hover: #f1f5f9; --crm-success: #22c55e;
                    --radius: 20px; --shadow: 0 12px 32px rgba(0,0,0,0.06);
                    
                    min-height: 100vh; background: var(--crm-bg);
                    background-image: radial-gradient(circle at 10% 20%, rgba(99,102,241,0.04) 0%, transparent 25%),
                                      radial-gradient(circle at 90% 80%, rgba(16,185,129,0.04) 0%, transparent 25%);
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    padding: 2.5rem 1rem;
                }
                
                .crm-card {
                    max-width: 1100px; margin: 0 auto; background: var(--crm-card);
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
                .crm-section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
                .crm-section-header h3 { margin: 0; font-size: 1.2rem; font-weight: 600; color: var(--crm-text); }
                .crm-count { background: var(--crm-hover); color: var(--crm-text-muted); font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: 20px; }
                
                .crm-agent-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
                .crm-agent-card {
                    display: flex; align-items: center; gap: 16px; padding: 16px;
                    background: white; border: 1px solid var(--crm-border); border-radius: 16px;
                    text-decoration: none; color: var(--crm-text); transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .crm-agent-card:hover {
                    background: var(--crm-hover); border-color: var(--crm-primary);
                    transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.06);
                }
                .crm-agent-card:hover .crm-arrow { transform: translateX(5px); color: var(--crm-primary); }
                
                .crm-avatar {
                    width: 46px; height: 46px; border-radius: 50%; flex-shrink: 0;
                    background: linear-gradient(135deg, var(--crm-primary), var(--crm-primary-dark));
                    display: flex; align-items: center; justify-content: center; color: white;
                    font-weight: 700; font-size: 1.1rem; box-shadow: 0 4px 10px rgba(99,102,241,0.3);
                }
                .crm-info { flex: 1; min-width: 0; }
                .crm-label { font-size: 0.7rem; text-transform: uppercase; color: var(--crm-text-muted); font-weight: 600; letter-spacing: 0.5px; }
                .crm-name { font-weight: 600; margin: 2px 0; font-size: 1.05rem; }
                .crm-email { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--crm-text-muted); }
                .crm-arrow { color: var(--crm-text-muted); transition: all 0.2s ease; }
                
                .crm-empty { text-align: center; padding: 3rem 1rem; color: var(--crm-text-muted); }
                .crm-empty-icon { width: 72px; height: 72px; background: var(--crm-hover); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 1.8rem; color: var(--crm-primary); }
                .crm-spinner { width: 36px; height: 36px; border: 3px solid rgba(99,102,241,0.2); border-top-color: var(--crm-primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }
                @keyframes spin { to { transform: rotate(360deg); } }
                
                .crm-add-btn {
                    display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, var(--crm-primary), var(--crm-primary-dark));
                    color: white; padding: 14px 24px; border-radius: 14px; text-decoration: none; font-weight: 600;
                    transition: all 0.2s ease; border: none; cursor: pointer; box-shadow: 0 6px 16px rgba(99,102,241,0.25);
                }
                .crm-add-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(99,102,241,0.35); }
                
                @media (max-width: 900px) {
                    .crm-layout { flex-direction: column; }
                    .crm-sidebar { width: 100%; border-right: none; border-bottom: 1px solid var(--crm-border); padding: 1rem 1.5rem; }
                    .crm-nav-link { margin-bottom: 4px; }
                }
            `}</style>

            <div className="crm-agents-wrapper">
                <div className="crm-card">
                    {/* Header */}
                    <div className="crm-header">
                        <div>
                            <h2>Sales Agents</h2>
                            <p>Manage your team and assign leads efficiently</p>
                        </div>
                        <Link to="/" className="crm-back-btn">
                            <MdKeyboardArrowLeft /> Back to Dashboard
                        </Link>
                    </div>

                    <div className="crm-layout">
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
                        <main className="crm-main">
                            <div className="crm-section-header">
                                <h3>Agent Directory</h3>
                                <span className="crm-count">{salesAgents?.length || 0} total</span>
                            </div>

                            {/* === YOUR EXACT LOGIC PRESERVED === */}
                            {salesAgentsLoading ? (
                                <div className="crm-empty">
                                    <div className="crm-spinner"></div>
                                    <p className="fw-medium">Loading agents...</p>
                                </div>
                            ) : salesAgentsError ? (
                                <div className="crm-empty">
                                    <div className="crm-empty-icon">⚠️</div>
                                    <p className="fw-medium" style={{ color: '#ef4444' }}>Failed to load data</p>
                                    <p style={{ fontSize: '0.85rem' }}>{salesAgentsError}</p>
                                </div>
                            ) : salesAgents && salesAgents?.length > 0 ? (
                                <div className="crm-agent-list">
                                    {salesAgents.map((agent) => (
                                        <Link key={agent._id} to={`/salesagents/${agent._id}`} className="crm-agent-card">
                                            <div className="crm-avatar">
                                                {agent.name?.charAt(0)?.toUpperCase() || '?'}
                                            </div>
                                            <div className="crm-info">
                                                <span className="crm-label">Agent:</span>
                                                <div className="crm-name">{agent.name}</div>
                                                <div className="crm-email">
                                                    <MdEmail size={14} /> {agent.email}
                                                </div>
                                            </div>
                                            <MdKeyboardArrowRight className="crm-arrow" size={20} />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="crm-empty">
                                    <p className="fw-medium">No sales agents listed</p>
                                    <p style={{ fontSize: '0.85rem' }}>Add your first agent to start tracking performance</p>
                                </div>
                            )}
                            {/* === END LOGIC === */}

                            <Link to="/createAgent" className="crm-add-btn">
                                <MdAdd size={20} /> Add New Agent
                            </Link>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SalesAgentManagement;