import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as Auth from '../../utils/Auth';
import * as DataSanitizer from '../../utils/DataSanitizer';

import Layout from '../components/Layout';
import Table from '../components/Table';
import RatingBadge from '../components/RatingBadge';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import UnauthorizedMessage from '../components/UnauthorizedMessage';

import { JOBS_TABLE_COLUMNS   } from '../../utils/TableColumns';

const BASE_URL = "http://localhost:5001/api";

const ClientProfile = (props) => {

    const [authorized, setAuthorized] = useState(false);
    const [isProfileOwner, setIsProfileOwner] = useState(false);
    const [isAdministrator, setIsAdministrator] = useState(false);

    const [loaded, setLoaded] = useState();
    const [client, setClient] = useState();
    const [jobs, setJobs] = useState();
    const [incidents, setIncidents] = useState();

    const fetchProfileData = async(id) => {
        // Get client profile
        try {
            let response = await fetch(BASE_URL + `/ClientProfile/${id}`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${Auth.getToken()}`
                }
            });

            if(response.status !== 200) {
                throw response;
            }

            let data = await response.json();

            if(response.status === 200 && data.client) {
                setClient({...data.client, rating: data.averageRating});
            } else {
                throw response;
            }
        } catch(e) {
            console.error(e);
        }

        // Get client jobs
        try {
            let response = await fetch(BASE_URL + `/Job/GetJobByClientId/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            });

            let data = await response.json();

            if(response.status === 200 && data) {
                setJobs(DataSanitizer.cleanJobsData(data));
            }
        } catch(e) {
            console.error(e);
        }

        // Get client incidents
        

        // Set loading state
        setLoaded(true);
    }

    const profile = client && (
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
                    {client.clientName}
                </h1>
            </div>

            <div className="card-body border-top">
                <h3 className="font-16">Quality Rating</h3>
                <RatingBadge rating={client.rating} />
            </div>

            { client.clientDescription &&
            <div className="card-body border-top">
                <h3 className="font-16">About</h3>
                <p>{client.clientDescription}</p>
            </div>
            }

            <div className="card-body border-top">
                <h3 className="font-16">Location</h3>
                <address className="mb-0">
                    {`${client.clientCity}, ${client.clientState}`}
                </address>
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
            {/* Admin Actions */}
            { isAdministrator &&
            <div className="card">
                <h4 className="card-header">Manage Invoices</h4>
                <div className="card-body">
                <p>Invoices table goes here</p>
                </div>
            </div>
            }

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
                    { jobs ?
                    <Table
                        columns={JOBS_TABLE_COLUMNS}
                        data={jobs}
                        itemsPerPage={5}
                        path={'/job'}
                        searchable={false}
                        {...props}
                    />
                    :
                    <p className="lead">No jobs to display.</p>
                    }
                </div>
            </div>

            {/* Incidents */}
            <div className="card">
            <h4 className="card-header">Incidents</h4>
            <div className="card-body">
            { incidents ?
            <p>Incidents table goes here.</p>
            :
            <p className="lead">No incidents to display.</p>
            }
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
    { client ? profile : <ErrorMessage message={"No profile found."} /> }
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
                Auth.authenticateClient() && id === Auth.getID() ? true :
                false
            );

            // Fetch data
            // Check if user is: an administrator,
            // or the client who owns this profile
            if(isAuthorized) {
                fetchProfileData(id);
                setIsProfileOwner(Auth.authenticateClient() && id === Auth.getID());
                setIsAdministrator(Auth.authenticateAdmin());
            }

            // Set authorization state
            setAuthorized(isAuthorized);
        }
    }, [])

    return <Layout content={content} />;
}

export default ClientProfile;