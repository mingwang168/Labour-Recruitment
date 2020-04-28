import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = () => {
    return (
    <div className="nav-left-sidebar sidebar-dark">
    <div className="menu-list">
    <nav className="navbar navbar-expand-lg navbar-light">

        {/* Mobile Menu Toggle */}
        <a className="d-xl-none d-lg-none" href="/dashboard">Dashboard</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        {/* Main Navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav flex-column">
            <li className="nav-divider">
                Client Menu
            </li>
            <div className="nav-item">
                <Link to="/dashboard" className="nav-link">
                    <i className="material-icons" style={{paddingBottom:'3px'}}>dashboard</i>Dashboard
                </Link>
            </div>
            <div className="nav-item">
                <Link to="/addjob" className="nav-link">
                    <i className="material-icons" style={{paddingBottom:'3px'}}>edit</i>Add Job
                </Link>
            </div>
            <div className="nav-item">
                <Link to="/incidents" className="nav-link">
                    <i className="material-icons" style={{paddingBottom:'3px'}}>report_problem</i>Incident Reports
                </Link>
            </div>
            <div className="nav-item">
                <Link to="/profile/client" className="nav-link">
                    <i className="material-icons" style={{paddingBottom:'3px'}}>account_box</i>Company Profile
                </Link>
            </div>
            <div className="nav-item">
                <Link to="/profile/labourer" className="nav-link">
                    <i className="material-icons" style={{paddingBottom:'3px'}}>account_box</i>Labourer Profile
                </Link>
            </div>
        </ul>
        </div>
    </nav>
    </div>
    </div>
    )
}

export default SideNav;