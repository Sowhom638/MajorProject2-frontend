import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useSearchParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useFetch from '../../useFetch'
import { MdKeyboardArrowRight } from "react-icons/md";
import { Cell, Pie, PieChart, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
function Reports() {
    const [searchStatus, setSearchStatus] = useSearchParams()
    const statuses = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'];
    const { data: leads, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/leads`);
    const { data: salesAgents, loading: salesAgentsLoading, error: salesAgentsError } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/agents`);

    const statusBasedPieChart_Data = statuses.map((status)=>({
        name: status,
        value: leads && leads?.leads?.length > 0 ? leads?.leads?.filter((lead) => lead.status === status)?.length : 0
    }))
    const pieChart1_Data = [
        {
            name: "Closed",
            value: leads && leads?.leads?.length > 0 ? leads?.leads?.filter((lead) => lead.status === 'Closed')?.length : 0
        },
        {
            name: "In Pipeline",
            value: leads && leads?.leads?.length > 0 ? leads?.leads?.filter((lead) => lead.status !== 'Closed')?.length : 0
        }
    ];
    const closedBySalesAgent_BarChartData = salesAgents && salesAgents?.length > 0 ? salesAgents?.map((agent) => ({
        name: agent.name,
        value: leads && leads?.leads?.length > 0 ? leads?.leads?.filter((lead) => lead.salesAgent._id === agent._id)?.filter((lead) => lead.status === 'Closed')?.length : 0
    })) : [];

    console.log(closedBySalesAgent_BarChartData);
    
    const COLORS = ['#1f3018ff', '#307714ff', '#669c51ff', '#bbdbaeff', '#bbd672ff']

    return (
        <>
            <ToastContainer position="bottom-right" />
            <div className="container mt-4">
                <h2 className="mb-4">Anvaya CRM</h2>

                <div className="card shadow-sm border rounded-3">
                    <div className="card-header bg-white text-center py-3">
                        <h5 className="mb-0 fw-bold text-primary text-center">CRM Reports</h5>
                    </div>

                    <div className="card-body p-0">
                        <div className="row g-0">
                            {/* Sidebar */}
                            <div className="col-md-3 border-end bg-light">
                                <div className="p-3">
                                    <h6 className="text-secondary fw-bold mb-3">Sidebar</h6>
                                    <ul className="list-unstyled mb-0">
                                        {['Leads', 'SalesAgents', 'Reports', 'Settings'].map((item) => (
                                            <li key={item} className="mb-2">
                                                <Link to={`/${item.toLowerCase()}`} className="text-dark text-decoration-none d-block p-2 rounded hover-bg">
                                                    {item}<MdKeyboardArrowRight />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="col-md-9 p-4">
                                <h6 className="text-secondary fw-bold mb-3 fs-4 text-center">Reports Overview</h6>
                                {leads && leads?.leads?.length > 0 ? (
                                    <div className='d-flex justify-content-center align-items-center gap-4'>
                                        <PieChart width={300} height={300}>
                                            <Pie
                                                dataKey='value'
                                                data={pieChart1_Data}
                                                cx={150}
                                                cy={150}
                                                fill='#763b5fff'
                                                label
                                            >
                                                {pieChart1_Data.map((entry, index) => (
                                                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                        <h3>Total Leads closed and in Pipeline</h3>
                                    </div>) : (
                                    <div className="py-3">
                                        {loading ? (
                                            <div className="spinner-border text-success" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : error ? (
                                            <p className="text-danger">{error}</p>
                                        ) : (
                                            'No leads found.'
                                        )}
                                    </div>
                                )}
                                <hr />

                                <h3 className='mb-2'>Leads closed by sales agent</h3>
                                {salesAgents?.length > 0 ? (
                                    <div className='d-flex justify-content-center align-items-center gap-4 my-2'>
                                        <BarChart
                                            style={{ width: '50%', maxWidth: '300px', heighteight: '200px', aspectRatio: 1.618 }}
                                            responsive
                                            data={closedBySalesAgent_BarChartData}
                                        >
                                            <XAxis dataKey="name" />
                                            <YAxis width="auto" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="value" fill="#669c51ff" />
                                        </BarChart>
                                    </div>) : (
                                    <div className="py-3">
                                        {salesAgentsLoading ? (
                                            <div className="spinner-border text-success" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : salesAgentsError ? (
                                            <p className="text-danger">{salesAgentsError}</p>
                                        ) : (
                                            'No leads found.'
                                        )}
                                    </div>
                                )}
                                <hr />
                                {leads && leads?.leads?.length > 0 ? (
                                    <div className='d-flex justify-content-center align-items-center gap-4'>
                                        <PieChart width={300} height={300}>
                                            <Pie
                                                dataKey='value'
                                                data={statusBasedPieChart_Data}
                                                cx={150}
                                                cy={150}
                                                fill='#763b5fff'
                                                label
                                            >
                                                {statusBasedPieChart_Data.map((entry, index) => (
                                                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                        <h3>Leads status distribution</h3>
                                    </div>) : (
                                    <div className="py-3">
                                        {loading ? (
                                            <div className="spinner-border text-success" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        ) : error ? (
                                            <p className="text-danger">{error}</p>
                                        ) : (
                                            'No leads found.'
                                        )}
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reports
