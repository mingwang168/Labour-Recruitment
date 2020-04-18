import React from 'react';

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

        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav flex-column">
            <li className="nav-divider">
                Client Menu
            </li>
            <div className="nav-item">
                <a href="/dashboard" className="nav-link">
                    <i className="material-icons" style={{paddingBottom:'3px'}}>dashboard</i>Dashboard
                </a>
            </div>
            <div className="nav-item">
                <a href="/addjob" className="nav-link">
                    <i className="material-icons" style={{paddingBottom:'3px'}}>edit</i>Add Job
                </a>
            </div>
            <div className="nav-item">
                <a href="/incidents" className="nav-link" data-toggle="collapse" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">
                    <i className="material-icons" style={{paddingBottom:'3px'}}>report_problem</i>Incident Reports
                </a>
            </div>
            <div className="nav-item">
                <a href="/profile/client" className="nav-link" data-toggle="collapse" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1">
                    <i className="material-icons" style={{paddingBottom:'3px'}}>account_box</i>Company Profile
                </a>
            </div>
        </ul>
        </div>
    </nav>
    </div>
    </div>
    )
}

export default SideNav;