import React , {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';

import * as Auth from '../utils/Auth';
import * as DataSanitizer from '../utils/DataSanitizer';

import Layout from './components/Layout';
import PageHeader from './components/PageHeader';
import Loader from './components/Loader';
import Table from './components/Table';

import { INCIDENTS_TABLE_COLUMNS } from '../utils/TableColumns';

const BASE_URL = "http://localhost:5001/api";

const Incidents = (props) => {

    const [authorized] = useState(Auth.authenticateClient() || Auth.authenticateLabourer());

    const [loaded, setLoaded] = useState(false);
    const [incidents, setIncidents] = useState();

    const fetchIncidents = async() => {
        let token = Auth.getToken()
        try {
            let response = await fetch(BASE_URL + "/Incidents/GetAllIncidents" , {
                method : "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })

            if(response.status !== 200) {
                throw response;
            }
            
            let data = await response.json();

            if(data.length) {
                setIncidents(DataSanitizer.cleanIncidentsData(data));
            }
        } catch (e) {
            console.error(e);
        }
        setLoaded(true);
    }

    useEffect(() => {
        fetchIncidents();
    }, [])

    const content = !authorized ? <Redirect to="/dashboard" />  :
    (
    <>
    <PageHeader
        title={"Incidents"}
        breadcrumbs={[
            { name: "Home", path: "/dashboard" },
            { name: "Incidents" }
        ]}
    />

    <div className="row">
    <div className="col">
    <div className="card">
        <div className="card-header d-flex">
            <h4 className="card-header-title">Incidents</h4>
            <div className="toolbar ml-auto">
                <Link
                    to="/addincident"
                    className="btn btn-primary btn-sm"
                >
                    Add New
                </Link>
            </div>
        </div>
        <div className="card-body">
            <Loader loaded={loaded}>
                <Table
                    data={incidents}
                    columns={INCIDENTS_TABLE_COLUMNS}
                    path="/incident"
                    searchable="true"
                    {...props}
                />
            </Loader>
        </div>
    </div>
    </div>
    </div>
    </>
    );

    return <Layout content={content} />;
}

export default Incidents;