import React, { useState, useEffect } from 'react';

import * as Auth from '../../utils/Auth';

import Loader from '../components/Loader';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Select from 'react-select';
import Table from '../components/Table';
import ErrorMessage from '../components/ErrorMessage';
import UnauthorizedMessage from '../components/UnauthorizedMessage';

const BASE_URL = "http://localhost:5001/api";

const AdminInvoices = (props) => {

    // Authorization
    const [authorized] = useState(Auth.authenticateAdmin());

    // Components
    const [loaded, setLoaded] = useState(false);

    // Data
    const [clients, setClients] = useState();

    const fetchClients = async() => {
        try {
            const URI = BASE_URL + "/ClientProfile";
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
                setClients(data.map((d) => {
                    return {
                        label: d.clientName,
                        value: d.clientId
                    }
                }));
            }
            
        } catch(e) {
            console.error(e);
        }
    }

    const fetchJobsByClientID = async() => {
        try {
            const URI = BASE_URL + "";
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
            
        } catch(e) {
            console.error(e);
        }
    }

    const fetchInvoiceWeeksByJobID = async() => {
        try {
            const URI = BASE_URL + "";
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
            
        } catch(e) {
            console.error(e);
        }
    }

    const onChangeClient = (selection) => {
        if(selection) console.log(selection)
    }

    useEffect(() => {
        fetchClients();
        setLoaded(true);
    }, [])

    const content = (
    <>
    <PageHeader
        title={`Manage Invoices`}
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
            <label htmlFor="client">Select Client</label>
            <Select
                required
                name="client"
                options={clients}
                onChange={onChangeClient}
            />
        </div>
        </div>
        </div>
        </div>    
    </Loader>
    </>
    );

    return <Layout content={authorized ? content : <UnauthorizedMessage />} />;
}

export default AdminInvoices;