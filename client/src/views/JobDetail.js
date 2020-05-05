import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as DataSanitizer from '../utils/DataSanitizer';

import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import RateWorkers from './components/RateWorkers'
import Table from './components/Table';
import ErrorMessage from './components/ErrorMessage';

import * as Auth from '../utils/Auth';

import { ATTENDANCE_DATES_TABLE_COLUMNS, INCIDENTS_TABLE_COLUMNS } from '../utils/TableColumns';

const BASE_URL = "http://localhost:5001/api";

const JobDetail = (props) => {

    const [details, setDetails] = useState();
    const [incidents, setIncidents] = useState([""]);
    const [attendanceDates, setAttendanceDates] = useState();

    const fetchJobDetails = async(id) => {
       
        // Job details
        try {
            let response = await fetch(BASE_URL + '/job/getJob/' + id , {
                method : 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ Auth.getToken()}`
                }
            })
            let data = await response.json();
            setDetails(data);
        } catch (err) {
            console.error(err);
        }

        // Attendance schedule days
        try {
            let response = await fetch(BASE_URL + '/LabourerAttendance/' + id, {
                method : 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            let data = await response.json();
            if(data.length) {
                setAttendanceDates(DataSanitizer.cleanAttendanceDatesData(data));
            }
        } catch (err) {
            console.error(err);
        }

        //Incident reports 
        try {
            let response = await fetch(BASE_URL + '/incidents/GetIncidentsByJobId/' + id, {
                method : 'GET',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            })
            let data = await response.json();
            setIncidents(DataSanitizer.cleanIncidentsData(data));

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if(props.match.params.id) {
            if(Number.isInteger(Number(props.match.params.id))) {
                fetchJobDetails(props.match.params.id);
            }
        }
    }, [props.match.params.id])

    return (
    <>
    <div className="dashboard-main-wrapper">
        <TopNav />
        <SideNav />

        <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">

            { !details ? <ErrorMessage message={"Job does not exist."} /> :
            <>
            {/* Page Header */}
            <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-header">
                <h2 className="pageheader-title">Job Details</h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/dashboard" className="breadcrumb-link">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {details.title}
                    </li>
                </ol>
                </nav>
                </div>
            </div>
            </div>
            </div>

            
            <div className="row">
                {/* Project Details */}
                <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="font-26 mb-2">{details.title}</h1>
                            <p>{details.client.clientName}</p>
                        </div>
                        <div className="card-body border-top">
                            <p>{details.jobDescription}</p>
                        </div>
                        <div className="card-body border-top">
                            <h3 className="font-16">Status</h3>
                            {details.isComplete ? <span className="badge badge-success">Complete</span> : <span className="badge badge-primary">In Progress</span> }
                        </div>
                        <div className="card-body border-top">
                            <h3 className="font-16">Dates</h3>
                            <time>{DataSanitizer.formatDateString(details.startDate)}</time> to <time>{DataSanitizer.formatDateString(details.endDate)}</time>
                        </div>
                        <div className="card-body border-top">
                            <h3 className="font-16">Location</h3>
                            <address className="mb-0">
                                {details.street}<br />
                                {details.city}, {details.state}
                            </address>
                        </div>
                        <div className="card-body border-top">
                            <h3 className="font-16">Labourers Hired</h3>
                            {details.jobSkill.map((jSkill, i) => 
                            <ul key = {i} className="list-unstyled mb-0">
                                <li>{jSkill.skill.skillName} ({jSkill.numberNeeded})</li>
                            </ul>
                            )}
                        </div>
                        <div className="card-body border-top">
                            <h3 className="font-16">Total Hired</h3>
                            <p>{details.totalHired} labourer(s) hired</p>
                        </div>
                        { details.clientId == Auth.getID() ?
                        <div className="card-body border-top">
                            <Link to={`/editjob/${details.jobId}`} className="btn btn-light">Edit Job Details</Link>
                        </div> : null
                        }
                    </div>

                    {/* Incidents */}
                    <div className="card">
                    <h5 className="card-header">Incident Reports</h5>
                    <div className="card-body">
                    { incidents.length == 0 ?  <p className="text-danger">No incident reports to display.</p> :
                        <Table 
                            data={incidents}
                            columns={INCIDENTS_TABLE_COLUMNS}
                            path={"/incident"}
                            itemsPerPage={5}
                            searchable={false}
                            {...props}
                        />
                    }
                    </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">

                    {/* Labourer Attendance */}
                    <div className="card">
                        <h5 className="card-header">Labourer Attendance</h5>
                        <div className="card-body">
                        <p>Daily ratings are used to track a labourer's attendance, and calculate their average quality rating.</p>
                        { !attendanceDates ? <p className="text-danger">No dates to display.</p> :
                        <Table
                            columns={ATTENDANCE_DATES_TABLE_COLUMNS}
                            data={attendanceDates}
                            path={`/job/${props.match.params.id}/attendance`}
                            itemsPerRow={5}
                            {...props}
                        />
                        }
                        </div>
                    </div>
                    
                    {/* Safety Meetings */}
                    <div className="card">
                        <h5 className="card-header">Safety Meetings</h5>
                        <div className="card-body">
                            <p>Safety meetings are mandatory. Please check off the dates where safety meetings were completed.</p>
                            <table className="table table-bordered job-safetymeetings-table">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Apr 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><Link to="/job" className="badge badge-light">Change</Link></td>
                                </tr>
                                <tr>
                                    <td>Apr 2, 2020</td>
                                    <td><span className="badge badge-success">Complete</span></td>
                                    <td><Link to="/job" className="badge badge-light">Change</Link></td>
                                </tr>
                                <tr>
                                    <td>Apr 1, 2020</td>
                                    <td><span className="badge badge-success">Complete</span></td>
                                    <td><Link to="/job" className="badge badge-light">Change</Link></td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Safety Ratings */}
                    <div className="card" id="safetyratings">
                        <h5 className="card-header">Safety Ratings</h5>
                        <div className="card-body">
                            <p>Give hired labourers a rating, based on their safety-wise performance on this job.</p>
                            <table className="table table-bordered job-safetyratings-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Work Type</th>
                                <th>Rating</th>
                            </tr>
                            </thead>
                            <tbody>
                            {details.jobLabourer.map((jLabourer,i) => 
                                <tr key = {i}>
                                <td className ="text-capitalize">{jLabourer.labourer.labourerFirstName} {jLabourer.labourer.labourerLastName}</td>
                                <td>{jLabourer.skill.skillName}</td>
                                <td>
                                    <RateWorkers
                                        jobId = {details.jobId}
                                        rating = {jLabourer.labourerSafetyRating} 
                                        labourerId = {jLabourer.labourerId}
                                        clientName = {details.client.clientName}
                                    />
                                </td>
                            </tr>
                            )}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            </>
            }
        </div>
        </div>
    </div>
    </>
    )
}

export default JobDetail;