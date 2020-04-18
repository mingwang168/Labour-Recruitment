import React from 'react';

import TopNav from '../../components/TopNav';
import SideNav from '../../components/SideNav';

const AddJob = (props) => {

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
                <h2 className="pageheader-title">Add New Job</h2>
                <div className="page-breadcrumb">
                <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/dashboard" className="breadcrumb-link">Dashboard</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Add New Job</li>
                </ol>
                </nav>
                </div>
            </div>
            </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label for="inputText3" className="col-form-label">
                                Input Text
                            </label>
                            <input id="inputText3" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="inputEmail">Email address</label>
                            <input
                                id="inputEmail"
                                type="email"
                                placeholder="name@example.com"
                                className="form-control"
                            />
                            <p className="mt-1">We'll never share your email with anyone else.</p>
                        </div>
                        <div className="form-group">
                            <label for="inputText4" className="col-form-label">
                                Number Input
                            </label>
                            <input
                                id="inputText4"
                                type="number"
                                className="form-control"
                                placeholder="Numbers"
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputPassword">Password</label>
                            <input
                                id="inputPassword"
                                type="password"
                                placeholder="Password"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label for="exampleFormControlTextarea1">Example textarea</label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                            ></textarea>
                        </div>
                    </form>
                </div>
            </div>

        </div>
        </div>
    </div>
    )
}

export default AddJob;