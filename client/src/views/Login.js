import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom';
import * as FormValidator from '../utils/FormValidator';
import * as Auth from '../utils/Auth';

const BASE_URL = "http://localhost:5001/api";
const AUTH_TOKEN = "auth_token";
const USER_NAME = "user_name";
const USER_EMAIL = "user_email";
const USER_ID = "user_id";
const USER_ROLE = "user_role";

const Login = () => {
    
    useEffect(() => {
        setRedirect(Auth.authenticateUser());
    }, [])

    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [formErrors, setFormErrors] = useState([]);
    const { email, password } = user;

    const onChange = (e) => {
        e.preventDefault();
        setUser({ ... user, [e.target.name]:e.target.value })
    }

    const validateForm = e => {
        e.preventDefault();
        let errors = [];

        if(!FormValidator.email(email)) {
            errors.push("Invalid email entered.")
        }

        if(errors.length) {
            setFormErrors(errors);
        } else {
            submitForm();
        }
    }
    
    const submitForm = async() => {
        let loginData = { email, password };
        
        try {
            const response = await fetch(BASE_URL + '/login', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })

            // Bad response
            if(response.status !== 200) {
                setFormErrors(["Login failed. Please try again later."]);
                throw response;
            }

            // Success
            let data = await response.json();
            if(data.token && data.token !== "") {
                sessionStorage.setItem(AUTH_TOKEN, data.token);
                sessionStorage.setItem(USER_NAME, data.name);
                sessionStorage.setItem(USER_EMAIL, data.email);
                sessionStorage.setItem(USER_ROLE, data.role);
                sessionStorage.setItem(USER_ID, data.id);
                setRedirect(true);
            }
        } catch(e) {
            console.error(e);
        }
    }

    const getRedirectLocation = _ => {
        // Client redirect
        if(sessionStorage.getItem(USER_ROLE) === 'Client') {
            return <Redirect to={{pathname:'/dashboard'}} />;
        // Labourer redirect
        } else if(sessionStorage.getItem(USER_ROLE) === 'Labourer') {
            return <Redirect to={{pathname:'/profile/labourer'}} />;
        // Admin redirect
        } else if(sessionStorage.getItem(USER_ROLE) === 'Admin') {
            return <Redirect to={{pathname:'/incidents'}} />;
        } else {
            sessionStorage.clear();
            return <Redirect to={{pathname:'/'}} />;
        }
    }

    return (
        <>
        { redirect ? getRedirectLocation() : null }
        <div className="splash-container-wrapper">
        <div className="splash-container">
        <div className="card">
        <div className="card-header">
            <h3 className="mb-1">Login</h3>
            <p>Don't have an account yet? Create one <Link to="/register" className="text-primary">here.</Link></p>
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

        <form onSubmit={validateForm}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    required
                    type="email"
                    name="email"
                    className="form-control form-control-lg"
                    onChange = {e => onChange(e)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    required
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    onChange = {e => onChange(e)}
                />
            </div>
            <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
            >
                Login
            </button>
        </form>
        </div>
        </div>
        </div>
        </div>
        </>
    )
}


export default Login;