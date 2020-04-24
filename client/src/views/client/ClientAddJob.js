import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import TopNav from '../../components/TopNav';
import SideNav from '../../components/SideNav';
import SelectWorkers from './components/SelectWorkers';
import * as Auth from '../../utils/Auth'

const BASE_URL = "http://localhost:5001/api";

const ClientAddJob = (props) => {

    const [job, setJob] = useState({
        "ClientId" : 0,
        "Title" : "",
        "JobDescription" : "",
        "StartDate" : "",
        "EndDate" : "",
        "InProgress" : true , 
		"IsComplete" :  false, 
        "Street" : "",
        "City" : "",
        "State" : "",
    })

    const [workers, setWorkers] = useState([]);
    const [jobSkills, setJobSkills] = useState([])
  
    const {title,startdate,enddate,description,address,province,city} = job

    const onChange = e => {
        e.preventDefault()
        setJob({ ... job, [e.target.name]:e.target.value })
    }

    const validateForm = _ => {
        console.log("Validating form...")
    }

    const onSubmit = (e) => {
        e.preventDefault()
        let token = sessionStorage.getItem("auth_token")
        let id
        if(sessionStorage.getItem("user_id") && sessionStorage.getItem("user_role") !== 'Labourer') {
            id = sessionStorage.getItem("user_id")
        } else {
            Auth.forceLogout();
            return
        }

        let newJob = {
            "ClientId" : id,
            title,
            "jobDescription" : description,
            startdate,
            enddate,
            "InProgress" : true , 
            "IsComplete" :  false, 
            "street" : address,
            city,
            "state" : province
        }
        
        fetch(BASE_URL + '/job', {
            method : 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify({"Job" : newJob, "JobSkills" : jobSkills}) 
        })
        .then(response => response.json())
        .then(json => {
            if(json) {
                props.history.push(`/job`);
                window.location.reload();
              }
        })
        .catch(function (error) {
            console.log("Server error. Please try again later.");
        })

    }

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
            <form className="client-add-job-form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group mb-4">
                    <label htmlFor="title">Job Title <span className="text-danger">*</span></label>
                    <input
                        required
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
                        {/* <label htmlFor="payrate">Base Pay (per hour) <span className="text-danger">*</span></label>
                        <input
                            required
                            name="payrate"
                            type="number"
                            placeholder="0.00"
                            step="any"
                            className="form-control form-control-lg"
                        /> */}
                    </div>
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="description">Job Description</label>
                    <textarea
                        name="description"
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
                            name="address"
                            type="text"
                            placeholder="Enter address"
                            className="form-control form-control-lg"
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label htmlFor="province">Province <span className="text-danger">*</span></label>
                        <select
                            required
                            name="province"
                            className="form-control form-control-lg"
                            onChange={e => onChange(e)}
                        >
                            <option defaultValue="" disabled>Select province</option>
                            <option value="alberta">Alberta</option>
                            <option value="bc">British Columbia</option>
                            <option value="manitoba">Manitoba</option>
                            <option value="newbrunswick">New Brunswick</option>
                            <option value="newfoundland">Newfoundland</option>
                            <option value="labrador">Labrador</option>
                            <option value="novascotia">Nova Scotia</option>
                            <option value="ontario">Ontario</option>
                            <option value="pei">Prince Edward Island</option>
                            <option value="quebec">Quebec</option>
                            <option value="saskatchewan">Saskatchewan</option>
                        </select>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label htmlFor="city">City <span className="text-danger">*</span></label>
                        <select
                            required
                            name="city"
                            className="form-control form-control-lg"
                            onChange={e => onChange(e)}
                        >
                            <option defaultValue="" disabled>Select city</option>
                            <option value="toronto">Toronto</option>
                            <option value="montreal">Montreal</option>
                            <option value="vancouver">Vancouver</option>
                            <option value="ottawa">Ottawa</option>
                            <option value="calgary">Calgary</option>
                        </select>
                    </div>
                </div>

                <SelectWorkers workers={workers} setWorkers={setWorkers}  jobSkills={jobSkills} setJobSkills={setJobSkills}/>
               
                <div className="form-group row text-right mt-4">
                <div className="col col-lg-12">
                    <Link to="/dashboard" className="btn btn-space btn-light btn-lg">Cancel</Link>
                    <button onClick={() => validateForm()} className="btn btn-space btn-primary btn-lg">Create New Job</button>
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