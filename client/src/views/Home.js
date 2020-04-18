import React from 'react';

import hero from  '../assets/images/jobsite.jpg';

const Home = (props) => {

    const heroStyles = {
        position: 'relative',
        minHeight: '95vh',
        backgroundImage: `url(${hero})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }

    return (
    <>
    {/* Navbar */}
    <header className="pt-2 pb-3" style={{background:'#111111'}}>
    <div className="container">
    <div className="row align-items-center">
        <div className="col-6 col-xl-2">
            <h1 className="mb-0"><a href="/" className="text-white h4 mb-0">Jobstart</a></h1>
        </div>
      
        <div className="col-6 col-xl-10 text-right pt-1">
            <a href="/dashboard" className="text-white mr-3">Client Dashboard</a>
            <a href="/register" className="text-white mr-3">Sign Up</a>
            <a href="/login" style={{textDecoration:'none'}}>
                <span className="rounded bg-primary py-2 px-3 text-white">Login</span>
            </a>
        </div>
    </div>
    </div>
    </header>

    {/* Main */}
    <div style={heroStyles}>
    <div className="container" style={{zIndex:'99999'}}>
    <div className="hero-text-container row d-flex flex-column justify-content-center" style={{height:'95vh'}} >
        <h1 className="display-4 hero-text text-white">Find the <strong>talent</strong> you <br />need to succeed</h1>
        <a href="/register" className="btn btn-primary p-3 text-white mt-3" style={{fontSize:'0.9rem',width:'150px'}}>Start now</a>
    </div>
    </div>
    </div>
    </>
    )
}

export default Home;