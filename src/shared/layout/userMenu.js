import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {
	Box,
	List,
    ListItem,
    ListItemButton,
    Typography,
    Menu,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Divider
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import HomeIcon from '@mui/icons-material/Home';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';

import { 
    selectHome,
    selectRoom
} from '.././../modules/user/dashboard/store/actionCreators'

import AddHome from '../components/addComponents/AddHome'

export default function UserLayout () {
	const dispatch = useDispatch()
    const [anchorElHome, setAnchorElHome] = React.useState(null);
    const [openAddHome, setOpenAddHome] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openHome, setOpenHome] = React.useState(false);
    const [openDevice, setOpenDevice] = React.useState(false);
    
    const selectedHome = useSelector(state => state.homeData.selectedHome)
    const selectedRoom = useSelector(state => state.homeData.selectedRoom)
    const homes = useSelector(state => state.homeData.data)

    const handleOpenHomeSetting = () => {
        setOpenHome(true)
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSelectedHome = (home) => {
        handleCloseHomeMenu()
        dispatch(selectHome(home))
        dispatch(selectRoom("ALL"))
    }

    const handleSelectRoom = (id) => {
        dispatch(selectRoom(id)) 
        handleDrawerToggle()
    }

    const handleOpenHomeMenu = (event) => {
		setAnchorElHome(event.currentTarget);
	};
	
	const handleCloseHomeMenu = () => {
		setAnchorElHome(null);
	};

    const handleOpenAddHome = () => {
        setOpenAddHome(true)
        handleCloseHomeMenu()
    }

    const handleCloseAddHome = () => {
        setOpenAddHome()
    }

    const handleOpenDeviceSetting = () => setOpenDevice(true);

    console.log("[status]:", openAddHome);
    return (
        <React.Fragment>
            {openAddHome && <AddHome open={true} type="add" handleClose={handleCloseAddHome}/>}



            {/* Home Dropdown */}
            <List>
                <ListItem 
                    key={'home'} 
                    disablePadding 
                    onClick={handleOpenHomeMenu}
                    aria-label="menu of home"
                    aria-controls="menu-home"
                    aria-haspopup="true"
                >
                    <ListItemButton sx={{paddingInline: 0}}>
                        <Box component="div" sx={{ color: '#fff', width: '-webkit-fill-available',  display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Typography variant="h5" sx={{paddingInline: 2, fontWeight: 600}}>{  selectedHome?.name.charAt(0).toUpperCase() + selectedHome?.name.slice(1) }</Typography>
                            <ExpandMoreIcon sx={{marginInline: 2}}/>
                        </Box>
                    </ListItemButton>
                </ListItem>
                <Menu
                    key={"home_list_menu"}
                    sx={{ mt: '45px'}}
                    PaperProps={{  
                            style: {  
                                width: 200,  
                            },  
                        }} 
                    id="menu-home"
                    anchorEl={anchorElHome}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElHome)}
                    onClose={handleCloseHomeMenu}
                    >
                    <MenuItem key={'add_home'} onClick={handleOpenAddHome}>
                        <Typography textAlign="center">{'Add Home'}</Typography>
                    </MenuItem>
                    {
                        homes?.map((home,idx) => (
                            <MenuItem key={idx} onClick={()=>{handleSelectedHome(home)}}>
                                <Typography sx={{color: selectedHome?.name === home?.name ? "#039be5" : "inherit"}} textAlign="center">{home?.name}</Typography>
                            </MenuItem>
                        ))
                    }
                </Menu>
                <ListItem key={'home_control_panel'} disablePadding onClick={()=>handleSelectRoom("ALL")}>
                    <ListItemButton>
                        <ListItemIcon sx={{minWidth: '35px', color: "#039be5"}}>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home'} sx={{color: (selectedRoom === "ALL"  ? "#039be5" : "#fff")}}/>
                    </ListItemButton>
                </ListItem>
                <ListItem key={'home_settings'} disablePadding onClick={handleOpenHomeSetting}>
                    <ListItemButton sx={{color: '#fff'}}>
                        <ListItemIcon sx={{minWidth: '35px', color: 'inherit'}}>
                            <ViewQuiltIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Home Settings'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'device_settings'} disablePadding onClick={handleOpenDeviceSetting}>
                    <ListItemButton sx={{color: '#fff'}}>
                        <ListItemIcon sx={{minWidth: '35px', color: 'inherit'}}>
                            <DevicesOtherIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Device Settings'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <Typography sx={{color: '#fff', fontSize: '16px', paddingInline: 2, marginTop: 2, fontWeight: 600}}>{'Rooms'}</Typography>
            <List sx={{maxHeight: 'calc(48px * 5)', overflow: 'auto'}}>
                {selectedHome?.rooms.map((room, index) => (
                <ListItem key={room?.name} disablePadding onClick={()=>handleSelectRoom(room?.id)}>
                    <ListItemButton>
                        <ListItemIcon sx={{minWidth: '35px'}}>
                            {{
                                0: (
                                    <KitchenIcon sx={{color: "#039be5"}}/>
                                ),
                                1: (
                                    <ChairIcon sx={{color: "#039be5"}}/>
                                ),
                                2: (
                                    <SingleBedIcon sx={{color: "#039be5"}}/>
                                ),
                                3: (
                                    <BusinessIcon sx={{color: "#039be5"}}/>
                                ),
                                4: (
                                    <GarageIcon sx={{color: "#039be5"}}/>
                                ),
                                default: (
                                    <ChairIcon sx={{color: "#039be5"}}/>
                                )
                            }[room.type]}
                        </ListItemIcon>
                        <ListItemText primary={  room?.name.charAt(0).toUpperCase() + room?.name.slice(1) } sx={{color: (selectedRoom == room?.id  ? "#039be5" : "rgba(0, 0, 0, 0.87)")}}/>
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
	    </React.Fragment>
    );
}