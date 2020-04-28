import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import * as Auth from "./utils/Auth";

import Home from "./views/Home";
import Login from "./views/Login";
import RegisterStart from "./views/RegisterStart";
import PageNotFound from "./views/PageNotFound";

import Dashboard from "./views/Dashboard";
import Incidents from "./views/Indicents";
import JobDetail from "./views/JobDetail";
import IncidentDetail from "./views/IncidentDetail";
import ClientRegister from "./views/client/ClientRegister";
import ClientProfile from "./views/client/ClientProfile";
import ClientAddJob from "./views/client/ClientAddJob";
import ClientUpdateJobDetails from "./views/client/ClientUpdateJobDetails";
import ClientAddIncident from "./views/client/ClientAddIncident";
import LabourerRegister from "./views/labourer/LabourerRegister";
import LabourerProfile from "./views/labourer/LabourerProfile";
import LabourerDashboard from "./views/labourer/LabourerDashboard";

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
	return (
		<Route
			path={path}
			{...rest}
			render={(props) => {
				return Auth.authenticateUser() ? (
					<Comp {...props} />
				) : (
					<Redirect to={{ pathname: "/login" }} />
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
		{/* Public Views */}
		<Route exact path="/" render={(props) => <Home {...props} />} />
		<Route exact path='/login' render={props => <Login {...props} />} />
		<Route exact path='/register' render={props => <RegisterStart {...props} />} />
		<Route exact path='/register/client' render={props => <ClientRegister {...props} />} />
        <Route exact path='/register/labourer' render={props => <LabourerRegister {...props} />} />

		{/* Private Views */}
		<ProtectedRoute exact path='/dashboard' component={Dashboard} />
        <ProtectedRoute exact path='/incidents' component={Incidents} />
        <ProtectedRoute exact path='/job/:id' component={JobDetail} />
        <ProtectedRoute exact path='/incident/:id' component={IncidentDetail} />

		{/* Client Only Views */}
		<ProtectedRoute exact path='/profile/client' component={ClientProfile} />
        <ProtectedRoute exact path='/addjob' component={ClientAddJob} />
		<ProtectedRoute exact path='/editjob/:id' act component={ClientUpdateJobDetails} />
        <ProtectedRoute exact path='/addincident' act component={ClientAddIncident} />

		{/* Labourer Views */}
        <ProtectedRoute exact path='/profile/labourer' component={LabourerProfile} />

		<Route component={PageNotFound} />
	</Switch>
	</Router>
	</>
	);
	}
}

export default App;
