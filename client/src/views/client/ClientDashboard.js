import React from "react";
import { Link } from 'react-router-dom';

import Table from '../../components/Table';
import { CLIENT_JOBS_TABLE_COLUMNS   } from '../../utils/TableColumns';
import { CLIENT_JOBS_DATA } from '../JobsDummyData';

const ClientDashboard = (props) => {
    return (
    <>
    <div className="row">
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

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
                    Client Dashboard
                </li>
            </ol>
            </nav>
            </div>
        </div>
        
        {/* Stats */}
        <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
	        <div className="card">
	        <div className="card-body">
                <div className="d-inline-block">
                    <h5 className="text-muted">Active Jobs</h5>
                    <h2 className="mb-0">5</h2>
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
                    <h5 className="text-muted">Labourers Hired</h5>
                    <h2 className="mb-0">295</h2>
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
                    <h5 className="text-muted">Hiring Costs</h5>
                    <h2 className="mb-0">$24,800</h2>
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
                    <h5 className="text-muted">Company Rating</h5>
                    <h2 className="mb-0">75.4%</h2>
                </div>
                <div className="float-right icon-circle-medium icon-box-lg bg-brand-light mt-1">
                    <i className="material-icons text-brand">thumb_up</i>
                </div>
	        </div>
	        </div>
	        </div>
        </div>

        {/* Jobs Table */}
        <div className="row">
        <div className="col">
        <div className="card">
        <h5 className="card-header">All Jobs</h5>
        <div className="card-body">
            <Table
                columns={CLIENT_JOBS_TABLE_COLUMNS}
                data={CLIENT_JOBS_DATA}
                {...props}
            />
        </div>
        </div>
        </div>
        </div>

    </div>
    </div>
    </>
    )
}

export default ClientDashboard;