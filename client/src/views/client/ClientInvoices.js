import React, { useState, useEffect } from 'react';

import * as Auth from '../../utils/Auth';

import Loader from '../components/Loader';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Table from '../components/Table';
import ErrorMessage from '../components/ErrorMessage';
import UnauthorizedMessage from '../components/UnauthorizedMessage';

const BASE_URL = "http://localhost:5001/api";

const ClientInvoices = (props) => {

    // Authorization
    const [authorized] = useState(Auth.authenticateClient());

    // Components
    const [loaded, setLoaded] = useState(false);

    // Data
    const [jobs, setJobs] = useState();
    const [jobsTableColumns, setJobsTableColumns] = useState();

    const fetchJobs = async() => {
        try {
            const URI = BASE_URL + `/Job/GetJobByClientId/${Auth.getID()}`;
            let response = await fetch(URI, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${Auth.getToken()}`
                }
            });
    
            if(response.status !== 200) {
                throw response;
            }
    
            let data = await response.json();
    
            if(data.length) {
                let formattedData = data.map(d => ({
                    id: d.jobId,
                    title: d.title,
                    status: d.isComplete ? "Complete" : "In Progress"
                }));
    
                setJobs(formattedData);
                setJobsTableColumns([
                    {Header: 'Job Title', accessor: 'title'},
                    {Header: 'Completion Status', accessor: 'status'},
                ]);
            }
        } catch(e) {
            console.error(e);
        }

        // Set loading state
        setLoaded(true);
    }

    useEffect(() => {
        if(authorized) fetchJobs();
    }, [])

    const content = (
    <>
    <PageHeader
        title={`Invoices`}
        breadcrumbs={[
            { name: "Home", path: "/dashboard" },
            { name: "Invoices" }
        ]}
    />

    <Loader loaded={loaded}>
        <div className="row">
        <div className="col">
        <div className="card">
        <h5 className="card-header">Invoices</h5>
        <div className="card-body">
            { !jobs ? <ErrorMessage message={"No invoices to display."} /> :
            <Table
                data={jobs}
                columns={jobsTableColumns}
                path="/invoice"
                searchable={true}
                {...props}
            />
            }
        </div>
        </div>
        </div>
        </div>    
    </Loader>
    </>
    );

    return <Layout content={authorized ? content : <UnauthorizedMessage />} />;
}

export default ClientInvoices;