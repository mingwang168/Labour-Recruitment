import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as DataSanitizer from '../utils/DataSanitizer';

import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import Table from './components/Table';
import RateClient from "./components/RateClient";
import CheckSafetyMetting from './components/CheckSafetyMeeting';
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
                            itemsPerPage={5}
                            {...props}
                        />
                        }
                        </div>
                    </div>
                    
                    {/* Safety Meetings */}
                    <div className="card">
                        <h5 className="card-header">Safety Meetings</h5>
                        <div className="card-body">
                            <p>Safety meetings are mandatory. Please check if safety meetings were completed.</p>
                            {details.jobLabourer.map((jLabourer, i) => (
                            <CheckSafetyMetting 
                                firstname={jLabourer.labourer.labourerFirstName} key={i}
                                lastname={jLabourer.labourer.labourerLastName} 
                                safetyMeeting={jLabourer.safetyMeetingCompleted} 
                                labourerId={jLabourer.labourerId} 
                                jobId={details.jobId} clientId={details.clientId} 
                            /> 
                            ))
                            }
                        </div>
                    </div>
                
                    {/* Safety Meetings */}
                    <div className="card">
                        <h5 className="card-header">Client Rating</h5>
                        <div className="card-body">
                            <p>Client Rating is mandatory.</p>
                            { details.jobLabourer.map((jLabourer, i) => (
                                Auth.getID() == jLabourer.labourerId && 
                                <RateClient key={i}
                                jobId={details.jobId}
                                labourerId={jLabourer.labourer.labourerId}
                                rating={jLabourer.clientQualityRating}
                                />
                            ))
                            }
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