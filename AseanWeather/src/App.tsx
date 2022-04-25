import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MainRoute from "./routes/MainRoute";
import AdminDashboard from "./pages/AdminDashboard";
import LoginAdmin from "./pages/LoginAdmin";

interface IProps { }
interface IState { }

class App extends Component<IProps, IState> {
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/sign-in' exact component={LoginAdmin} /> 
					<Route path="/dashboard" render={() => <AdminDashboard />} />
					<Route path="/" render={() => <MainRoute />} />
				</Switch>
			</Router>
		);
	}
}

export default App;