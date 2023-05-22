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
import Button from '@mui/material/Button';
import Table from './component/Table'
import DataTable from "../../shared/components/table/index"
import Stack from '@mui/material/Stack';

import { getDeviceAPI } from './service'

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';

const devicesCol = [
    { field: 'id', headerName: 'Id', width: 100, fieldType: 'textfield' },
    { field: 'key', headerName: 'Key', width: 200, fieldType: 'textfield' },
    { field: 'room', headerName: 'Room', width: 200, fieldType: 'textfield' },
    { field: 'type', headerName: 'Type', width: 200, fieldType: 'dropdown', fieldValues: [<KitchenIcon/>, <ChairIcon/>, <SingleBedIcon/>, <GarageIcon/>, <BusinessIcon/>] },
    { field: 'status', headerName: 'Status', width: 400, fieldType: 'textfield' },
    {
        field: 'action',
        headerName: 'Action',
        width: 300,
        sortable: false,
        disableClickEventBubbling: true,
        
        renderCell: (params) => {
            const onClick = (e) => {
              const currentRow = params.row;
              return alert(JSON.stringify(currentRow, null, 4));
            };
            
            return (
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="warning" size="small" onClick={onClick}>Edit</Button>
                <Button variant="outlined" color="error" size="small" onClick={onClick}>Delete</Button>
              </Stack>
            );
        },
      }
  ]

function DeviceManagement() {

	const navigate  = useNavigate();
	const [devices, setDevices] = React.useState([])
	
	React.useEffect(()=>{
		getDeviceAPI()
			.then((res) => {
				console.log("[users]", res);
				setDevices(res);
			})
			.catch(() => {
				setDevices([])
			})
	}, [])
	
    return (
	<React.Fragment>
		<DataTable title="Device" columns={devicesCol} rows={devices} pageSize={10}/>
	</React.Fragment>
  );
}

export default DeviceManagement;
