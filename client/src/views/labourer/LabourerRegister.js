import React , {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const bodyStyles = {
    height: '100vh',
    display: 'flex',
    msFlexAlign: 'center',
    alignItems: 'center',
    paddingTop: '40px',
    paddingBottom: '40px'
}

const BASE_URL = "http://localhost:5000/api";
//const AUTH_TOKEN = "auth_token";
//const USER_NAME = "user_name";
//const USER_ID = "user_id";


const RegisterLabourer = () => {
    const [skill, setSkill] = useState([{
    }])
    const [user, setUser] = useState({
        "email" : "",
        "password" : "",
        "role" : ""
    })
    const [labourer, setLabourer] = useState({
         "LabourerFirstName" : "",
         "LabourerLastName" : ""
    })
    const [availability, setAvailability] = useState([])

    const {email, password,confirmpassword} = user
    const {fullname} = labourer

    
    
    useEffect(() => {
        fetchSkills()
      
      }, [])

    const fetchSkills = async() => {
        try {
            const response = await fetch(BASE_URL + '/skills', {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                }
            })

            // Unable to fetch skills
            if(!response.ok || response.status === 500) {
                console.log("Unable to retrieve recipe.");
            }

            //fetch successfull
            let data = await response.json();
            //console.log(data[0].skillName)
            setSkill(data)
          
        }  catch(e) {
            console.error(e);
        }
    }
    
    const onChange = e => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
        setLabourer({ ...labourer, [e.target.name]: e.target.value })    
        setAvailability([ ...availability, e.target.value ])
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
            body: JSON.stringify({"User" : newUser, "Labourer" : newLabourer})
          })
          .then(response => response.json())
          .then(json => {
            
            console.log(json)
          })
          .catch(function (error) {
            console.log("Server error. Please try again later.");
          })
        }
    }

    return (
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
                <select
                    className="selectpicker"
                    data-dropup-auto="false"
                    data-width="100%"
                    name="skills"
                    multiple
                    onChange={e => onChange(e)}
                >
                    <option value="carpentry">Carpentry</option>
                    <option value="painting">Painting</option>
                    <option value="drywall">Drywall</option>
                    <option value="electrical">Electrical</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="framing">Framing</option>
                    <option value="roofing">Roofing</option>
                    <option value="demolition">Demolition</option>
                </select>
            </div>
            <div className="form-group">
                <label className="d-block" htmlFor="availability">Select Availability <span className="text-danger">*</span></label>
                <select
                    className="selectpicker"
                    data-dropup-auto="false"
                    data-width="100%"
                    name="availability"
                    multiple
                    onChange={e => onChange(e)}
                >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                </select>
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
    )
}

export default RegisterLabourer;