import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = ({name}) => {
    return (
    <>
    {/* Page Header */}
    <div className="page-header">
    <h2 className="pageheader-title">
        Welcome back, {name}!
    </h2>
    <div className="page-breadcrumb">
    <nav aria-label="breadcrumb">
    <ol className="breadcrumb">
        <li className="breadcrumb-item">
            <Link to="/dashboard" className="breadcrumb-link">Dashboard</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
            Admin Dashboard
        </li>
    </ol>
    </nav>
    </div>
    </div>
    </>
    )
}

export default AdminDashboard;
