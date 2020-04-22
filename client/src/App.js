import React , {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

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

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return sessionStorage.getItem("auth_token") !== null ? (
            <Comp {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            );
        }}
      />
    );
};

class App extends Component {
    
    render() {
    return (
    <>
    <Router>
    <Switch>
        <Route path='/' exact render={props => <Home {...props} />} />
        <Route path='/login' exact render={props => <Login {...props} />} />
        <Route path='/register' exact render={props => <RegisterStart {...props} />} />
        <Route path='/register/client' exact render={props => <ClientRegister {...props} />} />
        <Route path='/register/labourer' exact render={props => <LabourerRegister {...props} />} />

        {/* Shared Views */}
        <ProtectedRoute  path='/dashboard' exact component={Dashboard} />
        <ProtectedRoute  path='/incidents' exact component={Incidents} />
        <ProtectedRoute  path='/job' exact component={JobDetail} />
        <ProtectedRoute  path='/incident' exact component={IncidentDetail} />
      
        {/* Client Views */}
<<<<<<< HEAD
        <ProtectedRoute  path='/profile/client' exact component={ClientProfile} />
        <ProtectedRoute  path='/addjob' exact component={ClientAddJob} />

        {/* Labourer Views */}
        <ProtectedRoute  path='/profile/labourer' exact component={LabourerProfile} />
=======
        <Route path='/register/client' exact render={props => <ClientRegister {...props} />} />
        <Route path='/profile/client' exact render={props => <ClientProfile {...props} />} />
        <Route path='/addjob' exact render={props => <ClientAddJob {...props} />} />        

        {/* Labourer Views */}
        <Route path='/register/labourer' exact render={props => <LabourerRegister {...props} />} />
        <Route path='/profile/labourer' exact render={props => <LabourerProfile {...props} />} />
        <Route path='/labourerdashboard' exact render={props => <LabourerDashboard {...props} />} />
>>>>>>> cb7f19097ae1163cc7a8f14b2b3e7bbee5a4c947

        <Route component={PageNotFound} />
    </Switch>
    </Router>
    </>
    );
    }
}

export default App;