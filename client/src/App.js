import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './views/Home';
import Login from './views/Login';
import RegisterStart from './views/RegisterStart';
import PageNotFound from './views/PageNotFound';

// Shared Components
import Dashboard from './views/Dashboard';
import Incidents from './views/Indicents';
import JobDetail from './views/JobDetail';
import IncidentDetail from './views/IncidentDetail';

// Client Components
import ClientRegister from './views/client/ClientRegister';
import ClientProfile from './views/client/ClientProfile';
import ClientAddJob from './views/client/ClientAddJob';

// Labourer Components
import LabourerRegister from './views/labourer/LabourerRegister';
import LabourerProfile from './views/labourer/LabourerProfile';
import LabourerDashboard from './views/labourer/LabourerDashboard';

const App = () => {
    return (
    <>
    <Router>
    <Switch>
        <Route path='/' exact render={props => <Home {...props} />} />
        <Route path='/login' exact render={props => <Login {...props} />} />
        <Route path='/register' exact render={props => <RegisterStart {...props} />} />

        {/* Shared Views */}
        <Route path='/dashboard' exact render={props => <Dashboard {...props} />} />
        <Route path='/incidents' exact render={props => <Incidents {...props} />} />
        <Route path='/job' exact render={props => <JobDetail {...props} />} />
        <Route path='/incident' exact render={props => <IncidentDetail {...props} />} />
      
        {/* Client Views */}
        <Route path='/register/client' exact render={props => <ClientRegister {...props} />} />
        <Route path='/profile/client' exact render={props => <ClientProfile {...props} />} />
        <Route path='/addjob' exact render={props => <ClientAddJob {...props} />} />        

        {/* Labourer Views */}
        <Route path='/register/labourer' exact render={props => <LabourerRegister {...props} />} />
        <Route path='/profile/labourer' exact render={props => <LabourerProfile {...props} />} />
        <Route path='/labourerdashboard' exact render={props => <LabourerDashboard {...props} />} />

        <Route component={PageNotFound} />
    </Switch>
    </Router>
    </>
    );
}

export default App;