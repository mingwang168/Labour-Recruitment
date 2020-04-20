import React from 'react';
import { Link } from 'react-router-dom';

import TopNav from '../../components/TopNav';
import SideNav from '../../components/SideNav';
// import AddJobWidget from './components/AddJobWidget';

const ClientAddJob = (props) => {

    const validateForm = (e) => {
        console.log('Validating form....');
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
            <form>
                <div className="form-group">
                    <label htmlFor="title">Job Title <span className="text-danger">*</span></label>
                    <input
                        required
                        name="title"
                        type="text"
                        placeholder="Enter job title"
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-row mb-2">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label htmlFor="startdate">Start Date <span className="text-danger">*</span></label>
                        <input
                            required
                            name="startdate"
                            type="date"
                            className="form-control form-control-lg"
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                    <label htmlFor="enddate">End Date <span className="text-danger">*</span></label>
                        <input
                            required
                            name="enddate"
                            type="date"
                            className="form-control form-control-lg"
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label for="payrate">Base Pay (per hour) <span className="text-danger">*</span></label>
                        <input
                            required
                            name="payrate"
                            type="number"
                            placeholder="0.00"
                            step="any"
                            className="form-control form-control-lg"
                        />
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Job Description</label>
                    <textarea
                        name="description"
                        type="text"
                        placeholder="Enter job description"
                        rows="3"
                        className="form-control form-control-lg"
                    />
                </div>
                <div className="form-row mb-2">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label for="address">Address <span className="text-danger">*</span></label>
                        <input
                            required
                            name="address"
                            type="text"
                            placeholder="Enter address"
                            className="form-control form-control-lg"
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                        <label for="province">Province <span className="text-danger">*</span></label>
                        <select
                            required
                            name="province"
                            className="form-control form-control-lg"
                        >
                            <option selected disabled>Select province</option>
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
                        <label for="city">City <span className="text-danger">*</span></label>
                        <select
                            required
                            name="enddate"
                            className="form-control form-control-lg"
                        >
                            <option selected disabled>Select city</option>
                            <option value="toronto">Toronto</option>
                            <option value="montreal">Montreal</option>
                            <option value="vancouver">Vancouver</option>
                            <option value="ottawa">Ottawa</option>
                            <option value="calgary">Calgary</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="workers">Select workers <span className="text-danger">*</span></label>
                    {/* <AddJobWidget /> */}
                </div>
                <div className="form-group row text-right">
                <div className="col col-sm-10 col-lg-12">
                    <Link to="/dashboard" className="btn btn-space btn-light">Cancel</Link>
                    <button onClick={e => validateForm(e)} className="btn btn-space btn-primary">Add Job</button>
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