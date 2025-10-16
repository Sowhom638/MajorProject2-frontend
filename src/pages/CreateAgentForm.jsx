import { useState } from "react";
import useFetch from "../../useFetch";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

function CreateAgentForm() {
    const [agentName, setAgentName] = useState('');
    const [agentEmail, setAgentEmail] = useState('');
    const navigate = useNavigate();


    async function addNewAgent(e) {
        e.preventDefault();

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

            const createdLead = await response.json();
            console.log("Lead created:", createdLead);
            navigate('/salesagents'); // Redirect to agent list on success
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
                        <h5 className="mb-0 fw-bold text-primary">Add New Agent</h5>
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
                                    <button className="btn btn-primary" type="submit">Create Agent</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAgentForm;