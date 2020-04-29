import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import * as Auth from '../../utils/Auth';
import * as DataSanitizer from '../../utils/DataSanitizer';

import Table from '../components/Table';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

// import { INVOICES_TABLE_COLUMNS   } from '../../utils/TableColumns';
const BASE_URL = "http://localhost:5001/api";

const AdminInvoices = (props) => {

    const [invoices, setInvoices] = useState();

    const fetchInvoices = async() => {
        try {
            let response = await fetch(BASE_URL + "/Invoices", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            });

            let data = await response.json();
            if(data.length) {
                // console.log(data);
                // fetchInvoices(DataSanitizer.cleanInvoicesData(data));
            }
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        // fetchInvoices();
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
                    Manage Invoices
                </h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/dashboard" className="breadcrumb-link">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Invoices
                    </li>
                </ol>
                </nav>
                </div>
                </div>

                {/* Incidents Table */}
                <div className="row">
                <div className="col">
                <div className="card">
                <h5 className="card-header">All Invoices</h5>
                <div className="card-body">
                    {/* { incidents ?
                    <Table
                        columns={INVOICES_TABLE_COLUMNS}
                        data={invoices}
                        path={"/invoices"}
                        {...props}
                    />
                    :
                    <p className="lead">No invoices to display.</p>
                    } */}
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

export default AdminInvoices;