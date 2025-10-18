import { Link } from "react-router-dom";
import useFetch from "../../useFetch";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

function Settings() {
    const { data: leads, loading: leadsLoading, error: leadsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);

    async function handleDeleteLead(leadId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/leads/${leadId}`, {
                method: 'DELETE'
            })
            if (response.ok) {
                const data = await response.json();
                if (data) {
                    console.log(data);
                    toast.info("New Tag is deleted!");
                    setInterval(() => window.location.reload(), 2000)
                } else {
                    throw 'Failed to delete the Lead'
                }
            } else {
                const errData = await response.json();
                throw new Error(errData.message || 'Failed to delete lead');
            }
        } catch (error) {
            toast.warning(error.message || 'An unknown error occurred');
        }
    }
    return (
        <>
            <div className="container mt-4">
                <h2 className="mb-4">Anvaya CRM</h2>

                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary text-center">Settings</h5>
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
                                <h6 className="text-secondary fw-bold mb-3">Lead Names</h6>

                                <div className="d-flex flex-wrap gap-2 mb-4">
                                    <div>
                                        <div className="py-2 d-flex">
                                            <div className="py-2 d-flex align-items-center justify-content-center">
                                                <span className="md:mx-5 sm:mx-2"><b>--Lead Name--</b></span>
                                                <span className="md:mx-5 sm:mx-2"><b>--Status--</b></span>
                                                <span className="md:mx-5 sm:mx-2"><b>--SalesAgent--</b></span>
                                                <hr />
                                            </div>
                                        </div>
                                        {leads && leads?.leads?.length > 0 ? leads?.leads?.map((lead) => (
                                            <div className="py-2 d-flex mb-1" key={lead._id}>
                                                <span className="md:mx-5 sm:mx-2" style={{ color: `#4C763B` }}>--{lead.name.length > 8 ? lead.name.slice(0, 10) + '...' : lead.name}--</span>
                                                <span className="md:mx-5 sm:mx-2">--{lead.status}--</span>
                                                <span className="md:mx-5 sm:mx-2">--{lead.salesAgent.name}-----<button className="bg-danger text-white border-none rounded" onClick={() => handleDeleteLead(lead._id)}>Delete</button></span>
                                                <hr />
                                            </div>
                                        )) : (
                                            <tr className="py-2 d-flex gap-3">
                                                {leadsLoading && <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>}
                                                {leadsError && <p className="text-danger">{leadsError}</p>}
                                                {'  '}No leads are inserted yet</tr>
                                        )}
                                    </div>

                                </div>

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