import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import RateWorkers from './components/RateWorkers';
import * as Auth from '../utils/Auth'

const BASE_URL = "http://localhost:5001/api";
const IncidentDetail = (props) => {
    const [details, setDetails] = useState()

    const fetchIncidentDetails = async(id) => {
        let token = Auth.getToken()
        try {
            const response = await fetch(BASE_URL + "/incidents/GetIncidentByIncidentId/"+ id , { 
                method : "GET", 
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            
            if (data) {
                setDetails(data)
            }

        } catch (e) {
            console.error(e);
        }
    }
    
    useEffect(() =>{
        fetchIncidentDetails(props.match.params.id)
    }, [])

   console.log(details)
    return (
        <>
        {details && 
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
                                    <h1 className="font-26 mb-0">{details.job.title}</h1>
                                    <p>{details.job.client.clientName}</p>
                                    <p>{details.job.street}<br/>{details.job.city}, {details.job.state}</p>
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Date of Incident</h3>
                                    <time>{details.incidentReportDate.split('T')[0]}</time>
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Affected labourer name(s)</h3>
                                    {details.labourerIncidentReport.map((r, i) => (
                                        <ul key={i} className="list-unstyled mb-0">
                                            <li>{r.labourer.labourerFirstName} {r.labourer.labourerLastName}</li>
                                        </ul>
                                    ))
                                    }
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Incident type</h3>
                                    <p>{details.incidentType.incidentTypeName}</p>
                                </div>
                                <div className="card-body border-top">
                                    <h3 className="font-16">Incident description</h3>
                                    <p>{details.incidentReportDescription}</p>
                                </div>
                                
                                {/* Display this only if the job owner is viewing this page */}
                                {/* <div className="card-body border-top">
                                    <Link to="/editincident" className="btn btn-light">Edit Incident Details</Link>
                                </div> */}
                                 {/* Safety Ratings */}
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
                                        {details.labourerIncidentReport.map((r,i) => 
                                            <tr key = {i}>
                                            <td>{r.labourer.labourerFirstName} {r.labourer.labourerLastName}</td>
                                            <td>
                                                <RateWorkers
                                                   clientId={details.job.clientId} 
                                                   labourerId={r.labourer.labourerId}
                                                />
                                            </td>
                                        </tr>
                                        )}
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
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