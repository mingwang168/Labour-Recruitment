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

const RegisterStart = (props) => {
    return (
    <div style={bodyStyles}>
    <form className="splash-container">
    <div className="card">
        <div className="card-header">
            <h3 className="mb-1">Get Started</h3>
            <p>Please select your account type.</p>
        </div>
        <div className="card-body">
            <a href="/register/client" className="d-block btn btn-outline-primary btn-lg text-left mb-3">
                <span className="h5"><i className="material-icons mr-2">business</i>Company Account</span><br />
                <small>Post jobs and hire labourers</small>
            </a>
            <a href="/register/labourer" className="d-block btn btn-outline-primary btn-lg text-left">
                <span className="h5"><i className="material-icons mr-2">emoji_people</i>Labourer Account</span><br />
                <small>Find work fast based on your skills</small>
            </a>
        </div>
        <div className="card-footer bg-white">
            <p>Already have an account? <Link to="/login" className="text-primary">Login here.</Link></p>
        </div>
    </div>
    </form>
    </div>
    )
}

export default RegisterStart;