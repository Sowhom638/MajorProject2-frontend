import { useEffect, useState } from "react";
import useFetch from "../../useFetch";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

function LeadManagement() {
    const { leadId } = useParams()
    const [remainingDays, setRemainingDays] = useState(null);
    const [agent, setAgent] = useState('');
    const [commentText, setCommentText] = useState('');
      const [refetchTrigger, setRefetchTrigger] = useState(0); // ✅ Add this


  const { data: lead, loading: leadsLoading, error: leadsError } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/leads/${leadId}?_=${refetchTrigger}`
  );
  const { data: comments, loading: commentsLoading, error: commentsError } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}/leads/${leadId}/comments?_=${refetchTrigger}`
  );const { data: salesAgents, loading: salesAgentsLoading, error: salesAgentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);
    useEffect(() => {
        if (lead) if (!lead?.lead?.createdAt || !lead?.lead?.timeToClose) return;

        const calculateRemaining = () => {
            const createdAt = new Date(lead?.lead?.createdAt);
            const totalMillisec = lead?.lead?.timeToClose * 24 * 60 * 60 * 1000; // days → ms
            const targetCloseDate = new Date(createdAt.getTime() + totalMillisec);
            const now = new Date();
            const diffMs = targetCloseDate - now;

            if (diffMs <= 0) {
                setRemainingDays(0);
            } else {
                const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
                setRemainingDays(diffDays);
            }
        };

        // Calculate immediately
        calculateRemaining();

        // Update every minute (or every second if needed)
        const interval = setInterval(calculateRemaining, 60000); // every minute

        return () => clearInterval(interval);
    }, [lead?.lead?.createdAt, lead?.lead?.timeToClose]);

    async function addNewComment(e) {
        e.preventDefault();
        if (agent === '' || commentText === '') alert("Please Fill the form")
        else {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/leads/${leadId}/comments`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        lead: leadId,
                        author: agent,
                        commentText
                    })
                });
                if (!response.ok) {
                    throw "Failed to add comment";
                }
                const commentData = await response.json();
                console.log("Added comment: ", commentData);
                window.location.reload();
            }
            catch (error) {
                alert("Error: ", error.message)
            }
        }
    }

    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-4">Anvaya CRM</h2>

                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary text-center">Lead Management: {lead?.lead.name}</h5>
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
                                <h6 className="text-secondary fw-bold mb-3">Lead Details</h6>

                                <div className="d-flex flex-wrap gap-2 mb-4">

                                    {lead?.lead ? (
                                        <div className="py-2">
                                            <p className="px-3" style={{ color: `#4C763B` }}><b>Name:</b> {lead?.lead.name}</p>
                                            <p className="px-3"><b>Status:</b> {lead?.lead.status}</p>
                                            <p className="px-3"><b>Sales Agent:</b> {lead?.lead?.salesAgent?.name || "SalesAgent not found"}</p>
                                            <p className="px-3"><b>Lead Source:</b> {lead?.lead.source}</p>
                                            <p className="px-3"><b>Time to close:</b> in {
                                                lead?.status === 'Closed' ? 0 : remainingDays || 0
                                        } days</p>
                                        </div>)
                                        : (
                                            <div className="py-2 d-flex gap-3">
                                                {leadsLoading && <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                                {leadsError && <p className="text-danger">{leadsError}</p>}
                                                {'  '}No lead of this status or salesAgents</div>
                                        )}
                                </div>
                                <Link to={`/editLead/${leadId}`} className="btn btn-primary">
                                    Edit Lead Details
                                </Link>
                                <hr />

                                <div className="mb-4">
                                    <h6 className="text-secondary fw-bold mb-3">Comments</h6>
                                    {comments && comments?.comments?.length > 0  && comments?.comments?.filter((comment)=>comment.lead === leadId)?.length > 0 ?
                                        (
                                            <div>
                                                {comments?.comments?.filter((comment)=>comment.lead === leadId)?.map((comment) => (
                                                    <div key={comment._id}>
                                                        <p>{comment.author.name} <span className="text-secondary fw-light">{comment.createdAt.split("T")[0]}</span></p>
                                                        <p className="fs-5">{comment.commentText}</p>
                                                        <hr />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div>
                                                {commentsLoading && <div className="spinner-border text-secondary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                                {commentsError && <p>{commentsError}</p>}
                                            </div>)
                                    }

                                </div>

                                <form onSubmit={addNewComment}>
                                    <div className="form-group">
                                        <label htmlFor="salesAgent">Author: </label>
                                        <select name="salesAgent" className="form-control my-1 px-2 py-1" id="salesAgent" onChange={(e) => setAgent(e.target.value)}>
                                            <option name="salesAgent" value="">--Select Author--</option>
                                            {salesAgents && salesAgents?.length > 0 ? salesAgents?.map((agent) => (
                                                <option name="salesAgent" key={agent._id} value={agent._id}>{agent.name}</option>
                                            )) : (<option name="salesAgent" value="" disabled>
                                                {salesAgentsLoading && <div className="spinner-border text-light" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                                {salesAgentsError && <p className="text-danger">{salesAgentsError}</p>}
                                                {'  '}No sales Agent is listed
                                            </option>)}
                                        </select>
                                    </div>
                                    <input type="text" className="form-control my-1 px-2 py-1" placeholder="Write Comment here" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
                                    <button type="submit" className="btn btn-secondary ">
                                        + Add Comment
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default LeadManagement;