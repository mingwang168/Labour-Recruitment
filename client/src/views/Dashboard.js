import React, { useState } from 'react';
import * as Auth from '../utils/Auth';

import ClientDashboard from './client/ClientDashboard';
import LabourerDashboard from './labourer/LabourerDashboard';
import AdminDashboard from './admin/AdminDashboard';

import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import Footer from './components/Footer';

const Dashboard = (props) => {

    const [role] = useState(Auth.getRole());
    const [name] = useState(Auth.getName());
    let dashboard;

    if(role === "Client") {
        dashboard = <ClientDashboard name={name} {...props} />;
    } else if(role === "Labourer") {
        dashboard = <LabourerDashboard name={name} {...props} />;
    } else if(role === "Admin") {
        dashboard = <AdminDashboard name={name} {...props} />;
    } else {
        Auth.forceLogout();
    }

    return (
    <div className="dashboard-main-wrapper">
        <TopNav />
        <SideNav />

        <div className="dashboard-wrapper">
            <div className="container-fluid dashboard-content">
            { dashboard && dashboard }
            </div>
            <Footer />
        </div>
    </div>
    );
}

export default Dashboard;