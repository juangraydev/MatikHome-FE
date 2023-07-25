import * as React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import {
	Box,
	IconButton, Paper, Grid, Tab, Tabs
} from "@mui/material"
import Header from "../user/component/header"


import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Route, Routes } from "react-router-dom";


import Dashboard from './module/Dashboard';
import UserManagement from './module/UserManagement';
import HomeManagement from './module/HomeManagement';
import DeviceManagement from './module/DeviceManagement';

const AdminModule = ({module}) => {
	switch (module) {
		case 0:
			return <Dashboard/>

		case 1:
			return <UserManagement/>
			break;

		case 2:
			return <HomeManagement/>

		case 3:
			return <DeviceManagement/>
	
		default:
			return <Dashboard/>
	}
}

export default function AdminDashboard() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
	  setValue(newValue);
	};
	
    return (
	<React.Fragment>
		<Box component="main" sx={{ flexGrow: 1, }}>
			<Container maxWidth={"xl"}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
						<Tab 
							label="Summary"
						/>
						<Tab 
							label="User Management"
						/>
						<Tab 
							label="Home Management"
						/>
						<Tab 
							label="Device Management"
						/>
					</Tabs>
				</Box>
				<Box
					component={'div'}
					sx={{
						mt: 2
					}}
				>
					<AdminModule module={value} />
				</Box>
			</Container>
		</Box>

	</React.Fragment>
  );
}
