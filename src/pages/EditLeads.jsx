import { useState, useEffect } from "react";
import useFetch from "../../useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

function EditLeads() {
    const { leadId } = useParams();
    const navigate = useNavigate();

    const { data: leadData, loading: leadLoading, error: leadError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads/${leadId}`);
    const { data: salesAgents, loading: salesAgentsLoading, error: salesAgentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);
    const { data: tagsData, loading: tagsLoading, error: tagsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tags`);
    const tags = tagsData?.tags || [];

    const [agent, setAgent] = useState('');
    const [newTagName, setNewTagName] = useState('');
    const [tag, setTag] = useState([]);
    const [leadName, setLeadName] = useState('');
    const [leadSource, setLeadSource] = useState('');
    const [leadStatus, setLeadStatus] = useState('');
    const [leadPriority, setLeadPriority] = useState('');
    const [timeToClose, setTimeToClose] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        if (leadData?.lead) {
            const lead = leadData.lead;
            setAgent(lead.salesAgent?._id || lead.salesAgent || '');
            setTag(Array.isArray(lead.tags) ? lead.tags.map(t => t.name || t).filter(Boolean) : []);
            setLeadName(lead.name || '');
            setLeadSource(lead.source || '');
            setLeadStatus(lead.status || '');
            setLeadPriority(lead.priority || '');
            if(lead.status === 'Closed'){
            setTimeToClose(0);
            }else{
            setTimeToClose(lead.timeToClose || 0);
            }
        }
    }, [leadData]);

    function handleTag(e) {
        let selectedValues = Array.from(e.target.selectedOptions, option => option.value);
        setTag(selectedValues);
    }
    async function addNewTag(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const newTag = {
            name: newTagName,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tags`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTag)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create tag');
            }

            const createdTag = await response.json();
            console.log("Tag created:", createdTag);
            toast.success("New Tag is created!");
            setNewTagName('');
            setInterval(() => window.location.reload(), 2000)
        } catch (error) {
            console.error("Submission error:", error);
            toast.warning(error.message || 'An unknown error occurred');
            setSubmitError(error.message || "An error occurred while creating the TAG.");
        } finally {
            setIsSubmitting(false);
        }
    }
    async function handleUpdate(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/leads/${leadId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: leadName,
                    source: leadSource,
                    salesAgent: agent,
                    status: leadStatus,
                    tags: tag,
                    timeToClose: leadStatus === 'Closed' ? 0 : timeToClose,
                    priority: leadPriority
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to update lead');
            }

            const updatedLead = await response.json();
            console.log("Lead updated:", updatedLead);
            toast.success("Lead is updated!");
            setTimeout(() => navigate(`/leads/${leadId}`), 2000)

        } catch (error) {
            console.error("Update error:", error);
            toast.warning(error.message || 'An unknown error occurred');
            setSubmitError(error.message || "An error occurred while editing the lead.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (leadLoading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading lead...</span>
                </div>
                <p>Loading lead details...</p>
            </div>
        );
    }

    if (leadError || !leadData?.lead) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    {leadError || "Lead not found."}
                </div>
                <Link to="/leads" className="btn btn-secondary">← Back to Leads</Link>
            </div>
        );
    }

    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-4">Anvaya CRM</h2>

                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary">Edit Lead</h5>
                    </div>

                    <div className="card-body p-0">
                        <div className="row g-0">
                            {/* Sidebar */}
                            <div className="col-md-3 border-end bg-light">
                                <div className="p-3">
                                    <h6 className="text-secondary fw-bold mb-3">Navigation</h6>
                                    <Link to={`/leads/${leadId}`} className="text-dark text-decoration-none d-block p-2">
                                        <MdKeyboardArrowLeft /> Back to Lead
                                    </Link>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-md-9 p-4">
                                {submitError && (
                                    <div className="alert alert-danger">{submitError}</div>
                                )}
                                <form onSubmit={handleUpdate}>
                                    <div className="form-group my-2">
                                        <label htmlFor="leadName">Lead Name</label>
                                        <input
                                            type="text"
                                            id="leadName"
                                            className="form-control"
                                            value={leadName}
                                            onChange={(e) => setLeadName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group my-2">
                                        <label htmlFor="leadSource">Lead Source</label>
                                        <select
                                            id="leadSource"
                                            className="form-control"
                                            value={leadSource}
                                            onChange={(e) => setLeadSource(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>--Select Source--</option>
                                            {['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other'].map((source) => (
                                                <option key={source} value={source}>{source}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group my-2">
                                        <label htmlFor="salesAgent">Sales Agent</label>
                                        <select
                                            id="salesAgent"
                                            className="form-control"
                                            value={agent}
                                            onChange={(e) => setAgent(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>--Select Agent--</option>
                                            {salesAgentsLoading ? (
                                                <option disabled>Loading...</option>
                                            ) : salesAgentsError ? (
                                                <option disabled>Error loading</option>
                                            ) : salesAgents?.length > 0 ? (
                                                salesAgents.map((agentItem) => (
                                                    <option key={agentItem._id} value={agentItem._id}>
                                                        {agentItem.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No agents</option>
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-group my-2">
                                        <label htmlFor="leadStatus">Lead Status</label>
                                        <select
                                            id="leadStatus"
                                            className="form-control"
                                            value={leadStatus}
                                            onChange={(e) => setLeadStatus(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>--Select Status--</option>
                                            {['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'].map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group my-2">
                                        <label htmlFor="leadPriority">Lead Priority</label>
                                        <select
                                            id="leadPriority"
                                            className="form-control"
                                            value={leadPriority}
                                            onChange={(e) => setLeadPriority(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>--Select Priority--</option>
                                            {['High', 'Medium', 'Low'].map((priority) => (
                                                <option key={priority} value={priority}>{priority}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group my-2">
                                        <label htmlFor="timeToClose">Time To Close (days)</label>
                                        <input
                                            type="number"
                                            id="timeToClose"
                                            className="form-control"
                                            value={timeToClose}
                                            onChange={(e) => setTimeToClose(e.target.value)}
                                            min="0"
                                            required
                                        />
                                    </div>

                                    <div className="form-group my-2">
                                        <label htmlFor="tags">Tags</label>
                                        <select
                                            id="tags"
                                            className="form-control"
                                            multiple
                                            size="4"
                                            value={tag}
                                            onChange={handleTag}
                                        >
                                            {tagsLoading ? (
                                                <option disabled>Loading tags...</option>
                                            ) : tagsError ? (
                                                <option disabled>Error loading tags</option>
                                            ) : tags.length > 0 ? (
                                                tags.map((tagItem) => (
                                                    <option key={tagItem.id} value={tagItem.name}>
                                                        {tagItem.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No tags available</option>
                                            )}
                                        </select>
                                        <small className="form-text text-muted">
                                            Hold <kbd>Ctrl</kbd> or <kbd>Cmd</kbd> to select multiple.
                                        </small>
                                    </div>
                                    <div className="d-flex gap-3 flex-wrap align-items-end">
                                        <div className="form-group my-1">
                                            <input
                                                type="text"
                                                placeholder="Add new tag"
                                                className="form-control"
                                                value={newTagName}
                                                onChange={(e) => setNewTagName(e.target.value)}
                                            />
                                        </div>
                                        <button disabled={isSubmitting} onClick={addNewTag} className="btn btn-secondary my-1" style={{ height: "fit-content" }}>{isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Adding...
                                            </>
                                        ) : (
                                            " Add"
                                        )}</button>
                                    </div>


                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-3"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Updating...
                                            </>
                                        ) : (
                                            " Update Lead"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default EditLeads;