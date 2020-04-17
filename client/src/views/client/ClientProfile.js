import React from 'react';

import SideNav from '../../components/SideNav';
import TopNav from '../../components/TopNav';

const ClientProfile = (props) => {
    return (
    <div className="container-fluid">
    <div className="row">
      {/* Side Navigation */}
      <SideNav {...props} />

      {/* Main */}
      <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
        {/* Top Navigation */}
        <TopNav {...props} />

        {/* Content */}
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
                  <h4 className="mb-1">Sierra Brooks</h4>
                  <span className="m-5"><i class="fas fa-star mr-2"></i>4.91 (18 ratings)</span>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="p-4 list-group-item">
                    <strong className="text-muted d-block mb-2">Description</strong>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque</span>
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
                      <tr>
                        <td className="text-muted d-block pl-4 pr-4 pb-3"><strong className="text-muted d-block">Email:</strong></td>
                        <td className="pl-4 pr-4 pb-3">info@construction.ca</td>
                      </tr>
                      <tr>
                        <td className="text-muted d-block pl-4 pr-4 pb-3"><strong className="text-muted d-block">Telephone No.:</strong></td>
                        <td className="pl-4 pr-4 pb-3">(604)778-8888</td>
                      </tr>
                      <tr>
                        <td className="pl-4 pr-4 pb-3"><strong className="text-muted d-block">Address:</strong></td>
                        <td className="pl-4 pr-4 pb-3">1234 Burrad Street, Vancouver BC</td>
                      </tr>
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
      </main>
    </div>
    </div>

  )
}

export default ClientProfile;