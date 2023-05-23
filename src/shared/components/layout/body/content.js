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

import MenuIcon from '@mui/icons-material/Menu';
import MuiAlert from '@mui/material/Alert';

import {resetUserData} from "../../../../modules/auth/store/actionCreators"
import {resetHomeData} from "../../../../modules/user/dashboard/store/actionCreators"

import { hideMessage } from '../../../../router/store/actionCreators'
const settings = ['Account Setting', 'Logout'];


function Content (props) {
    const location = useLocation();
    const navigate  = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElResponse, setAnchorElResponse] = React.useState(null);
    
    const alertOpen = useSelector(state => state.alertMessage.open)
	const alertType = useSelector(state => state.alertMessage.type)
	const alertMessage = useSelector(state => state.alertMessage.message)

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
        console.log("[UserData]",UserData);
        if(UserData?.token){
            var decoded = jwt_decode(UserData?.token);
            console.log(decoded);
            if(decoded?.role == 1){
                navigate("/admin");
            }else{
                navigate("/dashboard");
            }
        }else {
            if(location.pathname == "/admin" || location.pathname == "/dashboard")  navigate("/")
        }
    }, [UserData ])


    const handleCloseNavMenu = () => {
        // setAnchorElNav(null);
      };
    const pages = ['Products', 'Pricing', 'Blog'];
    console.log("[Role ]", UserData );
    return (
        <React.Fragment>
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
                { (location.pathname != "/login" && location.pathname != "/register") && (
                    <AppBar position="fixed" sx={{ background: "rgba(255,255,255,0.9)", boxShadow: "none"}}>
                        <Container maxWidth="xl">
                            <Toolbar sx={{paddingInline: "0px!important"}}>
                                <Box component="div" sx={{ flexGrow: 0 }}>
                                    <img 
                                        src={require("../../../images/matik_upper_2.png")} 
                                        width={200} 
                                        style={{ display: "block" } }
                                    />
                                </Box>
                                
                                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                                    {
                                        UserData && jwt_decode(UserData?.token)?.role == 1 && <>
                                        {pages.map((page) => (
                                            <Button
                                                key={page}
                                                onClick={handleCloseNavMenu}
                                                sx={{ my: 2, color: 'black',fontWeight: 600, display: 'block' }}
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                        </>
                                    }
                                </Box>
                                
                                {
                                    UserData ? (
                                        <div>
                                            <IconButton
                                                size="large"
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                color="#f5f5f7"
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
                                        </div>
                                    ) : (
                                        <div style={{float: "right"}}>
                                            <IconButton 
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
                                                    <Link href="/login" underline="none" color="#101840" sx={{ display: { xs: 'inline', sm: 'none' }, fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
                                                        {'Login'}
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem key={"register"}  >
                                                    <Link href="/register" underline="none" color="#101840" sx={{display: { xs: 'inline', sm: 'none' },fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
                                                        {'Create an account'}
                                                    </Link>
                                                </MenuItem>
                                            </Menu>
                                            <Link href="/login" underline="none" color="#101840" sx={{ display: { xs: 'none', sm: 'inline' }, fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
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
                <Box component="main" sx={{ flexGrow: 1, paddingTop: (location.pathname != "/login" && location.pathname != "/register") && 9}}>
                        {props.children}
                </Box>
            </Box>

	</React.Fragment>
    );
}

export default Content;
