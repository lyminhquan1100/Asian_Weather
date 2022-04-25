import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Sidebar from "../components/admin-dashboard/sidebar";
import HeaderDashboard from '../components/admin-dashboard/header'
import Users from "../components/admin-dashboard/component/users-table";
import MainHomeAdmin from '../components/admin-dashboard/component/main'
import '../components/admin-dashboard/admin.scss';
const AdminDashboard = () => {
	return (		
		<>
			<div className="dasboard-main d-flex ">
			
				<Sidebar/>
				<div className="main-dashboard-container">
				<HeaderDashboard/>
				<Switch>
						<Route path="/dashboard" exact component={MainHomeAdmin} />
						<Route path="/dashboard/users/setting" exact component={Users} />
				</Switch>
				</div>
			
			</div>
		</>	
	);
}

export default AdminDashboard;