import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './views/Home';
import RegisterStart from './views/RegisterStart';
import PageNotFound from './views/PageNotFound';
import Dashboard from './views/Dashboard';

import RegisterClient from './views/client/RegisterClient';
import AddJob from './views/client/AddJob';
import ClientProfile from './views/client/ClientProfile';
import RegisterLabourer from './views/labourer/RegisterLabourer';
import LabourerProfile from './views/labourer/LabourerProfile';



const App = () => {
    return (
    <>
    <Router>
    <Switch>
        <Route path='/' exact render={props => <Home {...props} />} />
        <Route path='/dashboard' exact render={props => <Dashboard {...props} />} />
        <Route path='/register' exact render={props => <RegisterStart {...props} />} />

      
        {/* Client Views */}
        <Route path='/register/client' exact render={props => <RegisterClient {...props} />} />
        <Route path='/addjob' exact render={props => <AddJob {...props} />} />
        <Route path='/profile/client' exact render={props => <ClientProfile {...props} />} />

        {/* Labourer Views */}
        <Route path='/register/labourer' exact render={props => <RegisterLabourer {...props} />} />
        <Route path='/profile/labourer' exact render={props => <LabourerProfile {...props} />} />

        <Route component={PageNotFound} />
    </Switch>
    </Router>
    </>
    );
}

export default App;