import React from 'react'


const RegisterStart = (props) => {

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center " style={{ height: "100vh" }}>

                <div className="pt-1 bg-primary" style={{borderRadius: "10px"}}>

                <div className="container card bg-light px-0 py-2" style={{ width: "25rem"}}>
                    <div className="h4 text-center mt-3">Select Account Type</div>
                    <div className="row align-items-center mb-2">
                        <div className="col-sm-3 col-md-2 my-3"></div>
                        <div className="col-sm-6 col-md-8" >
                            <div style={{ maxWidth: "20rem" }} className="mx-auto">
                                <button type="button" className="btn btn-sm btn-block rounded-0 my-2 bg-light border border-secondary">
                                    <a href="#" className="text-dark">
                                        <span style={{ fontSize: ".9rem" , lineHeight: "1.5rem" }}>
                                            <i className="far fa-building"></i>
                                     I want to hire workers
                                         </span>
                                    </a>
                                </button>
                            </div>
                            <div style={{ maxWidth: "20rem" }} className="mx-auto">
                                <button type="button" className="btn btn-sm btn-block rounded-0 my-2 bg-light border border-secondary">
                                    <a href="#" className="text-dark">
                                        <span style={{ fontSize: ".9rem" , lineHeight: "1.5rem"}}>
                                            <i class="far fa-user-circle"></i>
                                    I want to find work
                                     </span>
                                    </a>
                                </button>
                            </div>
                        </div>
                        <div className="col-sm-3 col-md-2 my-3"></div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default RegisterStart;