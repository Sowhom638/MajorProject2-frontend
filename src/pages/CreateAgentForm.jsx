import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

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
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: agentName,
                    email: agentEmail
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create Agent');
            }

            const createdAgent = await response.json();
            toast.success("New Agent is created!");
            console.log("Agent created:", createdAgent);
            setAgentName('');
            setAgentEmail('');
            setTimeout(()=> navigate('/salesAgents'),2000)
        } catch (error) {
            console.error("Submission error:", error);
             toast.warning(error.message || 'An unknown error occurred');
       setSubmitError(error.message || "An error occurred while creating the TAG.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-4">Anvaya CRM</h2>

                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary">Add New Agent</h5>
                    </div>

                    <div className="card-body p-0">
                        <div className="row g-0">
                            {/* Sidebar */}
                            <div className="col-md-3 border-end bg-light">
                                <div className="p-3">
                                    <h6 className="text-secondary fw-bold mb-3">Navigation</h6>
                                    <Link to="/salesagents" className="text-dark text-decoration-none d-block p-2">
                                        <MdKeyboardArrowLeft /> Back
                                    </Link>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-md-9 p-4">
                                {submitError && (
                                    <div className="alert alert-danger">{submitError}</div>
                                )}

                                <form onSubmit={addNewAgent}>
                                    <div className="form-group my-2">
                                        <label htmlFor="agentName">Agent Name</label>
                                        <input
                                            type="text"
                                            id="agentName"
                                            className="form-control"
                                            value={agentName}
                                            onChange={(e) => setAgentName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group my-2">
                                        <label htmlFor="agentEmail">Agent Email</label>
                                        <input
                                            type="email"
                                            id="agentEmail"
                                            className="form-control"
                                            value={agentEmail}
                                            onChange={(e) => setAgentEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button disabled={isSubmitting} className="btn btn-primary" type="submit">
                                       {isSubmitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Creating...
                                            </>
                                        ) : (
                                            " Create"
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

export default CreateAgentForm;