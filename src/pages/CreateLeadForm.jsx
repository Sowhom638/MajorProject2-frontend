import { useState } from "react";
import useFetch from "../../useFetch";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

function CreateLeadForm() {
    const [agent, setAgent] = useState('');
    const [tag, setTag] = useState([]);
    const [leadName, setLeadName] = useState('');
    const [leadSource, setLeadSource] = useState('');
    const [leadStatus, setLeadStatus] = useState('');
    const [leadPriority, setLeadPriority] = useState(''); // Fixed typo
    const [timeToClose, setTimeToClose] = useState(0);

    const navigate = useNavigate();

    const { data: salesAgents, loading: salesAgentsLoading, error: salesAgentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);
    const { data: tagsData, loading: tagsLoading, error: tagsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tags`);

    const tags = tagsData?.tags || [];

    function handleTag(e) {
        let selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setTag(selectedOptions);
    }

    async function addNewLead(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/leads`, {
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
                    timeToClose: Number(timeToClose),
                    priority: leadPriority
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create lead');
            }

            const createdLead = await response.json();
            console.log("Lead created:", createdLead);
            navigate('/'); // Redirect to dashboard on success
        } catch (error) {
            console.error("Submission error:", error);
        }
    }

    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-4">Anvaya CRM</h2>

                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary">Add New Lead</h5>
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
                                <form onSubmit={addNewLead}>
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
                                                <option disabled>Loading agents...</option>
                                            ) : salesAgentsError ? (
                                                <option disabled>Error loading agents</option>
                                            ) : salesAgents?.length > 0 ? (
                                                salesAgents.map((agent) => (
                                                    <option key={agent._id} value={agent._id}>
                                                        {agent.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No agents available</option>
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
                                        <label htmlFor="leadPriority">Lead Priority</label> {/* Fixed label */}
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
                                            value={tag}
                                            onChange={handleTag}
                                        >
                                            {tagsLoading ? (
                                                <option disabled>Loading tags...</option>
                                            ) : tagsError ? (
                                                <option disabled>Error loading tags</option>
                                            ) : tags?.length > 0 ? (
                                                tags?.map((tagItem) => (
                                                    <option key={tagItem.id} value={tagItem.name}>
                                                        {tagItem.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option disabled>No tags available</option>
                                            )}
                                        </select>
                                        <small className="form-text text-muted">
                                            Hold Ctrl (or Cmd) to select multiple tags.
                                        </small>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-3"
                                    >Create Lead</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateLeadForm;