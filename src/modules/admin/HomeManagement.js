import * as React from 'react';
import { useNavigate } from "react-router-dom";
import {
	Box,
	IconButton, Paper, Grid, Container
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
import DataTable from "../../shared/components/table/index"
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';

import { getHomesAPI } from './service'

  
const homesCol = [
    { field: 'id', headerName: 'Id', width: 100, fieldType: 'textfield' },
    { field: 'name', headerName: 'Name', width: 400, fieldType: 'textfield' },
    { field: 'rooms', headerName: 'Rooms', width: 400,
		renderCell: (params) => {
			let open = 0;
			const currentRow = params.row;
			console.log("row:", currentRow.rooms, JSON.stringify(currentRow, null, 4));
			return (
				<RoomsComp currentRow={currentRow}/>
			);
		}, fieldType: 'textfield'
	},
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



const RoomsComp = ({currentRow}) => {
	const [open, setOpen] = React.useState(0);
	console.log("OPEN:",currentRow.rooms);
	return (
		<Container maxWidth={false} variant="div" sx={{display: "flex", flexDirection: "column", height: open ? "fit-content" : 52}}>	
			<div style={{display: "flex", alignItems: 'center'}}>
				<IconButton
					aria-label="expand row"
					size="small"
					className="MuiDataGrid-cellContent"
					onClick={() => {setOpen(!open) }}
				>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>
				<Typography >{currentRow.rooms?.length + " Rooms"}</Typography>
			</div>
			
			<Collapse in={open}  unmountOnExit >
				<Box  sx={{height: 52}}>
					{
						currentRow.rooms?.map((room)=><div style={{display: "flex"}}>
							
							{{
								0: (
									<KitchenIcon sx={{fontSize: 24, color:  "#039be5" }}/>
								),
								1: (
									<ChairIcon sx={{fontSize: 24, color:  "#039be5" }}/>
								),
								2: (
									<SingleBedIcon sx={{fontSize: 24, color:  "#039be5" }}/>
								),
								3: (
									<BusinessIcon sx={{fontSize: 24, color:  "#039be5" }}/>
								),
								4: (
									<GarageIcon sx={{fontSize: 24, color:  "#039be5" }}/>
								),
								default: (
									<ChairIcon sx={{fontSize: 24, color:  "#039be5" }}/>
								)
							}[room.type]}
							<Typography sx={{paddingLeft:1}}>{room?.name}</Typography>
						</div>)
						
					}
				</Box>
			</Collapse>
		</Container>
	);
}

function HomeManagement() {
	const navigate  = useNavigate();
	const [homes, setHomes] = React.useState([])
	
	React.useEffect(()=>{
		getHomesAPI()
			.then((res) => {
				console.log("[devices]", res);
				setHomes(res);
			})
			.catch(() => {
				setHomes([])
			})
	}, [])
    return (
	<React.Fragment>
		<DataTable title="Home" columns={homesCol} rows={homes} pageSize={10}/>
	</React.Fragment>
  );
}

export default HomeManagement;
