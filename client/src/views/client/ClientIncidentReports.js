import React from 'react';

import TopNav from '../../components/TopNav';
import SideNav from '../../components/SideNav';

const ClientIncidentReports = () => {
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
                <h2 className="pageheader-title">Incident Reports</h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/dashboard" className="breadcrumb-link">Dashboard</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Incident Reports</li>
                </ol>
                </nav>
                </div>
            </div>
            </div>
            </div>

            {/* Incidents */}
            <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
                <h5 className="card-header">Incidents</h5>
                <div className="card-body">
                <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Injury</th>
                        <th># affected</th>
                        <th>Job</th>
                        <th>Reports</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody> 
                        <tr>
                            <td><time>Aug 8, 2020</time></td>
                            <td>Burn</td>
                            <td>2</td>
                            <td>CF Richmond Centre Remodel</td>
                            <td><span className="badge badge-danger">Required</span></td>
                            <td><a href="/incident">View Details</a></td>
                        </tr>
                        <tr>
                            <td><time>Mar 3, 2020</time></td>
                            <td>Fall</td>
                            <td>1</td>
                            <td>Liberty Homes</td>
                            <td><span className="badge badge-danger">Required</span></td>
                            <td><a href="/incident">View Details</a></td>
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

export default ClientIncidentReports;