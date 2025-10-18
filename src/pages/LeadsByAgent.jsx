import { useState } from "react";
import useFetch from "../../useFetch";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

function LeadsByAgent() {
    const { agentId } = useParams();
    const [selectedPriority, setSelectedPriority] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [sortFilter, setSortFilter] = useState('');
    const priorities = ['High', 'Medium', 'Low'];
    const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'];
    const { data: leads, loading: leadsLoading, error: leadsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);
    const { data: salesAgents, loading: salesAgentsLoading, error: salesAgentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);

    const foundedAgent = salesAgents && salesAgents?.length > 0 ? salesAgents.find((agent) => agent._id === agentId) : {};
    let filterLeads = [];
    if (leads || leads?.leads?.length > 0) {
        filterLeads = leads?.leads && leads?.leads?.filter((lead) => lead.salesAgent._id === agentId);
        filterLeads = selectedPriority === 'All' ? filterLeads : filterLeads.filter((lead) => lead.priority === selectedPriority)
        filterLeads = selectedStatus === 'All' ? filterLeads : filterLeads.filter((lead) => lead.status === selectedStatus)
    }

    if (filterLeads.length > 0) {
        if (sortFilter === "HighToLow") {
            filterLeads = [...filterLeads].sort((a, b) => b.timeToClose - a.timeToClose)
        } else {
            filterLeads = [...filterLeads].sort((a, b) => a.timeToClose - b.timeToClose)
        }
    }

    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-4">Anvaya CRM</h2>

                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary text-center">Leads By Agent</h5>
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
                                <h6 className="text-secondary fw-bold mb-3">Lead Names By {foundedAgent?.name}</h6>

                                <div className="d-flex flex-wrap gap-2 mb-4">
                                    <div>
                                        <div className="py-2 d-flex">
                                            <div className="py-2 d-flex justify-content-between">

                                                <span className="md:mx-5 sm:mx-2"><b>--Lead Name--</b></span>
                                                <span className="md:mx-5 sm:mx-2"><b>--SalesAgent--</b></span>
                                                <hr />
                                            </div>
                                        </div>
                                        {filterLeads?.length > 0 ? filterLeads?.map((lead) => (
                                            <div className="py-2 d-flex" key={lead._id}>
                                                <Link to={`/leads/${lead._id}`} className="text-decoration-none text-dark py-2 d-flex">
                                                    <span className="md:mx-5 sm:mx-2" style={{ color: `#4C763B` }}>--{lead.name.length > 8 ? lead.name.slice(0, 10) + '...' : lead.name}--</span>
                                                    <span className="md:mx-5 sm:mx-2">--{lead.salesAgent.name}--<MdKeyboardArrowRight /></span>
                                                    <hr />
                                                </Link>

                                            </div>
                                        )) : (
                                            <tr className="py-2 d-flex gap-3">
                                                {leadsLoading && <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                                {leadsError && <p className="text-danger">{leadsError}</p>}
                                                {'  '}No lead of this priority or salesAgents</tr>
                                        )}
                                    </div>

                                </div>

                                <hr />

                                <div className="mb-4">
                                    <h6 className="text-secondary fw-bold mb-3">Quick Filters</h6>
                                    <strong>Priority:</strong>
                                    <span className="badge bg-primary ms-2" onClick={() => setSelectedPriority('All')} style={{ cursor: 'pointer' }}>All</span>
                                    {priorities.map((priority) => (
                                        <span onClick={() => setSelectedPriority(priority)} className="badge bg-primary ms-2" style={{ cursor: 'pointer' }}>{priority}</span>
                                    ))}
                                    <br />
                                    <strong>Status:</strong>
                                    <span className="badge bg-secondary ms-2" onClick={() => setSelectedStatus('All')} style={{ cursor: 'pointer' }}>All</span>
                                    {statuses.map((status) => (
                                        <span onClick={() => setSelectedStatus(status)} className="badge bg-secondary ms-2" style={{ cursor: 'pointer' }}>{status}</span>
                                    ))}
                                </div>
                                <div className="d-flex gap-3">
                                    <b>Sort By:</b>
                                    <div className="form-group d-flex gap-2">
                                        <label htmlFor="LowToHigh">less time to close</label>
                                        <input type="radio" name="sortFilter" value="LowToHigh" id="LowToHigh" onChange={(e) => setSortFilter(e.target.value)} />
                                    </div>
                                    <div className="form-group d-flex gap-2">
                                        <label htmlFor="HighToLow">enough time to close</label>
                                        <input type="radio" name="sortFilter" value="HighToLow" id="HighToLow" onChange={(e) => setSortFilter(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeadsByAgent;