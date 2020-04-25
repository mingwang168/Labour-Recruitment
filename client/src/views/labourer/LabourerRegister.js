import React , {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select';
import * as FormValidator from '../../utils/FormValidator';
import DAYS from '../../utils/Days';

const BASE_URL = "http://localhost:5001/api";
const AUTH_TOKEN = "auth_token";
const USER_NAME = "user_name";
const USER_EMAIL = "user_email";
const USER_ID = "user_id";
const USER_ROLE = "user_role";

const RegisterLabourer = (props) => {

    const [redirect, setRedirect] = useState(false);
    const [formErrors, setFormErrors] = useState([]);
    const [skillOptions, setSkillOptions] = useState([]);
    const [labourer, setLabourer] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: ""
    });
    const {
        firstname,
        lastname,
        email,
        password,
        confirmpassword
    } = labourer;
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    
    const fetchSkillOptions = async() => {
        try {
            const response = await fetch(BASE_URL + '/skills');
            let data = await response.json();
            setSkillOptions(data);
        } catch (e) {
            console.error(e);
        }
    }

    const onChange = e => {
        e.preventDefault();
        setLabourer({...labourer, [e.target.name]: e.target.value}); 
    }

    const onChangeSkill = (skills) => {
        if(skills) {
            skills.forEach(skill => setSelectedSkills([...selectedSkills, skill.value]));
        }
    }

    const onChangeAvailability = (days) => {
        if(days) {
            days.forEach(element => {
                setSelectedDays([ ... selectedDays,element.value]);
            });
        }
    }

    const validateForm = (e) => {
        e.preventDefault();
        let errors = [];

        if(!FormValidator.name(firstname)) {
            errors.push("Invalid first name entered.");
        }
        if(!FormValidator.name(lastname)) {
            console.log(lastname)
            errors.push("Invalid last name entered.");
        }
        if(!FormValidator.email(email)) {
            errors.push("Invalid email entered.");
        }
        if(password === confirmpassword) {
            if(!FormValidator.password(password)) {
                errors.push("Password must contain at least 8 characters, and each of the following: one uppercase letter, one lowercase letter, one number, and one symbol.");
            }
        } else {
            errors.push("Passwords do not match.");
        }
        if(!selectedSkills.length) {
            errors.push("You must select at least one skill.")
        }
        if(!selectedDays.length) {
            errors.push("You must select at least one available day.")
        }
        if(errors.length) {
            setFormErrors(errors);
        } else {
            submitForm();
        }
    }

    const submitForm = async() => {
        try {
            let response = await fetch(BASE_URL + "/RegisterLabourer", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    User: {
                        email,
                        password,
                        role: "Labourer"
                    },
                    Labourer: { 
                        LabourerFirstName: firstname,
                        LabourerLastName: lastname
                    },
                    AvailableDays: selectedDays,
                    Skills: selectedSkills
                })
            });

            if(response.status !== 200) {
                setFormErrors(["Registration failed. Please try again later."]);
                throw response;
            }

            // Success
            let data = await response.json();
            if(data.token && data.token !== "") {
                sessionStorage.setItem(AUTH_TOKEN, data.token);
                sessionStorage.setItem(USER_NAME, data.name);
                sessionStorage.setItem(USER_ROLE, data.role);
                sessionStorage.setItem(USER_ID, data.id);
                setRedirect(true);
            }
        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchSkillOptions();
        if(sessionStorage.getItem(AUTH_TOKEN)) {
            setRedirect(true)
        }
    }, [])

    return (
    <>
    {redirect ? <Redirect to = {{
        pathname : '/profile/labourer',
    }} />:  null }

    <div className="splash-container-wrapper">
    <form className="splash-container" onSubmit={e => validateForm(e)}>
    <div className="card">
        <div className="card-header">
            <h3 className="mb-1">Create Labourer Account</h3>
            <p>Enter your user information.</p>
        </div>
        <div className="card-body">
            {/* Display form errors, if any */}
            { formErrors.length > 0 &&
            <div className="alert alert-danger">
            <ul className="pl-3 mb-0">
            { formErrors.map((error, i) => <li key={i}>{error}</li>) }
            </ul>
            </div>
            }
            <div className="form-group">
                <label htmlFor="firstname">First Name <span className="text-danger">*</span></label>
                <input
                    className="form-control form-control-lg"
                    name="firstname"
                    type="text"
                    placeholder="Enter first name"
                    required
                    onChange={e => onChange(e)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastname">Last Name <span className="text-danger">*</span></label>
                <input
                    className="form-control form-control-lg"
                    name="lastname"
                    type="text"
                    placeholder="Enter last name"
                    required
                    onChange={e => onChange(e)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email Address <span className="text-danger">*</span></label>
                <input
                    className="form-control form-control-lg"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    required
                    onChange={e => onChange(e)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password <span className="text-danger">*</span></label>
                <input
                    className="form-control form-control-lg"
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    required
                    onChange={e => onChange(e)}
                />
                <small className="form-text text-muted">Password should be a minimum of 8 characters and contain at least one uppercase letter, lowercase letter, number, and symbol.</small>
            </div>
            <div className="form-group">
                <label htmlFor="confirmpassword">Confirm Password <span className="text-danger">*</span></label>
                <input
                    className="form-control form-control-lg"
                    name="confirmpassword"
                    type="password"
                    placeholder="Enter password again"
                    required
                    onChange={e => onChange(e)}
                />
            </div>
            <div className="form-group">
                <label className="d-block" htmlFor="skills">Select Skills <span className="text-danger">*</span></label>
                <Select 
                    options={ skillOptions &&
                        skillOptions.map(skill => {return {value: skill.skillId, label: skill.skillName}}) 
                    } 
                    onChange={onChangeSkill} 
                    isMulti 
                />
            </div>
            <div className="form-group">
                <label className="d-block" htmlFor="availability">Select Availability <span className="text-danger">*</span></label>
                <Select 
                    options={DAYS}
                    onChange = {onChangeAvailability} 
                    isMulti 
                />
            </div>
            <div className="form-group pt-2">
                <button
                    className="btn btn-block btn-primary btn-lg"
                    type="submit"
                >
                    Create Account
                </button>
            </div>
        </div>
        <div className="card-footer bg-white">
            <p>Already have an account? <Link to="/login" className="text-primary">Login here.</Link></p>
        </div>
    </div>
    </form>
    </div>
    </>
    )
}

export default RegisterLabourer;