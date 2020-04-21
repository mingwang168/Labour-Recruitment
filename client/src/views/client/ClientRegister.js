import React from 'react';
import { Link } from 'react-router-dom';

const bodyStyles = {
    height: '100vh',
    display: 'flex',
    msFlexAlign: 'center',
    alignItems: 'center',
    paddingTop: '40px',
    paddingBottom: '40px'
}


const RegisterClient = () => {

    const validateForm = (e) => {
        e.preventDefault();
        alert("Form submitted!");
    }


    return (
        <div style={bodyStyles}>
            <form className="splash-container">
                <div className="card">
                    <div className="card-header">
                        <h3 className="mb-1">Create Client Account</h3>
                        <p>Enter your user information.</p>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="companyname">Company Name <span className="text-danger">*</span></label>
                            <input
                                className="form-control form-control-lg"
                                name="companyname"
                                type="text"
                                placeholder="Enter company name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address <span className="text-danger">*</span></label>
                            <input
                                className="form-control form-control-lg"
                                name="email"
                                type="email"
                                placeholder="Enter email address"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password <span className="text-danger">*</span></label>
                            <input
                                className="form-control form-control-lg"
                                name="password"
                                type="password"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmpassword">Confirm Password <span className="text-danger">*</span></label>
                            <input
                                className="form-control form-control-lg"
                                name="confirmpassword"
                                type="password"
                                placeholder="Enter password again"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phonenumber">Phone Number <span className="text-danger">*</span></label>
                            <input
                                className="form-control form-control-lg"
                                name="phonenumber"
                                type="text"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City <span className="text-danger">*</span></label>
                            <input
                                className="form-control form-control-lg"
                                name="city"
                                type="text"
                                placeholder="Enter city"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="province">Province <span className="text-danger">*</span></label>
                            <input
                                className="form-control form-control-lg"
                                name="province"
                                type="text"
                                placeholder="Enter province"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="companydescription">Company Description <span className="text-danger">*</span></label>
                            <textarea
                                className="form-control form-control-lg"
                                name="companydescription"
                                type="text"
                                placeholder="Enter company description"
                                required
                            />
                        </div>

                        <div className="form-group pt-2">
                            <button
                                onClick={e => validateForm(e)}
                                className="btn btn-block btn-primary btn-lg"
                                type="submit"
                            >
                                Create Account
                            </button>
                        </div>

                    </div>
                    <div className="card-footer bg-white">
                        <p>Already have an account? <Link to="/login" className="text-primary">Login here.</Link></p>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default RegisterClient;