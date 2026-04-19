import { useState, useEffect } from "react";
import useFetch from "../../useFetch";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { 
  MdPerson, MdSource, MdFlag, MdPriorityHigh, MdAccessTime, 
  MdLabel, MdAdd, MdCheck, MdClose, MdArrowBack, MdErrorOutline,
  MdPersonAdd, MdTag, MdEdit, MdSave
} from "react-icons/md";

function EditLeads() {
    const { leadId } = useParams();
    const navigate = useNavigate();

    const { data: leadData, loading: leadLoading, error: leadError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads/${leadId}`);
    const { data: salesAgents, loading: salesAgentsLoading, error: salesAgentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);
    const { data: tagsData, loading: tagsLoading, error: tagsError, mutate: mutateTags } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/tags`);
    
    const tags = tagsData?.tags || [];
    const agents = salesAgents || [];

    const [agent, setAgent] = useState('');
    const [newTagName, setNewTagName] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [leadName, setLeadName] = useState('');
    const [leadSource, setLeadSource] = useState('');
    const [leadStatus, setLeadStatus] = useState('');
    const [leadPriority, setLeadPriority] = useState('');
    const [timeToClose, setTimeToClose] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [isAddingTag, setIsAddingTag] = useState(false);
    const [formChanged, setFormChanged] = useState(false);

    // Populate form when lead data loads
    useEffect(() => {
        if (leadData?.lead) {
            const lead = leadData.lead;
            setAgent(lead.salesAgent?._id || lead.salesAgent || '');
            setSelectedTags(Array.isArray(lead.tags) ? lead.tags.map(t => t.name || t).filter(Boolean) : []);
            setLeadName(lead.name || '');
            setLeadSource(lead.source || '');
            setLeadStatus(lead.status || '');
            setLeadPriority(lead.priority || '');
            setTimeToClose(lead.status === 'Closed' ? 0 : (lead.timeToClose || 0));
        }
    }, [leadData]);

    // Track form changes for UX feedback
    useEffect(() => {
        setFormChanged(true);
    }, [leadName, leadSource, agent, leadStatus, leadPriority, timeToClose, selectedTags]);

    // Auto-reset timeToClose when status changes to Closed
    useEffect(() => {
        if (leadStatus === 'Closed' && timeToClose !== 0) {
            setTimeToClose(0);
        }
    }, [leadStatus]);

    function handleTagToggle(tagName) {
        setSelectedTags(prev => 
            prev.includes(tagName) 
                ? prev.filter(t => t !== tagName) 
                : [...prev, tagName]
        );
    }

    async function addNewTag(e) {
        e?.preventDefault();
        if (!newTagName.trim()) {
            toast.warning("Please enter a tag name");
            return;
        }
        
        setIsAddingTag(true);
        setSubmitError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tags`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newTagName.trim() })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create tag');
            }

            const createdTag = await response.json();
            toast.success(`Tag "${createdTag.name}" created!`);
            setNewTagName('');
            // Refresh tags list without page reload
            if (mutateTags) mutateTags();
            // Auto-select the newly created tag
            setSelectedTags(prev => [...prev, createdTag.name]);
        } catch (error) {
            console.error("Tag creation error:", error);
            toast.error(error.message || 'Failed to create tag');
            setSubmitError(error.message || "An error occurred while creating the tag.");
        } finally {
            setIsAddingTag(false);
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();
        if (!formChanged) {
            toast.info("No changes to save");
            return;
        }
        
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/leads/${leadId}`, {
                method: 'POST', // or 'PUT' depending on your API
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: leadName,
                    source: leadSource,
                    salesAgent: agent,
                    status: leadStatus,
                    tags: selectedTags,
                    timeToClose: leadStatus === 'Closed' ? 0 : Number(timeToClose) || 0,
                    priority: leadPriority
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to update lead');
            }

            const updatedLead = await response.json();
            toast.success("Lead updated successfully!");
            
            // Refresh lead data if mutate is available
            if (updatedLead) setTimeout(() => navigate(`/leads/${leadId}`), 1500);
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.message || 'Failed to update lead');
            setSubmitError(error.message || "An error occurred while updating the lead.");
        } finally {
            setIsSubmitting(false);
        }
    }

    // Color mappings for visual cues
    const statusColors = {
        New: '#3b82f6',
        Contacted: '#8b5cf6', 
        Qualified: '#10b981',
        'Proposal Sent': '#f59e0b',
        Closed: '#64748b'
    };
    
    const priorityColors = {
        High: '#ef4444',
        Medium: '#f59e0b',
        Low: '#22c55e'
    };

    // Loading & Error States
    if (leadLoading) {
        return (
            <>
                <style>{`
                    :root { --crm-bg: #f8fafc; --crm-primary: #6366f1; }
                    body { background: var(--crm-bg); font-family: 'Inter', system-ui, sans-serif; }
                    .crm-loading-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 1rem; }
                    .crm-loading-spinner { width: 48px; height: 48px; border: 4px solid rgba(99,102,241,0.2); border-top-color: var(--crm-primary); border-radius: 50%; animation: spin 1s linear infinite; }
                    @keyframes spin { to { transform: rotate(360deg); } }
                `}</style>
                <div className="crm-loading-wrapper">
                    <div className="crm-loading-spinner"></div>
                    <p className="text-muted fw-medium">Loading lead details...</p>
                </div>
            </>
        );
    }

    if (leadError || !leadData?.lead) {
        return (
            <>
                <style>{`
                    :root { --crm-bg: #f8fafc; --crm-error: #ef4444; --crm-error-bg: #fef2f2; --crm-error-border: #fecaca; }
                    body { background: var(--crm-bg); font-family: 'Inter', system-ui, sans-serif; }
                    .crm-error-wrapper { padding: 4rem 1rem; display: flex; justify-content: center; }
                    .crm-error-card { background: white; border-radius: 20px; padding: 2.5rem; max-width: 500px; width: 100%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid var(--crm-error-border); }
                    .crm-error-icon { width: 64px; height: 64px; background: var(--crm-error-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--crm-error); font-size: 1.5rem; }
                `}</style>
                <div className="crm-error-wrapper">
                    <div className="crm-error-card">
                        <div className="crm-error-icon">⚠️</div>
                        <h4 className="fw-bold mb-2">Lead Not Found</h4>
                        <p className="text-muted mb-4">{leadError || "The lead you're looking for doesn't exist or has been removed."}</p>
                        <Link to="/" className="btn btn-primary d-inline-flex align-items-center gap-2">
                            <MdArrowBack /> Back to Dashboard
                        </Link>
                    </div>
                </div>
            </>
        );
    }

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
                    --crm-error: #ef4444;
                    --crm-error-bg: #fef2f2;
                    --crm-error-border: #fecaca;
                    --crm-success: #22c55e;
                }
                body { 
                    background: var(--crm-bg); 
                    background-image: radial-gradient(circle at 10% 20%, rgba(99,102,241,0.05) 0%, transparent 20%), 
                                      radial-gradient(circle at 90% 80%, rgba(16,185,129,0.05) 0%, transparent 20%);
                    font-family: 'Inter', system-ui, -apple-system, sans-serif; 
                }
                .crm-form-wrapper { padding: 3rem 1rem; }
                .crm-form-card {
                    border: none; border-radius: 24px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.06); overflow: hidden;
                    background: var(--crm-card); max-width: 900px; margin: 0 auto;
                }
                .crm-form-header {
                    padding: 2rem 2rem 1.5rem; border-bottom: 1px solid var(--crm-border);
                    display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;
                }
                .crm-back-link {
                    display: inline-flex; align-items: center; gap: 6px;
                    color: var(--crm-text-secondary); text-decoration: none;
                    font-weight: 500; font-size: 0.9rem; transition: all 0.2s ease;
                }
                .crm-back-link:hover { color: var(--crm-primary); transform: translateX(-3px); }

                .crm-form-body { padding: 2rem; }
                .crm-section-title {
                    font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.2px;
                    color: var(--crm-text-secondary); font-weight: 700; margin: 1.5rem 0 1rem;
                    padding-bottom: 0.5rem; border-bottom: 1px dashed var(--crm-border);
                    display: flex; align-items: center; gap: 8px;
                }
                .crm-section-title::before {
                    content: ''; display: inline-block; width: 4px; height: 16px;
                    background: var(--crm-primary); border-radius: 2px;
                }
                
                .crm-input-group { margin-bottom: 1.25rem; }
                .crm-input-group label {
                    display: block; margin-bottom: 0.5rem; font-weight: 600;
                    color: var(--crm-text-secondary); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.6px;
                }
                .crm-input-wrapper { position: relative; display: flex; align-items: center; }
                .crm-input-wrapper input, .crm-input-wrapper select {
                    width: 100%; padding: 14px 16px 14px 48px; border: 2px solid var(--crm-border);
                    border-radius: 14px; font-size: 1rem; color: var(--crm-text);
                    background: #fff; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    appearance: none;
                }
                .crm-input-wrapper select {
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                    background-repeat: no-repeat; background-position: right 16px center; background-size: 16px;
                }
                .crm-input-wrapper input:focus, .crm-input-wrapper select:focus {
                    outline: none; border-color: var(--crm-primary); box-shadow: 0 0 0 4px rgba(99,102,241,0.15);
                }
                .crm-input-wrapper input:disabled {
                    background: var(--crm-hover); color: var(--crm-text-secondary); cursor: not-allowed;
                }
                .crm-input-wrapper input::placeholder { color: #94a3b8; }
                .crm-input-icon {
                    position: absolute; left: 16px; color: var(--crm-text-secondary); font-size: 1.25rem; z-index: 2;
                }
                
                .crm-tag-chip {
                    display: inline-flex; align-items: center; gap: 6px;
                    padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 500;
                    background: var(--crm-hover); color: var(--crm-text); border: 1px solid var(--crm-border);
                    transition: all 0.2s ease; cursor: pointer; user-select: none;
                }
                .crm-tag-chip:hover { background: #e2e8f0; }
                .crm-tag-chip.selected {
                    background: var(--crm-primary); color: white; border-color: var(--crm-primary);
                    box-shadow: 0 2px 8px rgba(99,102,241,0.25);
                }
                .crm-tag-chip .crm-tag-remove {
                    width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    background: rgba(0,0,0,0.1); color: inherit; font-size: 12px; transition: background 0.2s;
                }
                .crm-tag-chip.selected .crm-tag-remove { background: rgba(255,255,255,0.3); }
                .crm-tag-chip.selected .crm-tag-remove:hover { background: rgba(255,255,255,0.5); }
                
                .crm-tags-container {
                    display: flex; flex-wrap: wrap; gap: 8px; min-height: 48px; padding: 8px 0;
                }
                
                .crm-add-tag-row {
                    display: flex; gap: 10px; align-items: center; margin-top: 0.5rem;
                    padding: 12px; background: var(--crm-hover); border-radius: 14px; border: 1px dashed var(--crm-border);
                }
                .crm-add-tag-input {
                    flex: 1; padding: 10px 14px; border: 2px solid var(--crm-border); border-radius: 12px;
                    font-size: 0.95rem; transition: border-color 0.2s;
                }
                .crm-add-tag-input:focus { outline: none; border-color: var(--crm-primary); }
                
                .crm-submit-btn {
                    background: linear-gradient(135deg, var(--crm-primary), var(--crm-primary-dark));
                    border: none; padding: 15px 28px; border-radius: 14px; font-weight: 600;
                    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
                    width: 100%; font-size: 1rem; color: white; transition: all 0.2s ease;
                    cursor: pointer; margin-top: 1rem;
                }
                .crm-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(99,102,241,0.35); }
                .crm-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; box-shadow: none; }
                
                .crm-secondary-btn {
                    background: var(--crm-hover); border: 1px solid var(--crm-border); color: var(--crm-text);
                    padding: 10px 18px; border-radius: 12px; font-weight: 500; display: inline-flex;
                    align-items: center; gap: 6px; transition: all 0.2s ease; cursor: pointer;
                }
                .crm-secondary-btn:hover:not(:disabled) { background: #e2e8f0; border-color: #cbd5e1; }
                .crm-secondary-btn:disabled { opacity: 0.6; cursor: not-allowed; }

                .crm-error-alert {
                    background: var(--crm-error-bg); border: 1px solid var(--crm-error-border);
                    color: var(--crm-error); padding: 14px 16px; border-radius: 14px;
                    margin-bottom: 1.5rem; display: flex; align-items: center; gap: 12px; font-weight: 500;
                    animation: slideIn 0.3s ease;
                }
                .crm-status-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 8px; }
                .crm-priority-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 8px; }
                
                .crm-changed-indicator {
                    display: inline-flex; align-items: center; gap: 6px;
                    font-size: 0.8rem; color: var(--crm-primary); font-weight: 500;
                    margin-left: 8px; animation: pulse 2s infinite;
                }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 768px) {
                    .crm-form-header { flex-direction: column; align-items: flex-start; }
                    .crm-add-tag-row { flex-direction: column; align-items: stretch; }
                }
            `}</style>

            <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
            
            <div className="container crm-form-wrapper">
                <div className="crm-form-card">
                    <div className="crm-form-header">
                        <div>
                            <h2 className="fw-bold mb-1" style={{ color: 'var(--crm-text)' }}>Edit Lead</h2>
                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                                Update details for <strong className="text-primary">{leadData?.lead?.name}</strong>
                            </p>
                        </div>
                        <Link to={`/leads/${leadId}`} className="crm-back-link">
                            <MdArrowBack /> Back to Lead
                        </Link>
                    </div>

                    <div className="crm-form-body">
                        {submitError && (
                            <div className="crm-error-alert">
                                <MdErrorOutline size={22} />
                                {submitError}
                            </div>
                        )}

                        <form onSubmit={handleUpdate} noValidate>
                            {/* Lead Info Section */}
                            <div className="crm-section-title">
                                Lead Information
                                {formChanged && <span className="crm-changed-indicator"><MdEdit size={14} /> Unsaved changes</span>}
                            </div>
                            <div className="row g-4">
                                <div className="col-md-6 crm-input-group">
                                    <label htmlFor="leadName">Lead Name *</label>
                                    <div className="crm-input-wrapper">
                                        <MdPerson className="crm-input-icon" />
                                        <input
                                            type="text"
                                            id="leadName"
                                            placeholder="e.g. Acme Corporation"
                                            value={leadName}
                                            onChange={(e) => setLeadName(e.target.value)}
                                            autoComplete="organization"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 crm-input-group">
                                    <label htmlFor="leadSource">Lead Source *</label>
                                    <div className="crm-input-wrapper">
                                        <MdSource className="crm-input-icon" />
                                        <select
                                            id="leadSource"
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
                                </div>
                            </div>

                            {/* Assignment & Status Section */}
                            <div className="crm-section-title">Assignment & Pipeline</div>
                            <div className="row g-4">
                                <div className="col-md-6 crm-input-group">
                                    <label htmlFor="salesAgent">Sales Agent *</label>
                                    <div className="crm-input-wrapper">
                                        <MdPersonAdd className="crm-input-icon" />
                                        <select
                                            id="salesAgent"
                                            value={agent}
                                            onChange={(e) => setAgent(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>--Select Agent--</option>
                                            {salesAgentsLoading ? (
                                                <option disabled>Loading agents...</option>
                                            ) : salesAgentsError ? (
                                                <option disabled>Error loading agents</option>
                                            ) : agents.length > 0 ? (
                                                agents.map((a) => (
                                                    <option key={a._id} value={a._id}>{a.name}</option>
                                                ))
                                            ) : (
                                                <option disabled>No agents available</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 crm-input-group">
                                    <label htmlFor="leadStatus">Lead Status *</label>
                                    <div className="crm-input-wrapper">
                                        <MdFlag className="crm-input-icon" />
                                        <select
                                            id="leadStatus"
                                            value={leadStatus}
                                            onChange={(e) => setLeadStatus(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>--Select Status--</option>
                                            {['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'].map((status) => (
                                                <option key={status} value={status}>
                                                    <span className="crm-status-dot" style={{ backgroundColor: statusColors[status] }}></span>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 crm-input-group">
                                    <label htmlFor="leadPriority">Priority *</label>
                                    <div className="crm-input-wrapper">
                                        <MdPriorityHigh className="crm-input-icon" />
                                        <select
                                            id="leadPriority"
                                            value={leadPriority}
                                            onChange={(e) => setLeadPriority(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>--Select Priority--</option>
                                            {['High', 'Medium', 'Low'].map((priority) => (
                                                <option key={priority} value={priority}>
                                                    <span className="crm-priority-dot" style={{ backgroundColor: priorityColors[priority] }}></span>
                                                    {priority}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6 crm-input-group">
                                    <label htmlFor="timeToClose">Time to Close (days)</label>
                                    <div className="crm-input-wrapper">
                                        <MdAccessTime className="crm-input-icon" />
                                        <input
                                            type="number"
                                            id="timeToClose"
                                            placeholder="e.g. 30"
                                            value={timeToClose}
                                            onChange={(e) => setTimeToClose(e.target.value)}
                                            min="0"
                                            disabled={leadStatus === 'Closed'}
                                            required
                                        />
                                    </div>
                                    {leadStatus === 'Closed' && (
                                        <small className="text-muted" style={{ fontSize: '0.8rem' }}>Auto-set to 0 for Closed leads</small>
                                    )}
                                </div>
                            </div>

                            {/* Tags Section */}
                            <div className="crm-section-title d-flex justify-content-between align-items-center">
                                <span>Tags</span>
                                <small className="text-muted fw-normal">Click to toggle selection</small>
                            </div>
                            
                            {/* Selected Tags Display */}
                            {selectedTags.length > 0 && (
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    {selectedTags.map(tagName => (
                                        <span 
                                            key={tagName} 
                                            className="crm-tag-chip selected"
                                            onClick={() => handleTagToggle(tagName)}
                                            title="Click to remove"
                                        >
                                            <MdTag size={14} />
                                            {tagName}
                                            <span className="crm-tag-remove" onClick={(e) => { e.stopPropagation(); handleTagToggle(tagName); }}>
                                                <MdClose size={12} />
                                            </span>
                                        </span>
                                    ))}
                                </div>
                            )}
                            
                            {/* Available Tags Grid */}
                            <div className="crm-tags-container">
                                {tagsLoading ? (
                                    <span className="text-muted small">Loading tags...</span>
                                ) : tagsError ? (
                                    <span className="text-danger small">Error loading tags</span>
                                ) : tags.length > 0 ? (
                                    tags.map(tagItem => (
                                        <span
                                            key={tagItem._id}
                                            className={`crm-tag-chip ${selectedTags.includes(tagItem.name) ? 'selected' : ''}`}
                                            onClick={() => handleTagToggle(tagItem.name)}
                                            title={selectedTags.includes(tagItem.name) ? "Click to remove" : "Click to add"}
                                        >
                                            {selectedTags.includes(tagItem.name) && <MdCheck size={14} />}
                                            {tagItem.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-muted small">No tags available</span>
                                )}
                            </div>
                            
                            {/* Add New Tag Inline */}
                            <div className="crm-add-tag-row">
                                <input
                                    type="text"
                                    className="crm-add-tag-input"
                                    placeholder="Create a new tag..."
                                    value={newTagName}
                                    onChange={(e) => setNewTagName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addNewTag(e)}
                                />
                                <button 
                                    type="button" 
                                    className="crm-secondary-btn" 
                                    onClick={addNewTag}
                                    disabled={isAddingTag || !newTagName.trim()}
                                >
                                    {isAddingTag ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : <MdAdd size={18} />}
                                    Add
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="crm-submit-btn"
                                disabled={isSubmitting || !formChanged || !leadName || !leadSource || !agent || !leadStatus || !leadPriority}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Saving Changes...
                                    </>
                                ) : (
                                    <>
                                        <MdSave size={20} /> Save Changes
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="text-center text-muted mt-4" style={{ fontSize: '0.85rem' }}>
                            <em>Redirects to lead detail view upon successful update</em>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditLeads;