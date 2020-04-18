import React from 'react';

const NotificationTabs = () => {
    return (
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
    )
}

export default NotificationTabs;