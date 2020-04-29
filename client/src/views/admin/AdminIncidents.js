import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import * as Auth from '../../utils/Auth';
import * as DataSanitizer from '../../utils/DataSanitizer';

import Table from '../components/Table';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

import { INCIDENTS_TABLE_COLUMNS   } from '../../utils/TableColumns';
const BASE_URL = "http://localhost:5001/api";

const AdminIncidents = (props) => {

    const [incidents, setIncidents] = useState();

    const fetchIncidents = async() => {
        try {
            let response = await fetch(BASE_URL + "/Incidents", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            });

            let data = await response.json();
            if(data.length) {
                console.log(data)
                setIncidents(DataSanitizer.cleanIncidentsData(data));
            }
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchIncidents();
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
                    Manage Incidents
                </h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/dashboard" className="breadcrumb-link">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Incidents
                    </li>
                </ol>
                </nav>
                </div>
                </div>

                {/* Incidents Table */}
                <div className="row">
                <div className="col">
                <div className="card">
                <h5 className="card-header">All Labourers</h5>
                <div className="card-body">
                    { incidents ?
                    <Table
                        columns={INCIDENTS_TABLE_COLUMNS}
                        data={incidents}
                        path={"/incident"}
                        {...props}
                    />
                    :
                    <p className="lead">No incidents to display.</p>
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

export default AdminIncidents;