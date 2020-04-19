import React from 'react';
import { Link } from 'react-router-dom';

import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';

const Dashboard = () => {

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
                <h2 className="pageheader-title">Welcome back, Turner Construction!</h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/dashboard" className="breadcrumb-link">Dashboard</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Client Dashboard</li>
                </ol>
                </nav>
                </div>
            </div>
            </div>
            </div>

            {/* Overview */}
            <div className="row">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
	            <div className="card">
	            <div className="card-body">
                    <div className="d-inline-block">
                        <h5 className="text-muted">Active Jobs</h5>
                        <h2 className="mb-0">5 active jobs</h2>
                    </div>
                    <div className="float-right icon-circle-medium icon-box-lg bg-info-light mt-1">
                        <i className="material-icons text-info">work</i>
                    </div>
	            </div>
	            </div>
	            </div>

                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
	            <div className="card">
	            <div className="card-body">
                    <div className="d-inline-block">
                        <h5 className="text-muted">Current Workers Hired</h5>
                        <h2 className="mb-0">295 workers</h2>
                    </div>
                    <div className="float-right icon-circle-medium icon-box-lg bg-success-light mt-1">
                        <i className="material-icons text-success">accessibility</i>
                    </div>
	            </div>
	            </div>
	            </div>

                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
	            <div className="card">
	            <div className="card-body">
                    <div className="d-inline-block">
                        <h5 className="text-muted">Estimated Expenses</h5>
                        <h2 className="mb-0">$224,800</h2>
                    </div>
                    <div className="float-right icon-circle-medium icon-box-lg bg-secondary-light mt-1">
                        <i className="material-icons text-secondary">monetization_on</i>
                    </div>
	            </div>
	            </div>
	            </div>

                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
	            <div className="card">
	            <div className="card-body">
                    <div className="d-inline-block">
                        <h5 className="text-muted">Company Quality Rating</h5>
                        <h2 className="mb-0">75.4%</h2>
                    </div>
                    <div className="float-right icon-circle-medium icon-box-lg bg-brand-light mt-1">
                        <i className="material-icons text-brand">thumb_up</i>
                    </div>
	            </div>
	            </div>
	            </div>
            </div>

            {/* Jobs */}
            <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
                <h5 className="card-header">All Jobs</h5>
                <div className="card-body">
                <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th># Hired</th>
                        <th>Status</th>
                        <th>Reports</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody> 
                        <tr>
                            <td>Kwantlen Arts Building</td>
                            <td><time>Aug 8, 2020</time></td>
                            <td><time>Oct 1, 2020</time></td>
                            <td>40</td>
                            <td><span className="badge badge-brand">Upcoming</span></td>
                            <td><span className="badge badge-dark">N/A</span></td>
                            <td><Link to="/job">View Details</Link></td>
                        </tr>
                        <tr>
                            <td>Stanley Park Clean Up</td>
                            <td><time>Apr 12, 2020</time></td>
                            <td><time>Apr 15, 2020</time></td>
                            <td>20</td>
                            <td><span className="badge badge-primary">In Progress</span></td>
                            <td><span className="badge badge-success">Complete</span></td>
                            <td><Link to="/job">View Details</Link></td>
                        </tr>
                        <tr>
                            <td>General Construction</td>
                            <td><time>Apr 1, 2020</time></td>
                            <td><time>Apr 28, 2020</time></td>
                            <td>60</td>
                            <td><span className="badge badge-primary">In Progress</span></td>
                            <td><span className="badge badge-success">Complete</span></td>
                            <td><Link to="/job">View Details</Link></td>
                        </tr>
                        <tr>
                            <td>Crescent Court Homes</td>
                            <td><time>Feb 20, 2020</time></td>
                            <td><time>May 08, 2020</time></td>
                            <td>100</td>
                            <td><span className="badge badge-primary">In Progress</span></td>
                            <td><span className="badge badge-danger">Required</span></td>
                            <td><Link to="/job">View Details</Link></td>
                        </tr>
                        <tr>
                            <td>CF Richmond Centre Remodel</td>
                            <td><time>Dec 14, 2019</time></td>
                            <td><time>Apr 10, 2020</time></td>
                            <td>75</td>
                            <td><span className="badge badge-success">Completed</span></td>
                            <td><span className="badge badge-danger">Required</span></td>
                            <td><Link to="/job">View Details</Link></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                </div>
            </div>
            </div>
            </div>

        </div>
        </div>
    </div>
    )
}

export default Dashboard;