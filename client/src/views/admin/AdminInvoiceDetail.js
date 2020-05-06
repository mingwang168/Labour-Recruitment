import React, { useState, useEffect } from 'react';

import * as Auth from '../../utils/Auth';
import { isWholeNumber } from '../../utils/IsWholeNumber';

import Loader from '../components/Loader';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import Invoice from '../components/Invoice';
import ErrorMessage from '../components/ErrorMessage';
import UnauthorizedMessage from '../components/UnauthorizedMessage';

const BASE_URL = "http://localhost:5001/api";

const AdminInvoiceDetail = (props) => {

    // Authorization
    const [authorized, setAuthorized] = useState(
        Auth.authenticateAdmin() || Auth.authenticateClient()
    );

    const [id] = useState(
        props.match.params.id && isWholeNumber(props.match.params.id) ? props.match.params.id : null
    );

    // Components
    const [loaded, setLoaded] = useState(false);

    // Data
    const [invoice, setInvoice] = useState();

    const getInvoiceData = async(id) => {
        try {
            const URI = BASE_URL + `/Job/GetJob/${id}`;
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

            if(data) {
                setInvoice({
                    job: data.title,
                    complete: data.isComplete,
                    duration: getDuration(data.startDate, data.endDate),
                    client: {
                        name: data.client.clientName,
                        address: `${data.client.clientCity}, ${data.client.clientState}`,
                        phone: data.client.clientPhoneNumber
                    },
                    labourers: data.jobSkill.map(skill => {
                        return {
                            type: skill.skill.skillName,
                            quantity: skill.numberNeeded,
                            rate: skill.skill.labourerReceives.toFixed(2)
                        }
                    })
                });
            }
        } catch(e) {
            console.error(e)
        }

        // Set loading state
        setLoaded(true);
    }

    const checkInvoiceBelongsToOwner = async(id) => {
        try {
            const URI = BASE_URL + `/Job/GetClientIDByJobID/${id}`;
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
                if(data[0].toString() !== Auth.getID()) {
                    setAuthorized(false);
                }
            } else {
                setAuthorized(false);
            }
        } catch(e) {
            console.error(e)
        }
    }

    const getDuration = (s, e) => {
        let start = new Date(s);
        let end = new Date(e);
        if(start.getTime() === end.getTime()) {
            return 1;
        }
        const day = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((start - end) / day));
    }

    useEffect(() => {
        if(Auth.authenticateClient()) checkInvoiceBelongsToOwner(id);
        getInvoiceData(id);
    }, [])

    const content = (
    <>
        <PageHeader
            title={`Invoice Details`}
            breadcrumbs={[
                { name: "Home", path: "/dashboard" },
                { name: "Invoices", path: Auth.authenticateAdmin() ? "/admin/invoices" : "/invoices" },
                { name: "Invoice Details" }
            ]}
        />

        <Loader loaded={loaded}>
        { !invoice ? <ErrorMessage message={"Invoice does not exist."} /> : <Invoice data={invoice} /> }
        <p></p>
        </Loader>
    </>
    );

    return <Layout content={authorized ? content : <UnauthorizedMessage />} />;
}

export default AdminInvoiceDetail;