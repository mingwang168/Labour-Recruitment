import React, {useState, useEffect} from 'react';

import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import * as Auth from '../../utils/Auth';

const BASE_URL = "http://localhost:5001/api";


const ClientProfile = (props) => {

    const [clientName, setClientName] = useState('');
    const [clientDescription, setClientDescription] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientPhoneNumber, setClientPhoneNumber] = useState('');
    const [clientCity, setClientCity] = useState('');
    const [clientState, setClientState] = useState('');
    const [clientAvgRating, setClientAvgRating] = useState(0);
    

    const fetchClientProfile = async() => {
      try{        
        let response = await fetch(BASE_URL + `/ClientProfile/${Auth.getID()}`,{
            method: "GET",
            headers: {
              "Authorization": `Bearer ${Auth.getToken()}`
            }
        });
        let data = await response.json();    
        setClientName(data.client.clientName);
        setClientDescription(data.client.clientDescription);
        setClientEmail(data.client.clientEmail);
        setClientPhoneNumber(data.client.clientPhoneNumber);
        setClientCity(data.client.clientCity);
        setClientState(data.client.clientState);
        setClientAvgRating(data.client.averageRating);      
      } catch (e) {
            console.log(e);
      }
    }

    useEffect(() => {      
        fetchClientProfile();
    }, []);


    return (
        <div className="dashboard-main-wrapper">
        <TopNav />
        <SideNav />

        <div className="dashboard-wrapper">
        <div className="container-fluid dashboard-content">

        <div className="main-content-container container-fluid px-4">
          <div className="page-header row no-gutters py-4">
            <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
              <h3 className="page-title">Client Profile</h3>
            </div>
          </div>
           <div className="row">
            <div className="col">
              <div className="mb-4 pt-3 card card-small">
                <div className="border-bottom text-center card-header">
                  <h4 className="mb-1">{clientName}</h4>
                  <span className="m-5"><i className="fas fa-star mr-2"></i>
                        {clientAvgRating && (clientAvgRating !== null) 
                            ? clientAvgRating
                            : "No" } ratings
                  </span>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="p-4 list-group-item">
                    <strong className="text-muted d-block mb-2">Description</strong>
                    <span>{clientDescription}</span>
                  </li>
                </ul>
              </div>
            </div>
            </div>
            <div className="row">
            <div className="col">
              <div className="mb-4 card card-small">
                <div className="border-bottom card-header d-flex justify-content-between">
                  <h6 className="m-0">Account Details</h6>
                  <span><i className="far fa-edit"></i></span>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="p-3 list-group-item">
                    <table>
                      <tbody>
                      <tr>
                        <td className="text-muted d-block pl-4 pr-4 pb-3"><strong className="text-muted d-block">Email:</strong></td>
                        <td className="pl-4 pr-4 pb-3">{clientEmail}</td>
                      </tr>
                      <tr>
                        <td className="text-muted d-block pl-4 pr-4 pb-3"><strong className="text-muted d-block">Telephone No:</strong></td>
                        <td className="pl-4 pr-4 pb-3">{clientPhoneNumber}</td>
                      </tr>
                      <tr>
                        <td className="pl-4 pr-4 pb-3"><strong className="text-muted d-block">Address:</strong></td>
                        <td className="pl-4 pr-4 pb-3">{clientCity},{clientState}</td>
                      </tr>
                      </tbody>
                    </table>
                  </li>
                  <li className="p-3 pb-4 list-group-item">
                    <div className="row pl-4">
                        <strong className="d-block">Rate The Company</strong>
                        <span className="pl-4 pb-3"><i className="fas fa-star mr-2"></i><i className="fas fa-star mr-2"></i><i className="fas fa-star mr-2"></i><i className="fas fa-star mr-2"></i><i className="fas fa-star mr-2"></i></span>
                    </div>
                  </li>
                </ul> 
              </div> 
            </div>
          </div>
        </div>
        </div>
        </div>
    </div>
    )
}

export default ClientProfile;