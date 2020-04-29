import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import * as Auth from '../../utils/Auth';
import * as DataSanitizer from '../../utils/DataSanitizer';

import Table from '../components/Table';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

import { LABOURERS_TABLE_COLUMNS   } from '../../utils/TableColumns';
const BASE_URL = "http://localhost:5001/api";

const AdminLabourers = (props) => {

    const [labourers, setLabourers] = useState();

    const fetchLabourers = async() => {
        try {
            let response = await fetch(BASE_URL + "/Labourers", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            });

            let data = await response.json();
            if(data.length) {
                setLabourers(DataSanitizer.cleanLabourersData(data));
            }
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchLabourers();
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
                    Manage Labourers
                </h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/dashboard" className="breadcrumb-link">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Labourers
                    </li>
                </ol>
                </nav>
                </div>
                </div>

                {/* All Jobs Table */}
                <div className="row">
                <div className="col">
                <div className="card">
                <h5 className="card-header">All Labourers</h5>
                <div className="card-body">
                    { labourers ?
                    <Table
                        columns={LABOURERS_TABLE_COLUMNS}
                        data={labourers}
                        path={"/profile/labourer"}
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

export default AdminLabourers;