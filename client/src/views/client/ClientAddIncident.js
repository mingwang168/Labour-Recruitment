import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import TopNav from '../../components/TopNav';
import SideNav from '../../components/SideNav';


const ClientAddIncident = () => {
    const [workers, setWorkers] = useState([]);

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
                            <form className="client-add-job-form">

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
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                        <label htmlFor="Incident Type">Incident Type<span className="text-danger">*</span></label>
                                        <select
                                            required
                                            name="Incident Type"
                                            className="form-control form-control-lg"
                                        >
                                            <option defaultValue="" disabled>Select Labourers</option>
                                            <option value="Sierra Brooks">Masonry</option>
                                            <option value="Labourer Two">Carpentry</option>
                                            <option value="Labourer Three">Painting</option>
                                            <option value="Labourer Four">Drywall</option>
                                            <option value="Labourer Five">Plumbing</option>
                                            <option value="Labourer Six">Building site supervision</option>
                                            <option value="Labourer Seven">Concrete</option>
                                            <option value="Labourer Eight">Roofing</option>
                                            <option value="Labourer Eight">Sheet metal work</option>
                                            <option value="Labourer Eight">Demolition</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="form-row">
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-4">
                                        <label htmlFor="injuredLabourers">Injured Labourers<span className="text-danger">*</span></label>
                                        <select
                                            required
                                            name="injuredLabourers"
                                            className="form-control form-control-lg" multiple
                                        >
                                            <option defaultValue="" disabled>Select Labourers</option>
                                            <option value="Sierra Brooks">Sierra Brooks</option>
                                            <option value="Labourer Two">John Bill</option>
                                            <option value="Labourer Three">Labourer Three</option>
                                            <option value="Labourer Four">Labourer Four</option>
                                            <option value="Labourer Five">Labourer Five</option>
                                            <option value="Labourer Six">Labourer Six</option>
                                            <option value="Labourer Seven">Labourer Six</option>
                                            <option value="Labourer Eight">Labourer Seven</option>
                                        </select>
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