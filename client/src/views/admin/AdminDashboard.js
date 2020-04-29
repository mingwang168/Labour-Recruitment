import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import * as Auth from '../../utils/Auth';
import * as DataSanitizer from '../../utils/DataSanitizer';
import Table from '../components/Table';
import { ADMIN_DASHBOARD_JOBS_TABLE_COLUMNS   } from '../../utils/TableColumns';

const BASE_URL = "http://localhost:5001/api";

const AdminDashboard = (props) => {

    const [jobs, setJobs] = useState();

    const fetchJobs = async() => {
        try {
            let response = await fetch(BASE_URL + "/Job/GetAllActiveJobs", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            });

            let data = await response.json();
            if(data.length) {
                setJobs(DataSanitizer.cleanAdminJobs(data));
                console.log(data);
            }
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, [])

    return (
    <>
    {/* Page Header */}
    <div className="page-header">
    <h2 className="pageheader-title">
        Welcome back, {props.name}!
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

    {/* Active Jobs Table */}
    <div className="row">
    <div className="col">
    <div className="card">
    <h5 className="card-header">Active Jobs</h5>
    <div className="card-body">
        { jobs ?
        <Table
            columns={ADMIN_DASHBOARD_JOBS_TABLE_COLUMNS}
            data={jobs}
            {...props}
        />
        :
        <p className="lead">No jobs to display.</p>
        }
    </div>
    </div>
    </div>
    </div>
    </>
    )
}

export default AdminDashboard;
