import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import RateWorkers from './components/RateWorkers';
import * as Auth from '../utils/Auth'

const BASE_URL = "http://localhost:5001/api";
const IncidentDetail = (props) => {

    const [report, setReport] = useState()
    const [jobLabourer, setJobLabourer] = useState()

    const fetchIncidentDetails = async(id) => {
  
        try {
            const response = await fetch(BASE_URL + "/incidents/GetIncidentByIncidentId/"+ id , { 
                method : "GET", 
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            })
            const data = await response.json()
            
            if (data) {
                setReport(data.incidentReport)
                setJobLabourer(data.jobLabourers)
            }

        } catch (e) {
            console.error(e);
        }
    }
   
    const changeRating = async(newRating, labourerId, jobId) => {
        let token = Auth.getToken()
        if (token == null) {
            Auth.forceLogout()
        }

        try{
            const response = await fetch(BASE_URL + '/JobHistory/LabourerSafety', {
                method : 'PUT',
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }, 
                body : JSON.stringify({
                    JobId : jobId,
                    LabourerId : labourerId,
                    LabourerSafetyRating : newRating,
                })
            })
            const data = await response.json()
            if (data) {
                console.log(data)
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    useEffect(() =>{
        fetchIncidentDetails(props.match.params.id)
    }, [])


    return (
        <>
        {report && 
        <div className="dashboard-main-wrapper">
            <TopNav />
            <SideNav />


            <div className="dashboard-wrapper">
                <div className="container-fluid dashboard-content">

                    {/* Page Header */}
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="page-header">
                                <h2 className="pageheader-title">Incident Details</h2>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/dashboard" className="breadcrumb-link">Dashboard</a></li>
                                            <li className="breadcrumb-item"><a href="/incidents" className="breadcrumb-link">Incident reports</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Incident Details</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Incident details */}
                        <div className="col col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h1 className="font-26 mb-0">{report.job.title}</h1>
                                    <p>{report.job.client.clientName}</p>
                                    <p>{report.job.street}<br/>{report.job.city}, {report.job.state}</p>
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Date of Incident</h3>
                                    <time>{report.incidentReportDate.split('T')[0]}</time>
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Incident type</h3>
                                    <p>{report.incidentType.incidentTypeName}</p>
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Incident description</h3>
                                    <p>{report.incidentReportDescription}</p>
                                </div>
                                
                                {/* Display this only if the job owner is viewing this page */}
                                {/* <div className="card-body border-top">
                                    <Link to="/editincident" className="btn btn-light">Edit Incident report</Link>
                                </div> */}
                                 {/* Safety Ratings */}
                                {jobLabourer && 
                                <div className="card" id="safetyratings">
                                    <h5 className="card-header">Safety Ratings</h5>
                                    <div className="card-body">
                                        <p>Give effected labourers a rating, based on their safety-wise performance on this job.</p>
                                        <table className="table table-bordered table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Rating</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {jobLabourer.map((j,i) => 
                                            <tr key = {i}>
                                            <td>{j.labourer.labourerFirstName} {j.labourer.labourerLastName}</td>
                                            <td>
                                                <RateWorkers
                                                   changeRating={changeRating}
                                                   clientId={report.job.clientId} 
                                                   jobId={report.jobId}
                                                   labourerId={j.labourer.labourerId}
                                                   rating={j.labourerSafetyRating}
                                                />
                                            </td>
                                        </tr>
                                        )}
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                                }
                                <div className="card-body border-top">
                                    <h3 className="font-16">Incident file</h3>
                                    <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="customFile"></input>
                                    <label className="custom-file-label" htmlFor="customFile">Choose incident file</label>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        }
    </>
    )
}

export default IncidentDetail;