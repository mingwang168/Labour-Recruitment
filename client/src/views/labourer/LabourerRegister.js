import React , {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Select from 'react-select';

const bodyStyles = {
    height: '100vh',
    display: 'flex',
    msFlexAlign: 'center',
    alignItems: 'center',
    paddingTop: '40px',
    paddingBottom: '40px'
}

const BASE_URL = "http://localhost:5001/api";
const AUTH_TOKEN = "auth_token";
const USER_NAME = "user_name";
const USER_ID = "user_id";
const USER_ROLE = "user_role";


const RegisterLabourer = (props) => {
    
    const [skills, setSkills] = useState([{
        "skillId" : "",
        "skillName" : ""
    }]);
    const [user, setUser] = useState({
        "email" : "",
        "password" : "",
        "role" : ""
    })
    const [labourer, setLabourer] = useState({
         "LabourerFirstName" : "",
         "LabourerLastName" : ""
    })
    const [selectedDays, setSelectedDays] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [redirect, setRedirect] = useState(false)

    const {email, password,confirmpassword} = user
    const {fullname} = labourer
    const availability = [
        { value: 'monday', label: 'Monday' },
        { value: 'tuesday', label: 'Tuesday' },
        { value: 'wednesday', label: 'Wednesday' },
        { value: 'thursday', label: 'Thursay' },
        { value: 'friday', label: 'Friday' },
        { value: 'saturday', label: 'Saturday' },
        { value: 'sunday', label: 'Sunday' }   
    ];
    
    const fetchSkills = async() => {
        try {
            const response = await fetch(BASE_URL + '/skills');
            let data = await response.json();
            setSkills(data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchSkills()
        if(sessionStorage.getItem(AUTH_TOKEN)) {
            setRedirect(true)
        }
      }, [])

        
    const onChange = e => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
        setLabourer({ ...labourer, [e.target.name]: e.target.value })    
    }

    //Set selected skills in dropdown
    const setSkill = (skill) => {
        skill.forEach(element => {
            setSelectedSkills([ ... selectedSkills,element.value]);
        });
    }

    //Set selected days in dropdown
    const setAvailability = (day) => {
        day.forEach(element => {
            setSelectedDays([ ... selectedDays,element.value]);
        });
    }

    const validateForm = (e) => {
        e.preventDefault();
        alert("Form submitted!");
    }

    const onSubmit = e => {
        e.preventDefault();

        if(password !== confirmpassword) {
          console.log("Passwords do not match.");
        } else {
          const newUser = {
            email,
            password,
            "role" : "Labourer"
        }
        const LabourerFirstName = fullname.split(' ')[0]
        const LabourerLastName = fullname.split(' ')[1]
        const newLabourer = {
        LabourerFirstName,
        LabourerLastName
        }

        // Fetch
        fetch(BASE_URL + "/RegisterLabourer", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"User" : newUser, "Labourer" : newLabourer, "AvailableDays" : selectedDays, "Skills" : selectedSkills }),
        })
        .then(response => response.json())
        .then(json => {
            if (json.token !== "" && json.token != null) {
                sessionStorage.setItem(AUTH_TOKEN, json["token"]);
                sessionStorage.setItem(USER_NAME, json.email);
                sessionStorage.setItem(USER_ROLE, json.role);
                sessionStorage.setItem(USER_ID, json.id);
                setRedirect(true)
            }
          })
          .catch(function (error) {
            console.log("Server error. Please try again later.");
          })
        }
    }

    return (
    <>
    {redirect ? <Redirect to = {{
        pathname : '/profile/labourer',
    }} />:  null }

    <div style={bodyStyles}>
    <form className="splash-container" onSubmit={e => onSubmit(e)}>
    <div className="card">
        <div className="card-header">
            <h3 className="mb-1">Create Labourer Account</h3>
            <p>Enter your user information.</p>
        </div>
        <div className="card-body">
            <div className="form-group">
                <label htmlFor="fullname">Full Name <span className="text-danger">*</span></label>
                <input
                    className="form-control form-control-lg"
                    name="fullname"
                    type="text"
                    placeholder="Enter full name"
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
                    options={
                        skills.map((skill, i) => {
                        return { value: skill.skillId, label: skill.skillName } 
                        }) 
                    } 
                    onChange = {setSkill} 
                    isMulti 
                />
            </div>
            <div className="form-group">
                <label className="d-block" htmlFor="availability">Select Availability <span className="text-danger">*</span></label>
                <Select 
                    options={availability}
                    onChange = {setAvailability} 
                    isMulti 
                />
            </div>
            <div className="form-group pt-2">
                <button
                   // onClick={e => validateForm(e)}
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