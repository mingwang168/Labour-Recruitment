import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Select from 'react-select';

import * as Auth from '../../utils/Auth';
import * as DayCalculator from '../../utils/DayCalculator';
import PROVINCES from '../../utils/staticdata/Provinces';

import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import SelectLabourers from '../components/SelectLabourers';

const BASE_URL = "http://localhost:5001/api";

const ClientAddJob = ({ history }) => {

    const [formErrors, setFormErrors] = useState([]);
    const [job, setJob] = useState({
        title: "",
        startdate: "",
        enddate: "",
        jobdescription: "",
        address: "",
        province: "",
        city: "",
        duration: ""
    })
    const { title, startdate, enddate, jobdescription, address, province, city, duration } = job;
    const [requiredLabourers, setRequiredLabourers] = useState([]);

    const onChange = e => {
        e.preventDefault();

        setJob({ ...job, [e.target.name]: e.target.value });

        // Set duration field (number of days)
        if(e.target.name === "enddate" && startdate) {
            let sDate = DayCalculator.convert(startdate);
            let eDate = DayCalculator.convert(e.target.value);

            if(eDate < sDate) {
                setJob({...job, [e.target.name]: e.target.value, duration: "Invalid dates entered."});
            } else {
                setJob({...job, [e.target.name]: e.target.value, duration: DayCalculator.difference(sDate, eDate)});
            }
        } else if (e.target.name === "startdate" && enddate) {
            let sDate = DayCalculator.convert(e.target.value);
            let eDate = DayCalculator.convert(startdate);

            if(eDate < sDate) {
                setJob({...job, [e.target.name]: e.target.value, duration: "Invalid dates entered."});
            } else {
                setJob({...job, [e.target.name]: e.target.value, duration: DayCalculator.difference(sDate, eDate)});
            }
        }
    }

    const onChangeProvince = e => {
        setJob({ ...job, province: e.label })
    }

    const validateForm = e => {
        e.preventDefault();
        let errors = [];

        if(DayCalculator.convert(enddate) < DayCalculator.convert(startdate)) {
            errors.push("Invalid end date entered. End date must be after the start date, or on the same day.");
        }
        if(!requiredLabourers.length) {
            errors.push("Labourers are required.")
        }
        if(province === "") {
            errors.push("Province is required.");
        }
        if(errors.length) {
            setFormErrors(errors);
        } else {
            submitForm();
        }
        console.log(requiredLabourers)
    }
    
    const submitForm = async() => {
        let token = Auth.getToken();
        let id = Auth.getID();

        let newJob = {
            ClientId: id,
            Title: title,
            JobDescription: jobdescription,
            StartDate: startdate,
            EndDate: enddate,
            Street: address,
            City: city,
            State: province,
            InProgress: true,
            IsComplete: false
        }

        try {
            let response = await fetch(BASE_URL + '/job/PostJob', {
                method : 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "Job": newJob,
                    "JobSkills": requiredLabourers
                })
            })

            // Bad response
            if(response.status !== 200) {
                setFormErrors(["Failed to post job. Please try again later."]);
                throw response;
            }

            // Success
            let data = await response.json();
            history.push('/job/' + data);
        } catch(e) {
            console.error(e);
        }
    }

    return !Auth.authenticateClient() ? <Redirect to={{pathname: '/dashboard'}} /> :
    (
        <div className="dashboard-main-wrapper">
        <TopNav />
        <SideNav />

        <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">

           {/* Page Header */}
           <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-header">
                <h2 className="pageheader-title">Add New Job</h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/dashboard" className="breadcrumb-link">Dashboard</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Add New Job</li>
                </ol>
                </nav>
                </div>
            </div>
            </div>
            </div>

            {/* Form */}
            <div className="card">
            <div className="card-body">
            {/* Display form errors, if any */}
            { formErrors.length > 0 &&
            <div className="alert alert-danger">
            <ul className="pl-3 mb-0">
            { formErrors.map((error, i) => <li key={i}>{error}</li>) }
            </ul>
            </div>
            }
            <form className="client-add-job-form">
                <div className="form-group mb-4">
                    <label htmlFor="title">Job Title <span className="text-danger">*</span></label>
                    <input
                        required
                        maxLength="60"
                        name="title"
                        type="text"
                        placeholder="Enter job title"
                        className="form-control form-control-lg"
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-row mb-4">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label htmlFor="startdate">Start Date <span className="text-danger">*</span></label>
                        <input
                            required
                            name="startdate"
                            type="date"
                            className="form-control form-control-lg"
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                    <label htmlFor="enddate">End Date <span className="text-danger">*</span></label>
                        <input
                            required
                            name="enddate"
                            type="date"
                            className="form-control form-control-lg"
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label htmlFor="duration">Duration</label>
                        <input
                            readOnly="readonly"
                            value={duration}
                            type="text"
                            name="duration"
                            className="form-control form-control-lg"
                        />
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="description">Job Description</label>
                    <textarea
                        maxLength="400"
                        name="jobdescription"
                        type="text"
                        placeholder="Enter job description"
                        rows="3"
                        className="form-control form-control-lg"
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-row mb-4">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label htmlFor="address">Address <span className="text-danger">*</span></label>
                        <input
                            required
                            maxLength="50"
                            name="address"
                            type="text"
                            placeholder="Enter address"
                            className="form-control form-control-lg"
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label htmlFor="city">City <span className="text-danger">*</span></label>
                        <input
                            required
                            maxLength="30"
                            name="city"
                            type="text"
                            placeholder="Enter city"
                            className="form-control form-control-lg"
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label htmlFor="province">Province <span className="text-danger">*</span></label>
                        <Select
                            options={PROVINCES}
                            onChange={e => onChangeProvince(e)}
                            required
                        />
                    </div>
                </div>

                <SelectLabourers
                    requiredLabourers={requiredLabourers}
                    setRequiredLabourers={setRequiredLabourers}
                />
               
                <div className="form-group row text-right mt-4">
                <div className="col col-lg-12">
                    <Link
                        to="/dashboard"
                        className="btn btn-space btn-light btn-lg"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={validateForm}
                        className="btn btn-space btn-primary btn-lg"
                    >
                        Create New Job
                    </button>
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

export default ClientAddJob;