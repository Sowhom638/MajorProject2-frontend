import { useState } from "react";
import useFetch from "../../useFetch";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

function LeadsList() {
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [agent, setAgent] = useState('All');
    const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'];
    const { data: leads, loading: leadsLoading, error: leadsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);
    const { data: salesAgents, loading: salesAgentsLoading, error: salesAgentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);


    let filterLeads = [];
    if (leads || leads?.leads?.length > 0) {
        filterLeads = selectedStatus === "All" ? leads?.leads : leads?.leads?.filter((lead) => lead.status === selectedStatus);
    }
    if (salesAgents || salesAgents?.length > 0) {
        filterLeads = agent === "All" ? filterLeads : filterLeads?.filter((lead) => lead.salesAgent.name === agent);
    }

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

                                <div className="d-flex flex-wrap gap-2 mb-4">
                                    <table>
                                        <tr className="py-2 d-flex">
                                            <th className="px-3" style={{ flexGrow: "1" }}>Lead Name</th>
                                            <th className="px-3" style={{ flexGrow: "1" }}>Status</th>
                                            <th className="px-3" style={{ flexGrow: "1" }}>SalesAgent</th>
                                        </tr>
                                        {filterLeads?.length > 0 ? filterLeads?.map((lead) => (
                                            <tr className="py-2 d-flex" key={lead._id}>
                                                <Link to={`/leads/${lead._id}`} className="text-decoration-none text-dark">
                                                <td className="px-3" style={{ flexGrow: "1", color: `#4C763B` }}>{lead.name.length>10 ? lead.name.slice(1, 10)+'...' : lead.name}</td>
                                                <td className="px-3" style={{ flexGrow: "1" }}>{lead.status}</td>
                                                <td className="px-3" style={{ flexGrow: "1" }}>{lead.salesAgent.name}</td>
                                            </Link>
                                            </tr>
                                        )) : (
                                            <tr className="py-2 d-flex gap-3">
                                                {leadsLoading && <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                                {leadsError && <p className="text-danger">{leadsError}</p>}
                                                {'  '}No lead of this status or salesAgents</tr>
                                        )}
                                    </table>

                                </div>

                                <hr />

                                <div className="mb-4">
                                    <h6 className="text-secondary fw-bold mb-3">Quick Filters</h6>
                                    <strong>Status:</strong>
                                    <span className="badge bg-primary ms-2" style={{ cursor: 'pointer' }}>All</span>
                                    {statuses.map((status) => (
                                        <span onClick={() => setSelectedStatus(status)} className="badge bg-primary ms-2" style={{ cursor: 'pointer' }}>{status}</span>
                                    ))}
                                    <br />
                                    <strong>SalesAgents:</strong>
                                    <span className="badge bg-secondary ms-2" style={{ cursor: 'pointer' }}>All</span>
                                    {salesAgents?.length > 0 ? salesAgents?.map((agent) => (
                                        <span key={agent._id} onClick={() => setAgent(agent.name)} className="badge bg-secondary ms-2" style={{ cursor: 'pointer' }}>{agent.name}</span>
                                    )) : (
                                        <span className="badge bg-secondary ms-2">
                                            {salesAgentsLoading && <div className="spinner-border text-light" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>}
                                            {salesAgentsError && <p className="text-danger">{salesAgentsError}</p>}
                                            {'  '}No lead of this status</span>
                                    )}
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

export default LeadsList;