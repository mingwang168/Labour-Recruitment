import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';

const BASE_URL = "http://localhost:5001/api";
const AUTH_TOKEN = "auth_token";
const USER_NAME = "user_name";
const USER_ID = "user_id";
const USER_ROLE = "user_role";

const Login = () => {
    useEffect(() => {
        if(sessionStorage.getItem(AUTH_TOKEN)) {
            setRedirect(true)
        }
      }, [])

    const [redirect, setRedirect] = useState(false)
    const [user, setUser] = useState({
        "email" : "",
        "password" : ""
    })
    const {email, password} = user

    const onChange = (e) => {
        e.preventDefault();
        setUser({ ... user, [e.target.name]:e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        let newUser = {
            email,
            password
        }
       
        fetch(BASE_URL + '/login', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
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
    } 

    function getLocation() {
        if (sessionStorage.getItem(USER_ROLE) === 'Client') {
            return <Redirect to = {{
                pathname : '/dashboard',
                
            }} />
        } else if (sessionStorage.getItem(USER_ROLE) === 'Labourer') {
            return <Redirect to = {{
                pathname : '/addjob',
                
            }} />
        }
    }

    return (
        <>
        { redirect ? getLocation() : null }
        <div>
            <div className="container d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>
                <div className="pt-1 bg-primary" style={{ borderRadius: "10px" }}>
                    <div className="container card bg-light px-0 py-2 mb-0" style={{ width: "25rem" }}>
                        <div className="h4 text-center mt-3 text-dark">Sign In</div>
                        <div className="py-4 px-4">
                            <form onSubmit = {e => onSubmit(e)}>
                                <div className="form-group">
                                    <label htmlFor="email">Email / Username</label>
                                    <input type="email" 
                                           className="form-control" 
                                           name="email" 
                                           aria-describedby="emailid"
                                           onChange = {e => onChange(e)}></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" 
                                           className="form-control" 
                                           name="password"
                                           onChange = {e => onChange(e)}></input>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


export default Login;