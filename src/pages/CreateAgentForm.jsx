import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { MdPerson, MdEmail, MdAddCircle, MdArrowBack, MdErrorOutline } from "react-icons/md";

function CreateAgentForm() {
    const [agentName, setAgentName] = useState('');
    const [agentEmail, setAgentEmail] = useState(''); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();

    async function addNewAgent(e) {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/agents`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: agentName, email: agentEmail })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create Agent');
            }

            await response.json();
            toast.success("New Agent created successfully!");
            setAgentName('');
            setAgentEmail('');
            setTimeout(() => navigate('/salesagents'), 2000);
        } catch (error) {
            console.error("Submission error:", error);
            toast.warning(error.message || 'An unknown error occurred');
            setSubmitError(error.message || "An error occurred while creating the agent.");
        } finally {
            setIsSubmitting(false);
        }
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
                    background: var(--crm-card); max-width: 850px; margin: 0 auto;
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
                .crm-input-group { margin-bottom: 1.5rem; }
                .crm-input-group label {
                    display: block; margin-bottom: 0.5rem; font-weight: 600;
                    color: var(--crm-text-secondary); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.6px;
                }
                .crm-input-wrapper {
                    position: relative; display: flex; align-items: center;
                }
                .crm-input-wrapper input {
                    width: 100%; padding: 14px 16px 14px 48px; border: 2px solid var(--crm-border);
                    border-radius: 14px; font-size: 1rem; color: var(--crm-text);
                    background: #fff; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .crm-input-wrapper input:focus {
                    outline: none; border-color: var(--crm-primary); box-shadow: 0 0 0 4px rgba(99,102,241,0.15);
                }
                .crm-input-wrapper input::placeholder { color: #94a3b8; }
                .crm-input-icon {
                    position: absolute; left: 16px; color: var(--crm-text-secondary); font-size: 1.25rem;
                }
                .crm-submit-btn {
                    background: linear-gradient(135deg, var(--crm-primary), var(--crm-primary-dark));
                    border: none; padding: 15px 28px; border-radius: 14px; font-weight: 600;
                    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
                    width: 100%; font-size: 1rem; color: white; transition: all 0.2s ease;
                    cursor: pointer; margin-top: 0.5rem;
                }
                .crm-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(99,102,241,0.35); }
                .crm-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; box-shadow: none; }

                .crm-error-alert {
                    background: var(--crm-error-bg); border: 1px solid var(--crm-error-border);
                    color: var(--crm-error); padding: 14px 16px; border-radius: 14px;
                    margin-bottom: 1.5rem; display: flex; align-items: center; gap: 12px; font-weight: 500;
                    animation: slideIn 0.3s ease;
                }
                .crm-success-note { 
                    font-size: 0.85rem; color: var(--crm-text-secondary); margin-top: 1.5rem; text-align: center; 
                    opacity: 0.8;
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
            
            <div className="container crm-form-wrapper">
                <div className="crm-form-card">
                    <div className="crm-form-header">
                        <div>
                            <h2 className="fw-bold mb-1" style={{ color: 'var(--crm-text)' }}>Create New Agent</h2>
                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>Add a team member to your CRM pipeline</p>
                        </div>
                        <Link to="/salesagents" className="crm-back-link">
                            <MdArrowBack /> Back to Agents
                        </Link>
                    </div>

                    <div className="crm-form-body">
                        {submitError && (
                            <div className="crm-error-alert">
                                <MdErrorOutline size={22} />
                                {submitError}
                            </div>
                        )}

                        <form onSubmit={addNewAgent} noValidate>
                            <div className="row g-4">
                                <div className="col-md-6 crm-input-group">
                                    <label htmlFor="agentName">Agent Name</label>
                                    <div className="crm-input-wrapper">
                                        <MdPerson className="crm-input-icon" />
                                        <input
                                            type="text"
                                            id="agentName"
                                            placeholder="e.g. Sarah Johnson"
                                            value={agentName}
                                            onChange={(e) => setAgentName(e.target.value)}
                                            autoComplete="name"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 crm-input-group">
                                    <label htmlFor="agentEmail">Agent Email</label>
                                    <div className="crm-input-wrapper">
                                        <MdEmail className="crm-input-icon" />
                                        <input
                                            type="email"
                                            id="agentEmail"
                                            placeholder="e.g. sarah@company.com"
                                            value={agentEmail}
                                            onChange={(e) => setAgentEmail(e.target.value)}
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button disabled={isSubmitting} className="crm-submit-btn" type="submit">
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Creating Agent...
                                    </>
                                ) : (
                                    <>
                                        <MdAddCircle size={20} /> Create Agent
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="crm-success-note">
                            <em>Redirects automatically to the agents directory upon successful creation.</em>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAgentForm;