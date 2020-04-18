import React from 'react';

import logo from '../assets/images/avatars/turner.jpg';

const TopNav = () => {
    return (
    <div className="dashboard-header">
    <nav className="navbar navbar-expand-lg bg-white fixed-top">
        {/* Logo */}
        <a href="/dashboard" className="navbar-brand" style={{color:'#3d405c', textTransform:'none'}}>Jobstart</a>

        {/* Mobile Menu Toggle Button */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            <i className="material-icons text-dark mt-2 mr-1" style={{fontSize:'2rem'}}>menu</i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto navbar-right-top">
            {/* Notifications (Admin Only) */}
            <li className="nav-item dropdown notification">
                <a className="nav-link nav-icons" href="/dashboard" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{marginTop:'5px'}}>
                    <i className="material-icons">notifications</i><span className="indicator d-none d-lg-block"></span>
                    <span className="ml-2 d-inline-block d-lg-none">View Notifications</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-right notification-dropdown">
                <li>
                    <div className="notification-title">Notifications</div>
                    <div className="notification-list">
                    <div className="list-group">
                        <a href="/dashboard" className="list-group-item list-group-item-action">
                        <div className="notification-info">
                        <div className="notification-list-user-block" style={{paddingLeft:'0px'}}>
                            <span className="notification-list-user-name" style={{marginRight:'0px'}}>Company ABC</span> created an Incident Report
                            <div className="notification-date">30 min ago</div>
                        </div>
                        </div>
                        </a>
                        <a href="/dashboard" className="list-group-item list-group-item-action">
                        <div className="notification-info">
                        <div className="notification-list-user-block" style={{paddingLeft:'0px'}}>
                            <span className="notification-list-user-name" style={{marginRight:'0px'}}>BCIT</span> created an Incident Report
                            <div className="notification-date">3 hours ago</div>
                        </div>
                        </div>
                        </a>
                        <a href="/dashboard" className="list-group-item list-group-item-action">
                        <div className="notification-info">
                        <div className="notification-list-user-block" style={{paddingLeft:'0px'}}>
                            <span className="notification-list-user-name" style={{marginRight:'0px'}}>Concord Pacific</span> created an Incident Report
                            <div className="notification-date">8 hours ago</div>
                        </div>
                        </div>
                        </a>
                        <a href="/dashboard" className="list-group-item list-group-item-action">
                        <div className="notification-info">
                        <div className="notification-list-user-block" style={{paddingLeft:'0px'}}>
                            <span className="notification-list-user-name" style={{marginRight:'0px'}}>Painting Company</span> created an Incident Report
                            <div className="notification-date">10 hours ago</div>
                        </div>
                        </div>
                        </a>
                        <a href="/dashboard" className="list-group-item list-group-item-action">
                        <div className="notification-info">
                        <div className="notification-list-user-block" style={{paddingLeft:'0px'}}>
                            <span className="notification-list-user-name" style={{marginRight:'0px'}}>Demolition Company</span> created an Incident Report
                            <div className="notification-date">1 day ago</div>
                        </div>
                        </div>
                        </a>
                    </div>
                    </div>
                </li>
                <li>
                    <div className="list-footer"><a href="/admin/notifications">View all notifications</a></div>
                </li>
                </ul>
            </li>

            <li className="nav-item dropdown nav-user">
                <a className="d-flex nav-link nav-user-img" href="/dashboard" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={logo} alt="Logo" className="user-avatar-md rounded-circle" />
                    <h5 className="ml-2 mt-1 mb-0 text-dark nav-user-name">Turner Construction</h5>
                </a>
                <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                    <a className="dropdown-item mt-1" href="/client/profile">Settings</a>
                    <a className="dropdown-item" href="/">Logout</a>
                </div>
            </li>
        </ul>
        </div>
    </nav>

    </div>
    )
}

export default TopNav;