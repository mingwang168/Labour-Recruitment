import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as Auth from '../../utils/Auth';
import * as DataSanitizer from '../../utils/DataSanitizer';

import Layout from '../components/Layout';
import Table from '../components/Table';
import OneColumnTable from '../components/OneColumnTable';
import AvailabilityBadge from '../components/AvailabilityBadge';
import RatingBadge from '../components/RatingBadge';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import UnauthorizedMessage from '../components/UnauthorizedMessage';

import { JOBS_TABLE_COLUMNS } from '../../utils/TableColumns';

const BASE_URL = "http://localhost:5001/api";

const LabourerProfile = (props) => {

    const [authorized, setAuthorized] = useState(false);
    const [isProfileOwner, setIsProfileOwner] = useState(false);

    const [loaded, setLoaded] = useState();
    const [labourer, setLabourer] = useState();
    const [jobs, setJobs] = useState();

    const fetchProfileData = async(id) => {
        // Fetch profile data
        try {
            let response = await fetch(BASE_URL + `/LabourerProfile/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${Auth.getToken()}`
                }
            });
            
            if(response.status !== 200) {
                throw response;
            }
    
            let data = await response.json();

            setLabourer({
                ...data.labourer,
                qualityRating: data.averageQuality,
                safetyRating: data.averageSafety
            });
        } catch(e){
            console.error(e);
        }

        // Fetch job data
        try {
            let response = await fetch(BASE_URL + `/Job/GetJobByLabourerId/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${Auth.getToken()}`
                }
            });
            
            if(response.status !== 200) {
                setLoaded(true);
                throw response;
            }
    
            let data = await response.json();
            setJobs(DataSanitizer.cleanJobsData(data));
        } catch(e){
            console.error(e);
        }

        // Fetch incident data

        // Finish loading
        setLoaded(true);
    }

    const profile = labourer && (
    <>
    {/* Page Header */}
    <div className="row">
    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
    <div className="page-header">
        <h2 className="pageheader-title">My Profile</h2>
        <div className="page-breadcrumb">
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link
                    to="/dashboard"
                    className="breadcrumb-link"
                    >
                        Home
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Profile
                </li>
            </ol>
            </nav>
        </div>
    </div>
    </div>
    </div>

    <div className="row">
        {/* Profile */}
        <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="card">

            <div className="card-body">
                <h1 className="font-26 mb-2">
                    {`${labourer.labourerFirstName} ${labourer.labourerLastName}`}
                </h1>
            </div>

            <div className="card-body border-top">
                <h3 className="font-16">Status</h3>
                <AvailabilityBadge status={labourer.isAvailable} />
            </div>

            <div className="card-body border-top">
                <h3 className="font-16">Quality Rating</h3>
                <RatingBadge rating={labourer.qualityRating} />
            </div>

            <div className="card-body border-top">
                <h3 className="font-16">Safety Rating</h3>
                <RatingBadge rating={labourer.safetyRating} />
            </div>

            <div className="card-body border-top">
                <h3 className="font-16">Contact Information</h3>
                <ul className="list-unstyled icon-list mb-0">
                    <li className="mb-2">
                        <i className="material-icons">email</i>
                        <span>
                            <a href={`mailto:${labourer.labourerEmail}`}>{labourer.labourerEmail}</a>
                        </span>
                    </li>
                </ul>
            </div>

            { isProfileOwner &&
            <div className="card-body border-top">
                <Link
                    to="/profile/edit"
                    className="btn btn-light"
                >
                    Edit Profile
                </Link>
            </div>
            }

        </div>
        </div>

        <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
            {/* Skills */}
            <div className="card">
                <div className="card-header d-flex">
                    <h4 className="card-header-title">Skills</h4>
                    { isProfileOwner &&
                    <div className="toolbar ml-auto">
                        <Link
                            to="/profile/edit"
                            className="btn btn-light btn-sm"
                        >
                            Edit
                        </Link>
                    </div>
                    }
                </div>
                <div className="card-body">
                    <OneColumnTable
                        data={["Drywall", "Electrical"]}
                        header={"Name"}
                    />
                </div>
            </div>

            {/* Jobs */}
            <div className="card">
                <div className="card-header d-flex">
                    <h4 className="card-header-title">Active Jobs</h4>
                    <div className="toolbar ml-auto">
                        <Link
                            to="/dashboard"
                            className="btn btn-primary btn-sm"
                        >
                            View All
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    { jobs &&
                    <Table
                        data={jobs}
                        columns={JOBS_TABLE_COLUMNS}
                        itemsPerPage={5}
                        path="/job"
                        {...props}
                    />
                    }
                </div>
            </div>

            {/* Incidents */}
            <div className="card">
                <div className="card-header d-flex">
                    <h4 className="card-header-title">Incident Reports</h4>
                    <div className="toolbar ml-auto">
                        <Link
                            to="/incidents"
                            className="btn btn-primary btn-sm"
                        >
                            View All
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    
                </div>
            </div>
        </div>

    </div>
    </>
    );

    const content = !authorized ? <UnauthorizedMessage /> :
    (
    <>
    <Loader loaded={loaded}>
    { labourer ? profile : <ErrorMessage message={"No profile found."} /> }
    </Loader>
    </>
    );

    useEffect(() => {
        // Check for valid params in URL
        if(props.match.params.id && Number.isInteger(Number(props.match.params.id))) {
            let id = props.match.params.id;

            // Check if user is authorized
            let isAuthorized = (
                Auth.authenticateAdmin() ? true :
                Auth.authenticateLabourer() && id === Auth.getID() ? true :
                false
            );

            // Check if user is: an administrator,
            // or the labourer who owns this profile
            if(isAuthorized) {
                fetchProfileData(id);
                setIsProfileOwner(Auth.authenticateLabourer() && id === Auth.getID());
            }

            // Set authorization state
            setAuthorized(isAuthorized);
        }
    }, [])

    return <Layout content={content} />;
}

export default LabourerProfile;