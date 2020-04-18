import React from 'react'

const Login = () => {
    return (
        <div>
            <div className="container d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>
                <div className="pt-1 bg-primary" style={{ borderRadius: "10px" }}>
                    <div className="container card bg-light px-0 py-2 mb-0" style={{ width: "25rem" }}>
                        <div className="h4 text-center mt-3 text-dark">Sign In</div>
                        <div className="py-4 px-4">
                            <form>
                                <div className="form-group">
                                    <label for="email">Email / Username</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailid"></input>
                                </div>
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" className="form-control" id="password"></input>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;