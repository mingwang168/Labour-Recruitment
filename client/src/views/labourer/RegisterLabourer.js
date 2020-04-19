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

const BASE_URL = "http://localhost:5000/api";
const AUTH_TOKEN = "auth_token";
const USER_NAME = "user_name";
const USER_ID = "user_id";



const RegisterLabourer = () => {

    const validateForm = (e) => {
        e.preventDefault();
        alert("Form submitted!");
    }

    return (
    <div style={bodyStyles}>
    <form className="splash-container">
    <div className="card">
        <div className="card-header">
            <h3 className="mb-1">Create Labourer Account</h3>
            <p>Enter your user information.</p>
        </div>
        <div className="card-body">
            <div className="form-group">
                <label htmlFor="fullname">Full Name <span className="text-danger">*</span></label>
                <input
                    className="form-control form-control-lg"
                    name="fullname"
                    type="text"
                    placeholder="Enter full name"
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
                <label className="d-block" htmlFor="skills">Select Skills <span className="text-danger">*</span></label>
                <select
                    className="selectpicker"
                    data-dropup-auto="false"
                    data-width="100%"
                    name="skills"
                    multiple
                >
                    <option value="carpentry">Carpentry</option>
                    <option value="painting">Painting</option>
                    <option value="drywall">Drywall</option>
                    <option value="electrical">Electrical</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="framing">Framing</option>
                    <option value="roofing">Roofing</option>
                    <option value="demolition">Demolition</option>
                </select>
            </div>
            <div className="form-group">
                <label className="d-block" htmlFor="availability">Select Availability <span className="text-danger">*</span></label>
                <select
                    className="selectpicker"
                    data-dropup-auto="false"
                    data-width="100%"
                    name="availability"
                    multiple
                >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                </select>
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
    </div>
    )
}

export default RegisterLabourer;