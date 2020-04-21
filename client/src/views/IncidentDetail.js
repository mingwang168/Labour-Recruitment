import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';

const IncidentDetail = (props) => {
    return (
        <div className="dashboard-main-wrapper">
            <TopNav />
            <SideNav />


            <div className="dashboard-wrapper">
                <div className="container-fluid dashboard-content">

                    {/* Page Header */}
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="page-header">
                                <h2 className="pageheader-title">Incident Details</h2>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/dashboard" className="breadcrumb-link">Dashboard</a></li>
                                            <li className="breadcrumb-item"><a href="/incidents" className="breadcrumb-link">Incident reports</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Incident Details</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Incident details */}
                        <div className="col col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="font-26 mb-0">Crescent Court Homes</h1>
                                    <p>Turner Construction</p>
                                    <p>8725 University Crescent<br/>Burnaby, BC V5A4X9</p>
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Date of Incident</h3>
                                    <time>Feb 20, 2020</time>
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Affected labourer names</h3>
                                    <ul className="list-unstyled mb-0">
                                        <li>John Doe</li>
                                        <l1>Sierra Brooks</l1>
                                    </ul>
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Job title</h3>
                                    <p>Drywall</p>
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Incident type</h3>
                                    <p>Partial Collapse of a Slab during Construction</p>
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Incident description</h3>
                                    <p>At approximately 5:00 a.m., a partial collapse of the second level slab occurred during construction of the 159-room.At the time of the collapse, the northwest section of the second level was being placed with fresh concrete over the formwork.Two employees were injured</p>
                                </div>
                                
                                <div className="card-body border-top">
                                    <h3 className="font-16">Incident file</h3>
                                    <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="customFile"></input>
                                    <label class="custom-file-label" for="customFile">Choose incident file</label>
                                </div>
                                </div>
                                {/* Display this only if the job owner is viewing this page */}
                                <div className="card-body border-top">
                                    <Link to="/editincident" className="btn btn-light">Edit Incident Details</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default IncidentDetail;