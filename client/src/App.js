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
                  state: {
                    prevLocation: path,
                    error: "You need to login first!",
                  },
                }}
              />
            );
        }}
      />
    );
};

class App extends Component {
    // state = {
    //     loggedIn: false
    // }
    // handleLogin = () => {
    //     const { state = {} } = this.props.location;
    //     const { prevLocation } = state;
    //     console.log(state)
    //     this.setState(
    //       {
    //         loggedIn: true,
    //       },
    //       () => {
    //         this.props.history.push(prevLocation);
    //       },
    //     );
    // };

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
        <ProtectedRoute  path='/profile/client' exact component={ClientProfile} />
        <ProtectedRoute  path='/addjob' exact component={ClientAddJob} />

        {/* Labourer Views */}
        <ProtectedRoute  path='/profile/labourer' exact component={LabourerProfile} />

        <Route component={PageNotFound} />
    </Switch>
    </Router>
    </>
    );
    }
}

export default App;