import React, { useState, useEffect } from 'react';

import * as Auth from '../utils/Auth';
import { isValidDate } from '../utils/ValidateDate';
import { isWholeNumber } from '../utils/IsWholeNumber';

import Loader from './components/Loader';
import Layout from './components/Layout';
import PageHeader from './components/PageHeader';
import Invoice from './components/Invoice';
import ErrorMessage from './components/ErrorMessage';
import UnauthorizedMessage from './components/UnauthorizedMessage';

const BASE_URL = "http://localhost:5001/api";

const PayrollDetail = (props) => {

    // Authorization
    const [authorized, setAuthorized] = useState(
        Auth.authenticateAdmin() || Auth.authenticateClient()
    );

    const [params] = useState(props.match.params && {
        JobId: props.match.params.id && isWholeNumber(props.match.params.id) ? props.match.params.id : null,
        StartDay: isValidDate(props.match.params.startdate) ? props.match.params.startdate : null,
        EndDay: isValidDate(props.match.params.enddate) ? props.match.params.enddate : null
    });

    // Component
    const [loaded, setLoaded] = useState(false);

    // Data
    const [labourer, setLabourer] = useState();


    const fetchReport = async() => {
        let generatedInvoice;

        // Fetch job data
        try {
            const URI = BASE_URL + `/Job/GetJob/${params.JobId}`;
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

            // if(data) {
            //     generatedInvoice = {
            //         job: data.title,
            //         complete: data.isComplete,
            //         duration: getDuration(data.startDate, data.endDate),
            //         isComplete: data.isComplete,
            //         client: {
            //             name: data.client.clientName,
            //             address: `${data.client.clientCity}, ${data.client.clientState}`,
            //             phone: data.client.clientPhoneNumber
            //         }
            //     }
            // }
        } catch(e) {
            console.error(e)
        }

        // Fetch labourer data
        try {
            const URI = BASE_URL + `/ClientInvoice`;
            let response = await fetch(URI, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Auth.getToken()}`
                },
                body: JSON.stringify(params)
            });

            if(response.status !== 200) {
                throw response;
            }

            let data = await response.json();

            if(data.length) {
                console.log(data)
                let formattedData = data.map(d => ({
                    id: d.labourer.labourerId,
                    name: d.labourer.labourerFirstName + " " +d.labourer.labourerLastName,
                    skill: d.skill.skillName,
                    days: d.workedDays,
                    hours: d.totalHours
                }));

               
                console.log(formattedData)
                 setLabourer(formattedData)                  
            }
        } catch(e) {
            console.error(e)
        }
        
        // Set loading state
        setLoaded(true);
    }

    const content = (
    <Loader loaded={loaded}>
        <PageHeader
            title={`Payroll Details`}
            breadcrumbs={[
                { name: "Home", path: "/dashboard" },
                { 
                    name: "Payroll",
                    path: Auth.authenticateAdmin()
                        && "/admin/payroll"
                },
                { name: "Payroll Details" }
            ]}
        />

      
    </Loader>
    );

    useEffect(() => {
        fetchReport()
       
    }, [])

    return <Layout content={!authorized ? <UnauthorizedMessage /> : content} />;
}

export default PayrollDetail;