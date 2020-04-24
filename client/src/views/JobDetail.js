import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Ratings from 'react-ratings-declarative';

import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';

const BASE_URL = "http://localhost:5001/api";

const JobDetail = (props) => {
    const [details,setDetails] = useState()

    const changeSafetyRating = () => {
        console.log("Changing safety rating...");
    }

    const fetchJobDetails = (id) => {
        let token = sessionStorage.getItem("auth_token")
        fetch(BASE_URL + '/job/' + id , {
            method : 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(json => setDetails(json))
        .catch(function (error) {
            console.log("Server error. Please try again later.");
        })
    }

    useEffect(() => {
        fetchJobDetails(props.match.params.id)
    }, [props.match.params.id])

    console.log(details)
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
                <h2 className="pageheader-title">Job Details</h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/dashboard" className="breadcrumb-link">Dashboard</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Crescent Court Homes</li>
                </ol>
                </nav>
                </div>
            </div>
            </div>
            </div>

            <div className="row">
                {/* Project Details */}
                <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="font-26 mb-0">Crescent Court Homes</h1>
                            <p>Turner Construction</p>
                        </div>
                        <div className="card-body border-top">
                            <p>Crescent Court offers exceptional homes in a natural setting with the benefits of urban living, situated at SFU's UniverCity community.</p>
                        </div>
                        <div className="card-body border-top">
                            <h3 className="font-16">Status</h3>
                            <span className="badge badge-primary">In Progress</span>
                        </div>
                        <div className="card-body border-top">
                            <h3 className="font-16">Dates</h3>
                            <time>Feb 20, 2020</time> to <time>May 8, 2020</time>
                        </div>
                        <div className="card-body border-top">
                            <h3 className="font-16">Location</h3>
                            <p>8725 University Crescent<br/>Burnaby, BC V5A4X9</p>
                        </div>
                        <div className="card-body border-top">
                            <h3 className="font-16">Labourers Hired</h3>
                            <ul className="list-unstyled mb-0">
                                <li>General Labour (20)</li>
                                <li>Electrical (20)</li>
                                <li>Roofing (20)</li>
                                <li>Drywall (20)</li>
                                <li>Painting (10)</li>
                                <li>Plumbing (10)</li>
                            </ul>
                        </div>
                        <div className="card-body border-top">
                            <h3 className="font-16">Total Hired</h3>
                            <p>100 labourers</p>
                        </div>
                        <div className="card-body border-top">
                            <h3 className="font-16">Base Pay</h3>
                            <p>$21.85/hr</p>
                        </div>
                        {/* Display this only if the job owner is viewing this page */}
                        <div className="card-body border-top">
                            <Link to="/editjob" className="btn btn-light">Edit Job Details</Link>
                        </div>
                    </div>

                    {/* Incidents */}
                    <div className="card">
                    <h5 className="card-header">Incident Reports</h5>
                    <div className="card-body">
                    <table className="table table-bordered job-incidents-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Reports</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><time>Mar 3, 2020</time></td>
                            <td><span className="badge badge-danger">Required</span></td>
                            <td><Link to="/incident" className="badge badge-light">View Details</Link></td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">

                    {/* Daily Quality Ratings */}
                    <div className="card job-dqr">
                        <h5 className="card-header">Daily Quality Ratings</h5>
                        <div className="card-body">
                        <p>Daily quality ratings are used to track a labourer's attendance, and average quality rating.</p>
                        <table className="table table-bordered job-dqr-table">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-success">Complete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-success">Complete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-success">Complete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                                <tr>
                                    <td>Mar 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><a href="/job" className="badge badge-light">View Details</a></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    
                    {/* Safety Meetings */}
                    <div className="card">
                        <h5 className="card-header">Safety Meetings</h5>
                        <div className="card-body">
                            <p>Safety meetings are mandatory. Please check off the dates where safety meetings were completed.</p>
                            <table className="table table-bordered job-safetymeetings-table">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Apr 3, 2020</td>
                                    <td><span className="badge badge-danger">Incomplete</span></td>
                                    <td><Link to="/job" className="badge badge-light">Change</Link></td>
                                </tr>
                                <tr>
                                    <td>Apr 2, 2020</td>
                                    <td><span className="badge badge-success">Complete</span></td>
                                    <td><Link to="/job" className="badge badge-light">Change</Link></td>
                                </tr>
                                <tr>
                                    <td>Apr 1, 2020</td>
                                    <td><span className="badge badge-success">Complete</span></td>
                                    <td><Link to="/job" className="badge badge-light">Change</Link></td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Safety Ratings */}
                    <div className="card" id="safetyratings">
                        <h5 className="card-header">Safety Ratings</h5>
                        <div className="card-body">
                            <p>Give hired labourers a rating, based on their safety-wise performance on this job.</p>
                            <table className="table table-bordered job-safetyratings-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Work Type</th>
                                <th>Rating</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Jane Smith</td>
                                    <td>Painting</td>
                                    <td>
                                        <Ratings
                                            rating={3}
                                            widgetDimensions="14px"
                                            changeRating={changeSafetyRating}
                                        >
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        </Ratings>
                                    </td>
                                </tr>
                                <tr>
                                    <td>John Doe</td>
                                    <td>Drywall</td>
                                    <td>
                                        <Ratings
                                            rating={3}
                                            widgetDimensions="14px"
                                            changeRating={changeSafetyRating}
                                        >
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        </Ratings>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Matthew Smith</td>
                                    <td>Drywall</td>
                                    <td>
                                        <Ratings
                                            rating={5}
                                            widgetDimensions="14px"
                                            changeRating={changeSafetyRating}
                                        >
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        <Ratings.Widget widgetHoverColor="#6d7a82"/>
                                        </Ratings>
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> {/* end row */}
        </div>
        </div>
    </div>
    )
}

export default JobDetail;