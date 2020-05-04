import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as Auth from '../../utils/Auth';

import Layout from '../components/Layout';
import AvailabilityBadge from '../components/AvailabilityBadge';
import RatingBadge from '../components/RatingBadge';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const BASE_URL = "http://localhost:5001/api";

const LabourerProfile = (props) => {

    const [loaded, setLoaded] = useState();
    const [labourer, setLabourer] = useState();
    const [displayEditButton, setDisplayEditButton] = useState(false);

    const fetchLabourerProfile = async(id) => {
        // Fetch profile data
        try {
            let response = await fetch(BASE_URL + `/LabourerProfile/${id}`, {
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

            console.log(data);

            setLabourer({
                ...data.labourer,
                qualityRating: data.averageQuality,
                safetyRating: data.averageSafety
            });
            setLoaded(true);
        } catch(e){
            setLoaded(true);
            console.error(e);
        }

        // Fetch job data

        // Fetch incident data
    }

    useEffect(() => {
        if(props.match.params.id) {
            if(Number.isInteger(Number(props.match.params.id))) {
                fetchLabourerProfile(props.match.params.id);
            }
        } else {
            fetchLabourerProfile(Auth.getID());
            setDisplayEditButton(true);
        }
    }, [])

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

            { displayEditButton &&
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

        {/* Jobs */}
        <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
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
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore commodi voluptate perferendis assumenda. Eligendi ullam assumenda illum! Blanditiis mollitia distinctio repellendus placeat, fugiat temporibus sed, fuga ipsam voluptatibus magni qui!</p>
            </div>
        </div>
        </div>
    </div>
    </>
    );

    const content = (
    <>
    <Loader loaded={loaded}>
    { labourer ? profile : <ErrorMessage message={"No profile found."} /> }
    </Loader>
    </>
    );

    return <Layout content={content} />
}

export default LabourerProfile;