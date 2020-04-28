import React from "react";
import { Link } from 'react-router-dom';

import Table from '../components/Table';
import { LABOURERS_JOBS_TABLE_COLUMNS   } from '../../utils/TableColumns';
import { LABOURERS_JOBS_DATA } from '../JobsDummyData';

const LabourDashboard = (props) => {
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
                    Labourer Dashboard
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
                    <h5 className="text-muted">Completed Jobs</h5>
                    <h2 className="mb-0">22</h2>
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
                    <h5 className="text-muted">Ranking</h5>
                    <h2 className="mb-0">Top 2%</h2>
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
                    <h5 className="text-muted">Total Earnings</h5>
                    <h2 className="mb-0">$14,600</h2>
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
                    <h5 className="text-muted">Overall Rating</h5>
                    <h2 className="mb-0">75%</h2>
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
                columns={LABOURERS_JOBS_TABLE_COLUMNS}
                data={LABOURERS_JOBS_DATA}
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

export default LabourDashboard;