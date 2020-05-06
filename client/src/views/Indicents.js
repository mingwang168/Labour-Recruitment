import React , {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import * as Auth from '../utils/Auth'

const BASE_URL = "http://localhost:5001/api";

const Incidents = () => {
    const [incidents, setIncidents] = useState()

    const fetchIncidents = async() => {
        let token = Auth.getToken()
        try {
            let response = await fetch(BASE_URL + "/incidents/GetIncidents" , {
                method : "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            let data = await response.json()
            setIncidents(data)
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchIncidents()
    }, [])

    return (
    <>
    {incidents && 
    <div className="dashboard-main-wrapper">
        <TopNav />
        <SideNav />

        <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">

            {/* Page Header */}
            <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="page-header">
                <h2 className="pageheader-title">Incident Reports</h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/dashboard" className="breadcrumb-link">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Incidents</li>
                </ol>
                </nav>
                </div>
            </div>
            </div>
            </div>

            {/* Incidents */}
            <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card">
                <h5 className="card-header">Incidents</h5>
                <div className="card-body">
                <div className="table-responsive">
                <Link to="/addincident" className="btn btn-primary px-3 py-2 mb-2 float-right">Add Incident</Link>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Injury</th>
                        <th># affected</th>
                        <th>Job</th>
                        <th>Reports</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody> 
                        {incidents.map((incident, i) => (
                            <tr key={i}>
                                <td><time>{incident.incidentReportDate.split('T')[0]}</time></td>
                                <td>{incident.incidentType.incidentTypeName}</td>
                                <td>{incident.labourerIncidentReport.length}</td>
                                <td>{incident.job.title}</td>
                                <td><span className="badge badge-danger">Required</span></td>
                                <td><Link to={`/incident/${incident.incidentReportId}`}>View Details</Link></td>
                            </tr>
                         ))   
                        }
                    </tbody>
                </table>
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

export default Incidents;