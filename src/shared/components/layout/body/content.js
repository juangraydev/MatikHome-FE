import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode"

import {
	Box,
	IconButton
} from "@mui/material"
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
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useSelector, useDispatch } from 'react-redux'
import {
	Link,
	Paper,
	TextField,
    Modal,
	Button,
    Stack,
    Snackbar,
    InputAdornment,
    Container
} from "@mui/material"
import PeopleIcon from '@mui/icons-material/People';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAlert from '@mui/material/Alert';

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';

import {resetUserData} from "../../../../modules/auth/store/actionCreators"
import {resetHomeData} from "../../../../modules/user/dashboard/store/actionCreators"

import { hideMessage } from '../../../../router/store/actionCreators'

import { 
    selectHome,
    selectRoom
} from '.././../../../modules/user/dashboard/store/actionCreators'

import HomeSetting  from '../../homeSetting';
import DeviceSetting from '../../deviceSetting';

import AddHome  from '../../addComponents/AddHome';

const settings = ['Account Setting', 'Logout'];

const drawerWidth = 240;

function Content (props) {
    const location = useLocation();
    const navigate  = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElHome, setAnchorElHome] = React.useState(null);
    const [anchorElResponse, setAnchorElResponse] = React.useState(null);

    const [openHome, setOpenHome] = React.useState(false);
    const [openDevice, setOpenDevice] = React.useState(false);
    
    const [openAddHome, setOpenAddHome] = React.useState(false);
    
    const alertOpen = useSelector(state => state.alertMessage.open)
	const alertType = useSelector(state => state.alertMessage.type)
	const alertMessage = useSelector(state => state.alertMessage.message)

    const selectedHome = useSelector(state => state.homeData.selectedHome)
    const selectedRoom = useSelector(state => state.homeData.selectedRoom)
    const homes = useSelector(state => state.homeData.data)

    const UserData = useSelector(state => state.UserData.data)
	const dispatch = useDispatch()

    const handleClose = (e, reason) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(hideMessage())
	}

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

    const handleOpenHomeMenu = (event) => {
		setAnchorElHome(event.currentTarget);
	};
	
	const handleCloseHomeMenu = () => {
		setAnchorElHome(null);
	};
	
	const handleSelectUserMenu = (value) => {
		handleCloseUserMenu()
		if(value == "Logout"){
            dispatch(resetUserData());
            dispatch(resetHomeData());
            localStorage.clear()
            navigate("/")
		}
	}
    
    React.useEffect(()=>{
        if(UserData?.token){
            var decoded = jwt_decode(UserData?.token);
            if(decoded?.role == 1){
                navigate("/admin");
            }else{
                navigate("/dashboard");
            }
        }else {
            if(location.pathname == "/admin" || location.pathname == "/dashboard")  navigate("/")
        }
    }, [UserData ])

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

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

    const handleOpenHomeSetting = () => {
        setOpenHome(true)
    }

    const handleCloseHomeSetting = () => {
        setOpenHome(false)
    }

    const handleOpenAddHome = () => {
        setOpenAddHome(true)
        handleCloseHomeMenu()
    }

    const handleCloseAddHome = () => {
        setOpenAddHome(false)
    }

    const handleOpenDeviceSetting = () => setOpenDevice(true);
    const handleCloseDeviceSetting = () => setOpenDevice(false);

    const drawer = (
        <div key={"drawer"}>
        <Toolbar sx={{background: "#00062A"}}>
            <img 
                src={require("../../../images/matik_upper_2.png")} 
                width={200} 
                style={{ display: "block" } }
            />
        </Toolbar>
        <Divider />
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
                    <Box component="div" sx={{width: '-webkit-fill-available',  display: "flex", justifyContent: "space-between", alignItems: "center"}}>
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
                            <Typography sx={{color: selectedHome?.name == home?.name ? "#039be5" : "inherit"}} textAlign="center">{home?.name}</Typography>
                        </MenuItem>
                    ))
                }
            </Menu>
            <ListItem key={'home_control_panel'} disablePadding onClick={()=>handleSelectRoom("ALL")}>
                <ListItemButton>
                    <ListItemIcon sx={{minWidth: '35px', color: "#039be5"}}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Home'} sx={{color: (selectedRoom == "ALL"  ? "#039be5" : "rgba(0, 0, 0, 0.87)")}}/>
                </ListItemButton>
            </ListItem>
            <ListItem key={'home_settings'} disablePadding onClick={handleOpenHomeSetting}>
                <ListItemButton>
                    <ListItemIcon sx={{minWidth: '35px', color: "#039be5"}}>
                        <ViewQuiltIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Home Settings'} />
                </ListItemButton>
            </ListItem>
            <ListItem key={'device_settings'} disablePadding onClick={handleOpenDeviceSetting}>
                <ListItemButton>
                    <ListItemIcon sx={{minWidth: '35px', color: "#039be5"}}>
                        <DevicesOtherIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Device Settings'} />
                </ListItemButton>
            </ListItem>
        </List>
        {/* <Divider /> */}
        <Typography sx={{fontSize: '16px', paddingInline: 2, marginTop: 2, fontWeight: 600}}>{'Rooms'}</Typography>
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
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <React.Fragment>
            <HomeSetting
                key={"home_setting"}
                open={openHome}
                handleClose={handleCloseHomeSetting}
            />
            <DeviceSetting
                key={"device_setting"}
                open={openDevice}
                handleClose={handleCloseDeviceSetting}
            /> 
            <AddHome
                key={"add_home"}
                open={openAddHome}
                handleClose={handleCloseAddHome}
                type={"add"}
                data={null}
            /> 
            <Snackbar
                sx={{marginTop: 6}}
				open={alertOpen}
				onClose={handleClose}
				autoHideDuration={3000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
                <MuiAlert elevation={6} variant='filled' onClose={handleClose} severity={alertType}>
					<div style={{ whiteSpace: 'pre' }}>{alertMessage}</div>
                </MuiAlert>
			</Snackbar>
            <Box  sx={{ display: 'fixed' }} >
                <CssBaseline />
                { (location.pathname != "/login" && location.pathname != "/register") && 
                    (
                        <AppBar
                            position="fixed"
                            sx={{
                                backgroundColor: "#00062A",
                                width: { sm: `calc(100% - ${(location.pathname == "/" ) ? 0 : drawerWidth}px)` },
                                ml: { sm: `${drawerWidth}px` },
                            }}
                        >
                            <Container maxWidth="xl" sx={{margin: (location.pathname == "/" ) ? "auto" : 0}}>
                                <Toolbar sx={{padding: "0px!important"}}>
                                    {location.pathname == "/" && (
                                        <Box component="div" sx={{ flexGrow: 0 }}>
                                        <img 
                                            src={require("../../../images/matik_upper_2.png")} 
                                            width={200} 
                                            style={{ display: "block" } }
                                        />
                                    </Box>
                                    )}
                                    {location.pathname != "/" && (
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        edge="start"
                                        size="large"
                                        onClick={handleDrawerToggle}
                                        sx={{ display: { sm: 'none' }, marginLeft: 0}}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    )}
                               
                                <div style={{flexGrow: 1}}/>
                                { 
                                    UserData ? (
                                        <>
                                            <IconButton
                                                size="large"
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                color="inherit"
                                                onClick={handleOpenUserMenu} 
                                            >
                                                <AccountCircleIcon/>
                                            </IconButton>
                                            <Menu
                                            sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElUser)}
                                                onClose={handleCloseUserMenu}
                                                >
                                                {settings.map((setting) => (
                                                    <MenuItem key={setting} onClick={(e) => handleSelectUserMenu(setting)}>
                                                        <Typography textAlign="center">{setting}</Typography>
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </>
                                    ) : (
                                        <div style={{float: "right"}}>
                                            <IconButton 
                                                color={'inherit'}
                                                sx={{ display: { xs: 'flex', sm: 'none' } }}
                                                onClick={()=>{setAnchorElResponse(true)}}
                                            >
                                                <MenuIcon/>
                                            </IconButton>
                                            <Menu
                                                sx={{ mt: '45px', display: {sm: 'none'} }}
                                                id="menu-appbar"
                                                anchorEl={anchorElResponse}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElResponse)}
                                                onClose={()=>{setAnchorElResponse(null)}}
                                                >
                                                <MenuItem key={"login"} >
                                                    <Link href="/login" underline="none" color="inherit" sx={{ display: { xs: 'inline', sm: 'none' }, fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
                                                        {'Login'}
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem key={"register"}  >
                                                    <Link href="/register" underline="none" color="inherit" sx={{display: { xs: 'inline', sm: 'none' },fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
                                                        {'Create an account'}
                                                    </Link>
                                                </MenuItem>
                                            </Menu>
                                            <Link href="/login" underline="none" color="inherit" sx={{ display: { xs: 'none', sm: 'inline' }, fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
                                                {'Login'}
                                            </Link>
                                            <Link href="/register" underline="none" color="#101840" sx={{display: { xs: 'none', sm: 'inline' },fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
                                                <Button variant="contained" sx={{textTransform: "none", borderRadius: 5}}>{'Create an account'}</Button>
                                            </Link>
                                            
                                            
                                        </div>
                                    )
                                }
                                </Toolbar>
                            </Container>
                        </AppBar>
                    )
                }
                {
                    (location.pathname != "/login" && location.pathname != "/" && location.pathname != "/register") &&
                    (
                        <Box
                            component="nav"
                            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                            aria-label="mailbox folders"
                        >
                            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                            <Drawer
                                container={container}
                                variant="temporary"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                                }}
                            >
                                {drawer}
                            </Drawer>
                            <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: (location.pathname != "/") ? drawerWidth : 0 },
                            }}
                            open
                            >
                            {drawer}
                            </Drawer>
                        </Box>
                    )
                }
                
                <Box component="main" sx={{ flexGrow: 1, paddingTop: (location.pathname != "/login" && location.pathname != "/register") && 9}}>
                        {props.children}
                </Box>
            </Box>

	</React.Fragment>
    );
}

export default Content;
