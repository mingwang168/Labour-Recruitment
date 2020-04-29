import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import * as Auth from '../../utils/Auth';
import * as DataSanitizer from '../../utils/DataSanitizer';

import Table from '../components/Table';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

import { PAYRATES_TABLE_COLUMNS   } from '../../utils/TableColumns';
const BASE_URL = "http://localhost:5001/api";

const AdminPayrates = (props) => {

    const [skills, setSkills] = useState();

    const fetchSkills = async() => {
        try {
            let response = await fetch(BASE_URL + "/skills", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            });

            let data = await response.json();
            if(data.length) {
                setSkills(DataSanitizer.cleanPayratesData(data));
            }
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchSkills();
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
                    Manage Skill Payrates
                </h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/dashboard" className="breadcrumb-link">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Skills
                    </li>
                </ol>
                </nav>
                </div>
                </div>

                {/* Incidents Table */}
                <div className="row">
                <div className="col">
                <div className="card">
                <h5 className="card-header">All Skills</h5>
                <div className="card-body">
                    { skills ?
                    <Table
                        columns={PAYRATES_TABLE_COLUMNS}
                        data={skills}
                        path={"/skill"}
                        {...props}
                    />
                    :
                    <p className="lead">No skills to display.</p>
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

export default AdminPayrates;