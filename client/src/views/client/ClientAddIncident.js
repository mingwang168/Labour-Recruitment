import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as Auth from '../../utils/Auth';
import * as DataSanitizer from '../../utils/DataSanitizer';

import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import LabourerList from '../components/LabourerList';
import Select from 'react-select';

const LABOURERS_LIST = [
    { value: 'Labourer One', label: 'Labourer One' },
    { value: 'Labourer Two', label: 'Labourer Two' },
    { value: 'Labourer Three', label: 'Labourer Three' },
    { value: 'Labourer Four', label: 'Labourer Four' },
];

const BASE_URL = "http://localhost:5001/api";

const ClientAddIncident = () => {
    const [jobs, setJobs] = useState([]);
    const [incidentOptions, setIncidentOptions] = useState([]);
    const [selectedJob, setSelectedJob] = useState();
    const [selectedIncident, setSelectedIncident] = useState()
    const [selectedLabourers, setselectedLabourers] = useState([]);

    const validateForm = _ => {
        console.log("Validating form...")
    }

    const fetchAllJobs = async () => {
        try {
            const response = await fetch(BASE_URL + `/Job/GetJobByClientId/${Auth.getID()}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            });

            let data = await response.json();
            setJobs(DataSanitizer.ClientJobs(data))
        } catch (e) {
            console.error(e)
        }
    }
    const fetchIncidentOptions = async () => {
        try {
            const response = await fetch(BASE_URL + '/IncidentType');
            let data = await response.json();
            setIncidentOptions(data)
        } catch (e) {
            console.error(e)
        }
    }
    
    const onChangeJob = (job) => {
        if (job) {
            setSelectedJob(job.value)
        }
    }

    const onChangeType = (type) => {
        if (type) {
            setSelectedIncident(type.value)
        }
    }
    console.log(selectedLabourers)
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
                                            <li className="breadcrumb-item"><a href="/dashboard" className="breadcrumb-link">Dashboard</a></li>
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

                                <div className="form-row mb-4">
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                        <label htmlFor="incidentdate">Date Of Incident<span className="text-danger">*</span></label>
                                        <input
                                            required
                                            name="incidentdate"
                                            type="date"
                                            className="form-control form-control-lg"
                                        />
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                        <label htmlFor="injurytype">Injury Type<span className="text-danger">*</span></label>
                                        <input
                                            required
                                            name="injurytype"
                                            placeholder="Enter injury type"
                                            type="text"
                                            className="form-control form-control-lg"
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
                                        <label className="d-block" htmlFor="injuredLabourers">Injured Labourers<span className="text-danger">*</span></label>
                                        {selectedJob ? <LabourerList selectedJob={selectedJob} 
                                                                     selectedLabourers={selectedLabourers}
                                                                     setselectedLabourers={setselectedLabourers} /> :
                                        <input
                                        placeholder="Select Job First"
                                        className="form-control form-control-lg"
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
                                    />
                                </div>

                                <div className="form-group row text-right mt-4">
                                    <div className="col col-lg-12">
                                        <Link to="/dashboard" className="btn btn-space btn-light btn-lg">Cancel</Link>
                                        <button onClick={() => validateForm()} className="btn btn-space btn-primary btn-lg">Create New Incident</button>
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