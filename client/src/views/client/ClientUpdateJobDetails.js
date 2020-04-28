import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import TopNav from '../../components/TopNav';
import SideNav from '../../components/SideNav';
import SelectWorkers from './components/SelectWorkers';
import * as Auth from '../../utils/Auth';
import Select from 'react-select';
import PROVINCES from '../../utils/Provinces';

const BASE_URL = "http://localhost:5001/api";

const ClientUpdateJobDetails = (props) => {

    const [job, setJob] = useState({
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
        e.preventDefault();
        setJob( {...job , [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let token = sessionStorage.getItem("auth_token");
        let id
        if(sessionStorage.getItem("user_id") && sessionStorage.getItem("user_role") !== 'Labourer'){
            id = sessionStorage.getItem("user_id")
        } else {
            Auth.forceLogout()
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

        try {
            let response = await fetch(BASE_URL + '/job/' + props.match.params.id, {            
                'method': 'PUT',
                'headers': {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({"Job": newJob, "JobSkill": jobSkills})
            })

            let data = await response.json();
            if(data){
                props.history.push('/job/' + data.jobId);
                window.location.reload();
            }

        } catch (e){
            console.error(e)
        }
    }

    
    const validateForm = _ => {
        console.log("Validating form...")
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
                <h2 className="pageheader-title">Update Job</h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/dashboard" className="breadcrumb-link">Dashboard</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Update Job</li>
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
                    <div className="form-group col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label htmlFor="province">Province <span className="text-danger">*</span></label>
                        <Select
                            required
                            name="province"
                            options={PROVINCES}
                            onChange={e => onChange(e)}
                        />
                            
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


export default ClientUpdateJobDetails;