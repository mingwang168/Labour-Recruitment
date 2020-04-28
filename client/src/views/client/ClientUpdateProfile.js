import React from 'react';
import { Link } from 'react-router-dom';

import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';

const ClientUpdateProfile = (props) => {

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
                                <h2 className="pageheader-title">Update Client Profile</h2>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/profile/client" className="breadcrumb-link">Client Profile</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Update Client Profile</li>
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

                                <div className="row">
                                    <div className="col">                 
                                        <div className="border-bottom text-center card-header">
                                            <h4 className="mb-1">Sierra Brooks</h4>
                                            <span className="m-5"><i class="fas fa-star mr-2"></i>4.91 (18 ratings)</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group p-2 col">
                                        <label htmlFor="description">Description<span className="text-danger">*</span></label>
                                        <textarea
                                            name="description"
                                            type="text"
                                            placeholder="Enter client description"
                                            rows="4"
                                            className="form-control form-control-lg"
                                            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque"
                                        />
                                    </div>
                                </div>


                                <div className="form-row">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                        <label htmlFor="email">Email<span className="text-danger">*</span></label>
                                        <input
                                            required
                                            name="email"
                                            placeholder="Enter email"
                                            type="text"
                                            className="form-control form-control-lg"
                                            value="info@construction.ca"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                        <label htmlFor="telephone">Telephone<span className="text-danger">*</span></label>
                                        <input
                                            required
                                            name="telephone"
                                            placeholder="Enter telephone number"
                                            type="text"
                                            className="form-control form-control-lg"
                                            value="(604)778-8888"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                        <label htmlFor="address">Address<span className="text-danger">*</span></label>
                                        <input
                                            required
                                            name="address"
                                            placeholder="Enter address"
                                            type="text"
                                            className="form-control form-control-lg"
                                            value="1234 Burrad Street, Vancouver BC"
                                        />
                                    </div>
                                </div>

                                <div className="form-group row text-right mt-4">
                                    <div className="col col-lg-12">
                                        <Link to="/profile/client" className="btn btn-space btn-light btn-lg">Cancel</Link>
                                        <button onClick={() => validateForm()} className="btn btn-space btn-primary btn-lg">Update Client</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ClientUpdateProfile;