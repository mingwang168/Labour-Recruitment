import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TopNav from '../../components/TopNav';
import SideNav from '../../components/SideNav';
import Select from 'react-select';

const LABOURERS_LIST = [
    { value: 'Labourer One', label: 'Labourer One' },
    { value: 'Labourer Two', label: 'Labourer Two' },
    { value: 'Labourer Three', label: 'Labourer Three' },
    { value: 'Labourer Four', label: 'Labourer Four' },
];

const BASE_URL = "http://localhost:5001/api";

const ClientAddIncident = () => {
    const [workers, setWorkers] = useState([]);
    const [skillOptions, setSkillOptions] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedLabourers, setselectedLabourers] = useState([]);

    const validateForm = _ => {
        console.log("Validating form...")
    }

    const fetchskillOptions = async () => {
        try {
            const response = await fetch(BASE_URL + '/skills');
            let data = await response.json();
            setSkillOptions(data);
        } catch (e) {
            console.error(e)
        }
    }

    const onChangeSkill = (skills) => {
        if (skills) {
            skills.forEach(skill => setSelectedSkills([...selectedSkills, skill.value]))
        }
    }

    const onChangeLabourer = (labourers) => {
        if (labourers) {
            labourers.forEach(labourer => setselectedLabourers([...selectedLabourers, labourer.value]))
        }
    }


    useEffect(() => {
        fetchskillOptions();
    }, []);

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
                                <h2 className="pageheader-title">Add New Incident</h2>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/dashboard" className="breadcrumb-link">Dashboard</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Add New Incident</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="card">
                        <div className="card-body">
                            <form className="client-add-incident-form">

                                <div className="form-row mb-4">
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                        <label htmlFor="incidentdate">Date Of Incident<span className="text-danger">*</span></label>
                                        <input
                                            required
                                            name="incidentdate"
                                            type="date"
                                            className="form-control form-control-lg"
                                        />
                                    </div>
                                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                        <label htmlFor="injurytype">Injury Type<span className="text-danger">*</span></label>
                                        <input
                                            required
                                            name="injurytype"
                                            placeholder="Enter injury type"
                                            type="text"
                                            className="form-control form-control-lg"
                                        />
                                    </div>

                                    <div className=" col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-2">
                                        <label className="d-block" htmlFor="incidentType">Select incident type<span className="text-danger">*</span></label>
                                        <Select
                                            required
                                            name="incidenttype"
                                            options={skillOptions &&
                                                skillOptions.map(skill => {
                                                    return {
                                                        value: skill.skillId, label: skill.skillName
                                                    }
                                                })
                                            }
                                            onChange={onChangeSkill}
                                            isMulti
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 mb-4 px-0">
                                    <label className="d-block" htmlFor="injuredLabourers">Injured Labourers<span className="text-danger">*</span></label>
                                    <Select
                                        required
                                        name="injuredLabourers"
                                        options={LABOURERS_LIST}
                                        onChangeSkill={onChangeLabourer}
                                        isMulti
                                    />
                                </div>

                                <div className="form-group mb-4">
                                    <label htmlFor="incidentsummary">Summary of Incident</label>
                                    <textarea
                                        name="incidentsummary"
                                        type="text"
                                        placeholder="Enter incident summary"
                                        rows="3"
                                        className="form-control form-control-lg"
                                    />
                                </div>

                                <div className="form-group row text-right mt-4">
                                    <div className="col col-lg-12">
                                        <Link to="/dashboard" className="btn btn-space btn-light btn-lg">Cancel</Link>
                                        <button onClick={() => validateForm()} className="btn btn-space btn-primary btn-lg">Create New Incident</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ClientAddIncident;