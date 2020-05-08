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
    const [labourer, setlabourer] = useState();

    
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
        if(params) {
            
        }
    }, [])

    return <Layout content={!authorized ? <UnauthorizedMessage /> : content} />;
}

export default PayrollDetail;