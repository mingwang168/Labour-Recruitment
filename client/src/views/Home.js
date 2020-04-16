import React from 'react';
import '../css/Home.css';


const Home = (props) => {
    console.log(props)
    return (
        
        <div className="site-wrap">
               
               <div className="site-mobile-menu">
                   <div className="site-mobile-menu-header">
                       <div className="site-mobile-menu-close mt-3">
                           <span className="icon-close2 js-menu-toggle"></span>
                       </div>
                   </div>
                   <div className="site-mobile-menu-body"></div>
               </div>


               <header className="site-navbar py-1" role="banner" >
                   <div className="container">
                       <div className="row align-items-center">
                           <div className="col-6 col-xl-2">
                               <h1 className="mb-0 text-black h3 mb-0">App<strong>Name</strong></h1>
                           </div>

                           <div className="col-10 col-xl-10 d-none d-xl-block">
                               <nav className="site-navigation text-right" role="navigation">
                                   <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block">
                                       <li className="active"><a href="/dashboard">Client dashboard</a></li>
                                       <li className="active"><a href="#">Login</a></li>
                                       <li><a href="#"><span className="rounded bg-primary py-2 px-3 text-white">Apply Now</span></a></li>
                                   </ul>
                               </nav>
                           </div>

                           <div className="col-6 col-xl-2 text-right d-block">
                               <div className="d-inline-block d-xl-none ml-md-0 mr-auto py-3" style={{ position: "relative", top: "3px" }}><a href="#" className="site-menu-toggle js-menu-toggle text-black"><span className="icon-menu h3"></span></a></div>
                           </div>
                       </div>
                   </div>
               </header>
           


           <div className="site-blocks-cover" data-aos="fade" data-stellar-background-ratio="0.5">
               <div className="container">
                   <div className="row row-custom align-items-center">
                       <div className="col-md-10">
                           <h1 className="mb-2 text-black w-75"><span className="font-weight-bold">Largest Job</span> Site On The Net</h1>
                           <div className="job-search">
                               <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" style={{width:"270px"}}>
                                   <li className="nav-item">
                                       <a className="nav-link active py-3" id="pills-job-tab" data-toggle="pill" href="#pills-job" role="tab" aria-controls="pills-job" aria-selected="true">Find A Job</a>
                                   </li>
                                   <li className="nav-item">
                                       <a className="nav-link py-3" id="pills-candidate-tab" data-toggle="pill" href="#pills-candidate" role="tab" aria-controls="pills-candidate" aria-selected="true">Find A Candidate</a>
                                   </li>
                               </ul>

                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    
    )
}

export default Home;