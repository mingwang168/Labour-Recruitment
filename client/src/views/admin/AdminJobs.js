import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import * as Auth from '../../utils/Auth';
import * as DataSanitizer from '../../utils/DataSanitizer';

import Table from '../components/Table';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

import { JOBS_TABLE_COLUMNS   } from '../../utils/TableColumns';
const BASE_URL = "http://localhost:5001/api";

const AdminJobs = (props) => {

    const [jobs, setJobs] = useState();

    const fetchJobs = async() => {
        try {
            let response = await fetch(BASE_URL + "/Job/GetAllJobs", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            });

            let data = await response.json();
            if(data.length) {
                setJobs(DataSanitizer.cleanJobsData(data));
            }
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, [])

    return (
    <div className="dashboard-main-wrapper">
        <TopNav />
        <SideNav />
    
        <div className="dashboard-wrapper">
            <div className="container-fluid dashboard-content">
                {/* Page Header */}
                <div className="page-header">
                <h2 className="pageheader-title">
                    Manage Jobs
                </h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/dashboard" className="breadcrumb-link">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Jobs
                    </li>
                </ol>
                </nav>
                </div>
                </div>

                {/* All Jobs Table */}
                <div className="row">
                <div className="col">
                <div className="card">
                <h5 className="card-header">All Jobs</h5>
                <div className="card-body">
                    { jobs ?
                    <Table
                        columns={JOBS_TABLE_COLUMNS}
                        data={jobs}
                        path={"/job"}
                        {...props}
                    />
                    :
                    <p className="lead">No jobs to display.</p>
                    }
                </div>
                </div>
                </div>
                </div>
            </div>
            <Footer />
        </div>
    </div>
    );
}

export default AdminJobs;