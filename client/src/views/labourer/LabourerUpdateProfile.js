import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import DAYS from '../../utils/staticdata/Days';
import Select from 'react-select';


const BASE_URL = "http://localhost:5001/api";


const LabourerUpdateProfile = (props) => {

    const validateForm = _ => {
        console.log("Validating form...")
    }

    const [skillOptions, setSkillOptions] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    const fetchSkillOptions = async () => {
        try {
            const response = await fetch(BASE_URL + '/skills');
            let data = await response.json();
            setSkillOptions(data);
        } catch (error) {
            console.log(error);
        }
    }

    const onChangeSkill = (skills) => {
        if (skills) {
            skills.forEach(skill => setSelectedSkills([...selectedSkills, skill.value]));
        }
    }

    const onChangeAvailability = (days) => {
        if(days){
            days.forEach(day => setSelectedDays([...selectedDays, day.value]))
        }
    }


    useEffect(() => {
        fetchSkillOptions();
    })

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
                                <h2 className="pageheader-title">Update Labourer Profile</h2>
                                <div className="page-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="/profile/client" className="breadcrumb-link">Labourer Profile</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Update Labourer Profile</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Form */}
                    <div className="card">
                        <div className="card-body">
                            <form className="labourer-update-form">

                                <div className="row">
                                    <div className="col">
                                        <div className="border-bottom text-center card-header">
                                            <h4 className="mb-1">Sierra Brooks</h4>
                                            <span className="m-5"><i class="fas fa-star mr-2"></i>Available</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group p-2 col">
                                        <label htmlFor="description">Description<span className="text-danger">*</span></label>
                                        <textarea
                                            name="description"
                                            type="text"
                                            placeholder="Enter your description"
                                            rows="4"
                                            className="form-control form-control-lg"
                                            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque"
                                        />
                                    </div>
                                </div>


                                <div className="form-row">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                        <label htmlFor="email">Email<span className="text-danger">*</span></label>
                                        <input
                                            required
                                            name="email"
                                            placeholder="Enter email"
                                            type="text"
                                            className="form-control form-control-lg"
                                            value="sierra.brooks@gmail.ca"
                                        />
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                        <label htmlFor="telephone">Telephone<span className="text-danger">*</span></label>
                                        <input
                                            required
                                            name="telephone"
                                            placeholder="Enter telephone number"
                                            type="text"
                                            className="form-control form-control-lg"
                                            value="(604)778-8888"
                                        />
                                    </div>
                                </div>

                            <div className="form-row">
                                <div className="form-group col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                    <label className="d-block" htmlFor="skills">Select Skills<span className="text-danger">*</span></label>
                                    <Select
                                        options={skillOptions &&
                                            skillOptions.map(skill => {
                                                return { value: skill.skillId, label: skill.skillName }
                                            })
                                        }
                                        onChange={onChangeSkill}
                                        isMulti
                                    />
                                </div>
                                <div className="form-group col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mb-4">
                                    <label className="d-block" htmlFor="availability">Select Availability<span className="text-danger">*</span></label>
                                    <Select
                                        options={DAYS}
                                        onChange={onChangeAvailability}
                                        isMulti
                                    />
                                </div>
                            </div>



                                <div className="form-group row text-right mt-4">
                                    <div className="col col-lg-12">
                                        <Link to="/profile/client" className="btn btn-space btn-light btn-lg">Cancel</Link>
                                        <button onClick={() => validateForm()} className="btn btn-space btn-primary btn-lg">Update Client</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LabourerUpdateProfile;