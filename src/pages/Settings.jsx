import { Link } from "react-router-dom";
import useFetch from "../../useFetch";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';

function Settings() {
    const { data, loading: leadsLoading, error: leadsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);
    const [leadsList, setLeadsList] = useState([]);

    // Sync fetched leads to local state
    useEffect(() => {
        if (data?.leads) {
            setLeadsList(data.leads);
        }
    }, [data]);

    async function handleDeleteLead(leadId) {
        if (!window.confirm("Are you sure you want to delete this lead?")) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/leads/${leadId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Failed to delete lead');
            }

            // Optimistically update UI
            setLeadsList(prev => prev.filter(lead => lead._id !== leadId));
            toast.success("Lead deleted successfully!");
        } catch (error) {
            toast.error(error.message || 'An unknown error occurred');
        }
    }

    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-4">Anvaya CRM</h2>

                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary">Settings</h5>
                    </div>

                    <div className="card-body p-0">
                        <div className="row g-0">
                            {/* Sidebar */}
                            <div className="col-md-3 border-end bg-light">
                                <div className="p-3">
                                    <h6 className="text-secondary fw-bold mb-3">Navigation</h6>
                                    <Link to="/" className="text-dark text-decoration-none d-block p-2">
                                        <MdKeyboardArrowLeft /> Back to Dashboard
                                    </Link>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-md-9 p-4">
                                <h6 className="text-secondary fw-bold mb-3">Lead Names</h6>

                                {/* Loading State */}
                                {leadsLoading && (
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <span className="ms-2">Loading leads...</span>
                                    </div>
                                )}

                                {/* Error State */}
                                {leadsError && (
                                    <div className="alert alert-danger">
                                        Failed to load leads: {leadsError.message || leadsError}
                                    </div>
                                )}

                                {/* No Leads */}
                                {!leadsLoading && !leadsError && leadsList.length === 0 && (
                                    <p className="text-muted">No leads found.</p>
                                )}

                                {/* Leads List */}
                                {!leadsLoading && !leadsError && leadsList.length > 0 && (
                                    <div className="mb-4">
                                        <div className="py-2 d-flex fw-bold border-bottom">
                                            <span className="flex-fill">Lead Name</span>
                                            <span className="flex-fill">Status</span>
                                            <span className="flex-fill">Sales Agent</span>
                                        </div>

                                        {leadsList.map((lead) => (
                                            <div className="py-2 d-flex align-items-center border-bottom" key={lead._id}>
                                                <span className="flex-fill text-truncate" style={{ color: '#4C763B' }}>
                                                    {lead.name.length > 20 ? lead.name.slice(0, 20) + '...' : lead.name}
                                                </span>
                                                <span className="flex-fill">{lead.status}</span>
                                                <span className="flex-fill d-flex align-items-center">
                                                    {lead.salesAgent?.name || '—'}
                                                    <button
                                                        type="button"
                                                        className="ms-3 btn btn-sm btn-danger"
                                                        onClick={() => handleDeleteLead(lead._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <hr />
                                <Link to="/createLead" className="btn btn-primary">
                                    + Add New Lead
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default Settings;