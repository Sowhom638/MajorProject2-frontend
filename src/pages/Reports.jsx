import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useFetch from "../../useFetch";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdBarChart,
  MdPeople,
  MdCheckCircle,
  MdSettings,
} from "react-icons/md";
import {
  Cell,
  Pie,
  PieChart,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Reports() {
  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];
  const {
    data: leads,
    loading,
    error,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);
  const {
    data: salesAgents,
    loading: salesAgentsLoading,
    error: salesAgentsError,
  } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);

  // === YOUR ORIGINAL LOGIC - PRESERVED EXACTLY ===
  const statusBasedPieChart_Data = statuses.map((status) => ({
    name: status,
    value:
      leads && leads?.leads?.length > 0
        ? leads?.leads?.filter((lead) => lead.status === status)?.length
        : 0,
  }));
  const pieChart1_Data = [
    {
      name: "Closed",
      value:
        leads && leads?.leads?.length > 0
          ? leads?.leads?.filter((lead) => lead.status === "Closed")?.length
          : 0,
    },
    {
      name: "In Pipeline",
      value:
        leads && leads?.leads?.length > 0
          ? leads?.leads?.filter((lead) => lead.status !== "Closed")?.length
          : 0,
    },
  ];
  const closedBySalesAgent_BarChartData =
    salesAgents && salesAgents?.length > 0
      ? salesAgents?.map((agent) => ({
          name: agent.name,
          value:
            leads && leads?.leads?.length > 0
              ? leads?.leads
                  ?.filter((lead) => lead.salesAgent?._id === agent._id)
                  ?.filter((lead) => lead.status === "Closed")?.length
              : 0,
        }))
      : [];

  console.log(closedBySalesAgent_BarChartData);

  const COLORS = [
    "#1f3018ff",
    "#307714ff",
    "#669c51ff",
    "#bbdbaeff",
    "#bbd672ff",
  ];
  // === END ORIGINAL LOGIC ===

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                :root {
                    --crm-primary: #6366f1; --crm-primary-dark: #4f46e5; --crm-bg: #f8fafc;
                    --crm-card: #ffffff; --crm-text: #0f172a; --crm-text-secondary: #64748b;
                    --crm-border: #e2e8f0; --crm-hover: #f1f5f9;
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
                .crm-sidebar { background: var(--crm-card); border-right: 1px solid var(--crm-border); }
                .crm-nav-link {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 12px 16px; border-radius: 12px; color: var(--crm-text-secondary);
                    text-decoration: none; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
                    font-weight: 500; margin-bottom: 6px;
                }
                .crm-nav-link:hover { background: var(--crm-hover); color: var(--crm-primary); transform: translateX(4px); }
                .crm-nav-link.active { background: #eef2ff; color: var(--crm-primary); font-weight: 600; }
                
                .crm-body { padding: 2rem; }
                .crm-section-title {
                    font-size: 1.1rem; font-weight: 600; color: var(--crm-text);
                    margin: 1.5rem 0 1rem; display: flex; align-items: center; gap: 8px;
                }
                .crm-section-title::before {
                    content: ''; display: inline-block; width: 4px; height: 16px;
                    background: var(--crm-primary); border-radius: 2px;
                }
                
                .crm-chart-container {
                    background: white; border: 1px solid var(--crm-border);
                    border-radius: 20px; padding: 1.5rem; margin-bottom: 1.5rem;
                    transition: all 0.2s ease;
                }
                .crm-chart-container:hover { box-shadow: 0 12px 24px rgba(0,0,0,0.05); }
                .crm-chart-title {
                    font-size: 1rem; font-weight: 600; color: var(--crm-text);
                    margin-bottom: 0.5rem; text-align: center;
                }
                .crm-chart-wrapper {
                    display: flex; justify-content: center; align-items: center;
                    min-height: 280px; position: relative;
                }
                .crm-chart-empty {
                    color: var(--crm-text-secondary); text-align: center; padding: 2rem;
                }
                .crm-chart-empty-icon {
                    width: 64px; height: 64px; background: var(--crm-hover);
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 1rem; font-size: 1.5rem; color: var(--crm-primary);
                }
                
                .crm-stats-row {
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 1rem; margin-bottom: 2rem;
                }
                .crm-stat-card {
                    background: white; border: 1px solid var(--crm-border);
                    border-radius: 16px; padding: 1.25rem; text-align: center;
                    transition: all 0.2s ease;
                }
                .crm-stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.06); }
                .crm-stat-value { font-size: 1.75rem; font-weight: 700; color: var(--crm-text); }
                .crm-stat-label { font-size: 0.85rem; color: var(--crm-text-secondary); margin-top: 0.25rem; }
                
                /* Recharts tooltip styling */
                .recharts-default-tooltip {
                    background: rgba(255,255,255,0.98) !important;
                    border: 1px solid var(--crm-border) !important;
                    border-radius: 12px !important;
                    box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
                    padding: 10px 14px !important;
                }
                .recharts-tooltip-label { font-weight: 600 !important; color: var(--crm-text) !important; }
                .recharts-tooltip-item { font-size: 0.85rem !important; }
                
                @media (max-width: 768px) {
                    .crm-header { flex-direction: column; align-items: flex-start; }
                    .crm-chart-wrapper { min-height: 240px; }
                }
            `}</style>

      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={3000}
      />

      <div className="container crm-wrapper">
        <div className="crm-card">
          <div className="crm-header">
            <div>
              <h2 className="fw-bold mb-1" style={{ color: "var(--crm-text)" }}>
                CRM Reports
              </h2>
              <p className="text-muted mb-0">
                Visualize your pipeline performance
              </p>
            </div>
            <Link to="/" className="crm-back-link">
              <MdKeyboardArrowLeft /> Back to Dashboard
            </Link>
          </div>

          <div className="row g-0">
            {/* Sidebar - Modernized but same structure */}
            <div className="col-md-3 col-lg-2 crm-sidebar p-4 d-flex flex-column">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "1.5px",
                  color: "var(--crm-text-secondary)",
                }}
              >
                Navigation
              </h6>
              <ul className="list-unstyled mb-0 flex-grow-1">
                {[
                  { label: "Leads", icon: <MdPeople />, path: "/leads" },
                  {
                    label: "Sales Agents",
                    icon: <MdBarChart />,
                    path: "/salesagents",
                  },
                  { label: "Reports", icon: <MdBarChart />, path: "/reports" },
                  {
                    label: "Settings",
                    icon: <MdSettings />,
                    path: "/settings",
                  },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={`crm-nav-link ${window.location.pathname.startsWith(item.path) ? "active" : ""}`}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
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
            <div className="col-md-9 p-4 crm-body">
              {/* Quick Stats Row */}
              <div className="crm-stats-row">
                <div className="crm-stat-card">
                  <div className="crm-stat-value">
                    {leads?.leads?.length || 0}
                  </div>
                  <div className="crm-stat-label">Total Leads</div>
                </div>
                <div className="crm-stat-card">
                  <div className="crm-stat-value" style={{ color: "#10b981" }}>
                    {leads?.leads?.filter((l) => l.status === "Closed")
                      ?.length || 0}
                  </div>
                  <div className="crm-stat-label">Closed</div>
                </div>
                <div className="crm-stat-card">
                  <div className="crm-stat-value" style={{ color: "#3b82f6" }}>
                    {leads?.leads?.filter((l) => l.status !== "Closed")
                      ?.length || 0}
                  </div>
                  <div className="crm-stat-label">In Pipeline</div>
                </div>
                <div className="crm-stat-card">
                  <div className="crm-stat-value" style={{ color: "#8b5cf6" }}>
                    {salesAgents?.length || 0}
                  </div>
                  <div className="crm-stat-label">Sales Agents</div>
                </div>
              </div>

              {/* Chart 1: Closed vs Pipeline Pie */}
              <div className="crm-chart-container">
                <h3 className="crm-chart-title">
                  Total Leads: Closed vs In Pipeline
                </h3>
                {leads && leads?.leads?.length > 0 ? (
                  <div className="crm-chart-wrapper">
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          dataKey="value"
                          data={pieChart1_Data}
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          innerRadius={50}
                          label
                          paddingAngle={4}
                        >
                          {pieChart1_Data.map((entry, index) => (
                            <Cell
                              key={`cell-${entry.name}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="crm-chart-empty">
                    <div className="crm-chart-empty-icon">
                      <MdBarChart />
                    </div>
                    {loading ? (
                      <p>Loading data...</p>
                    ) : error ? (
                      <p className="text-danger">{error}</p>
                    ) : (
                      <p>No leads found.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Chart 2: Closed by Sales Agent Bar */}
              <div className="crm-chart-container">
                <h3 className="crm-chart-title">Leads Closed by Sales Agent</h3>
                {salesAgents?.length > 0 ? (
                  <div className="crm-chart-wrapper">
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart
                        data={closedBySalesAgent_BarChartData}
                        margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
                      >
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 11, fill: "#64748b" }}
                          interval={0}
                          angle={-15}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis
                          allowDecimals={false}
                          tick={{ fontSize: 11, fill: "#64748b" }}
                          width={30}
                        />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="value"
                          fill="#669c51ff"
                          radius={[6, 6, 0, 0]}
                          maxBarSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="crm-chart-empty">
                    <div className="crm-chart-empty-icon">
                      <MdPeople />
                    </div>
                    {salesAgentsLoading ? (
                      <p>Loading agents...</p>
                    ) : salesAgentsError ? (
                      <p className="text-danger">{salesAgentsError}</p>
                    ) : (
                      <p>No sales agents listed.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Chart 3: Status Distribution Pie */}
              <div className="crm-chart-container">
                <h3 className="crm-chart-title">Leads Status Distribution</h3>
                {leads && leads?.leads?.length > 0 ? (
                  <div className="crm-chart-wrapper">
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          dataKey="value"
                          data={statusBasedPieChart_Data}
                          cx="50%"
                          cy="50%"
                          outerRadius={90}
                          innerRadius={50}
                          label
                          paddingAngle={3}
                        >
                          {statusBasedPieChart_Data.map((entry, index) => (
                            <Cell
                              key={`cell-${entry.name}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="crm-chart-empty">
                    <div className="crm-chart-empty-icon">
                      <MdBarChart />
                    </div>
                    {loading ? (
                      <p>Loading data...</p>
                    ) : error ? (
                      <p className="text-danger">{error}</p>
                    ) : (
                      <p>No leads found.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;
