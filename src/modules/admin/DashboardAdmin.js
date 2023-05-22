import * as React from 'react';
import { useNavigate } from "react-router-dom";
import {
	Box,
	IconButton, Paper, Grid
} from "@mui/material"
import Header from "../user/component/header"


import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { getAdminSummary } from './service'
import { useSelector, useDispatch } from 'react-redux'

function DashboardAdmin() {
	const navigate  = useNavigate();
	const dispatch = useDispatch()

    const summaryData = useSelector(state => state.adminData.summaryData)
    const summaryFetch = useSelector(state => state.adminData.isPending)
		console.log("[summaryFetch]", summaryFetch);

	React.useEffect(()=>{
		dispatch(getAdminSummary())
	}, [])
	
    return (
	<React.Fragment>
		<Grid container spacing={2}>
			{
				summaryFetch == true ? <>
					"Loading"
				</>
				: <>
					<Grid item xs={4}>
						<Paper sx={{ height: 100, background: "#ff646c", color: "white", display: "flex"}}>
							<OtherHousesIcon sx={{fontSize: 60, margin: "20px!important"}}/>
							<Typography sx={{width: "auto", marginBlock: "auto"}}>Home List {summaryData?.home_list}</Typography>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper sx={{ height: 100, background: "#59cf5d", color: "white", display: "flex"}}>
							<DeviceHubIcon sx={{fontSize: 60, margin: "20px!important"}}/>
							<Typography sx={{width: "auto", marginBlock: "auto"}}>Device List {summaryData?.device_list}</Typography>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper sx={{ height: 100, background: "#1e62f1", color: "white", display: "flex" }}>
							<RecentActorsIcon sx={{fontSize: 60, margin: "20px!important"}}/>
							<Typography sx={{width: "auto", marginBlock: "auto"}}>User List {summaryData?.user_list}</Typography>
						</Paper>
					</Grid>
				</>
			}
		</Grid>

	</React.Fragment>
  );
}

export default DashboardAdmin;
