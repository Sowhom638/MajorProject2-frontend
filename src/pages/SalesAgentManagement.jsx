import { useState } from "react";
import useFetch from "../../useFetch";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

function SalesAgentManagement() {
    const { data: salesAgents, loading: salesAgentsLoading, error: salesAgentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);



    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-4">Anvaya CRM</h2>

                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary text-center">Sales Agent Management</h5>
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
                                <h6 className="text-secondary fw-bold mb-3">Sales Agent List</h6>
                                <div className="mb-4">
                                    {salesAgents && salesAgents?.length > 0 ? salesAgents?.map((agent) => (
                                        <p key={agent._id} onClick={() => setAgent(agent.name)} className="ms-2" style={{ cursor: 'pointer' }}><Link to={`/salesagents/${agent._id}`} className="text-decoration-none text-dark" ><span>Agent:</span> <b>{agent.name}</b> - {agent.email}<MdKeyboardArrowRight/></Link></p>
                                    )) : (
                                        <p className="badge bg-secondary ms-2">
                                            {salesAgentsLoading && <div className="spinner-border text-light" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>}
                                            {salesAgentsError && <p className="text-danger">{salesAgentsError}</p>}
                                            {'  '}No sales Agent is listed</p>
                                    )}

                                </div>

                                <Link to="/createAgent" className="btn btn-primary">
                                    + Add New Agent
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SalesAgentManagement;