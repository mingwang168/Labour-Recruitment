import React from 'react';
import { Link } from 'react-router-dom';

import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

import * as Auth from '../../utils/Auth';
import * as DataSanitizer from '../../utils/DataSanitizer';

const ClientLabourerAttendance = (props) => {

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
                    <h2 className="pageheader-title">
                        Labourer Attendance for {DataSanitizer.formatDateString(props.match.params.date)}
                    </h2>
                    <hr />
                </div>
                </div>
                </div>

               <div className="card">
                   <div className="card-body">
                       
                   </div>
               </div>
                
            </div>

            <Footer />
        </div>
    </div>
    )
}

export default ClientLabourerAttendance;