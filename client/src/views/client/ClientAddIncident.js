import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Auth from '../../utils/Auth';
import * as DataSanitizer from '../../utils/DataSanitizer';
import * as FormValidator from '../../utils/FormValidator';

import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import LabourerList from '../components/LabourerList';
import Select from 'react-select';
import FormErrors from '../components/FormErrors';


const BASE_URL = "http://localhost:5001/api";

const ClientAddIncident = ({ history }) => {

    const [report, setReport] = useState({
        incidentdate : "",
        incidentsummary : ""
    })
    const [jobs, setJobs] = useState([]);
    const [labourerList, setLabourerList] = useState([]);
    const [incidentOptions, setIncidentOptions] = useState([]);
    const [selectedJob, setSelectedJob] = useState();
    const [selectedIncident, setSelectedIncident] = useState()
    const [selectedLabourers, setselectedLabourers] = useState([]);
    const [formErrors, setFormErrors] = useState([]);

    const {incidentdate, incidentsummary} = report
    const validateForm = e => {
        e.preventDefault();
        console.log("Validating form...");
        let errors = [];

        if((!FormValidator.date(incidentdate)) && (incidentdate ===  null) && (incidentdate === '')){
            errors.push("Invalid date entered.");
        }
        if(!selectedIncident){
            errors.push("You must select incident type.")
        }
        if(!selectedJob){
            errors.push("You must select the job involved.")
        }
        if(!selectedLabourers.length){
            errors.push("You must select labourers affected.")
        }

        if(errors.length){
            setFormErrors(errors)
        } else {
            submitForm()
        }
    }

    const fetchAllJobs = async() => {
        try {
            const response = await fetch(BASE_URL + `/Job/GetJobByClientId/${Auth.getID()}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            });

            let data = await response.json();
            setJobs(data)
        } catch (e) {
            console.error(e)
        }
    }

    const fetchLabourers= async(id) => {
        if (selectedJob) {
            const response = await fetch(BASE_URL + `/JobLabourers/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            })
            const data = await response.json()
            setLabourerList(data)
        }
    }

    const fetchIncidentOptions = async() => {
        try {
            const response = await fetch(BASE_URL + '/IncidentType');
            let data = await response.json();
            setIncidentOptions(data)
        } catch (e) {
            console.error(e)
        }
    }
    
    const onChange = e => {
        setReport({... report, [e.target.name]: e.target.value})
    }

    const onChangeJob = job => {
        if (job) {
            setSelectedJob(job.value)
            fetchLabourers(job.value)
        }
    }

    const onChangeType = type => {
        if (type) {
            setSelectedIncident(type.value)
        }
    }

    const submitForm = async() => {
        let token = Auth.getToken()

        let newReport = {
            IncidentTypeId : selectedIncident,
            IncidentReportDate : incidentdate,
            IncidentReportDescription : incidentsummary,
            JobId : selectedJob
        }
        
        try {
            let response = await fetch(BASE_URL + '/incidents/PostIncident', {
                method : 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body : JSON.stringify({"IncidentReport" : newReport, "LabourerReports" : selectedLabourers})
            })
            
            // Bad response
            if(response.status !== 200) {
                throw response;
            }

            let data = await response.json();
            history.push('/incident/GetIncidentByIncidentId'+ data);
        } catch(e) {
            console.error(e);
        }
    }

  

    useEffect(() => {
        fetchAllJobs();
        fetchIncidentOptions();
    }, []);

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
                                <h2 className="pageheader-title">Add New Incident</h2>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to="/dashboard" className="breadcrumb-link">Home</Link>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <Link to="/incidents" className="breadcrumb-link">Incidents</Link>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">Add New Incident</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="card">
                        <div className="card-body">
                            <form className="client-add-incident-form">

                                <div>
                                {formErrors.length > 0 && <FormErrors errors={formErrors}/> }
                                </div>

                                <div className="form-row mb-4">
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                        <label htmlFor="incidentdate">Date Of Incident<span className="text-danger">*</span></label>
                                        <input
                                            required
                                            name="incidentdate"
                                            type="date"
                                            className="form-control form-control-lg"
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                 
                                    <div className=" col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                        <label className="d-block" htmlFor="incidentType">Select incident type<span className="text-danger">*</span></label>
                                        <Select
                                            required
                                            name="incidenttype"
                                            options={incidentOptions &&
                                                incidentOptions.map(incident => {
                                                    return {value: incident.incidentTypeId, label: incident.incidentTypeName}
                                                })
                                            }
                                            onChange={onChangeType}
                                        />
                                    </div>
                                </div>
                                <div className="form-row mb-4">
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                        <label className="d-block" htmlFor="job">Select Job<span className="text-danger">*</span></label>
                                        <Select
                                            required
                                            name="job"
                                            options={ jobs &&
                                                jobs.map(job => {return {value: job.jobId, label: job.title}}) 
                                            } 
                                            onChange={onChangeJob}
                                        />
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                        <label className="d-block" htmlFor="injuredLabourers">Labourers Affected<span className="text-danger">*</span></label>
                                        {selectedJob ? <LabourerList selectedJob={selectedJob} 
                                                                     selectedLabourers={selectedLabourers}
                                                                     setselectedLabourers={setselectedLabourers} 
                                                                     labourerList = {labourerList}
                                                                     fetchLabourers = {fetchLabourers} /> :
                                        <input
                                        placeholder="Select..."
                                        className="form-control form-control-lg"
                                        disabled
                                        />}
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <label htmlFor="incidentsummary">Summary of Incident</label>
                                    <textarea
                                        name="incidentsummary"
                                        type="text"
                                        placeholder="Enter incident summary"
                                        rows="3"
                                        className="form-control form-control-lg"
                                        onChange={e => onChange(e)}
                                    />
                                </div>

                                <div className="form-group row text-right mt-4">
                                    <div className="col col-lg-12">
                                        <Link to="/dashboard" className="btn btn-space btn-light btn-lg">Cancel</Link>
                                        <button onClick={validateForm} className="btn btn-space btn-primary btn-lg">Create New Incident</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ClientAddIncident;