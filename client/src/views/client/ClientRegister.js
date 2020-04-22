import React , {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';

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

const RegisterClient = (props) => {

    useEffect(() => {
        if(sessionStorage.getItem(AUTH_TOKEN)) {
            setRedirect(true)
        }
      }, [])

    const [user, setUser] = useState({
        "email" : "",
        "password" : "",
        "role" : ""
    })
    const [client, setClient] = useState({
        "ClientName" : "",
        "ClientPhoneNumber" : "",
        "ClientCity" : "",
        "ClientState" : "",
        "ClientDescription" : ""
    })
    const [redirect, setRedirect] = useState(false)

    const{email,password,confirmpassword} = user
    const{companyname,phonenumber,city,province,companydescription} = client

    const onChange = (e) => {
        e.preventDefault()
        setUser({ ... user, [e.target.name]:e.target.value })
        setClient({ ... client, [e.target.name]:e.target.value })
    }
    const validateForm = (e) => {
        e.preventDefault();
        alert("Form submitted!");
    }

    const onSubmit= (e) => {
        e.preventDefault();
        if(password != confirmpassword) {
            console.log("Passwords do not match.")
        } else {
            const newUser = {
                email,
                password,
                "role" : "Client" 
            }

            const newClient = {
                "ClientName" : companyname,
                "ClientPhoneNumber" : phonenumber,
                "ClientCity" : city,
                "ClientState" : province,
                "ClientDescription" : companydescription
            }
            
            fetch(BASE_URL + '/RegisterClient', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body : JSON.stringify({ "User" : newUser , "Client" : newClient })
            })
            .then( response => response.json() ) 
            .then( json => {
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

    function getPrevLocation() {
        if (props.location.state === undefined) {
          return '/';
        }
        return props.location.state.prevLocation
    }
    
    return (
        <>
        {redirect ? <Redirect to = {{
        pathname : getPrevLocation(),
        state : {
            loggedIn: true
        }
        }} />:  null }
        <div style={bodyStyles}>
            <form className="splash-container" onSubmit={e => onSubmit(e)}>
                <div className="card">
                    <div className="card-header">
                        <h3 className="mb-1">Create Client Account</h3>
                        <p>Enter your user information.</p>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="companyname">Company Name <span className="text-danger">*</span></label>
                            <input
                                className="form-control form-control-lg"
                                name="companyname"
                                type="text"
                                placeholder="Enter company name"
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
                            <label htmlFor="phonenumber">Phone Number <span className="text-danger">*</span></label>
                            <input
                                className="form-control form-control-lg"
                                name="phonenumber"
                                type="text"
                                placeholder="Enter phone number"
                                required
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City <span className="text-danger">*</span></label>
                            <input
                                className="form-control form-control-lg"
                                name="city"
                                type="text"
                                placeholder="Enter city"
                                required
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="province">Province <span className="text-danger">*</span></label>
                            <input
                                className="form-control form-control-lg"
                                name="province"
                                type="text"
                                placeholder="Enter province"
                                required
                                onChange={e => onChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="companydescription">Company Description <span className="text-danger">*</span></label>
                            <textarea
                                className="form-control form-control-lg"
                                name="companydescription"
                                type="text"
                                placeholder="Enter company description"
                                required
                                onChange={e => onChange(e)}
                            />
                        </div>

                        <div className="form-group pt-2">
                            <button
                                //onClick={e => validateForm(e)}
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
        </div >
        </>
    )
}

export default RegisterClient;