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

import MuiAlert from '@mui/material/Alert';

import {resetUserData} from "../../../../modules/auth/store/actionCreators"

import { hideMessage } from '../../../../router/store/actionCreators'
const settings = ['Account Setting', 'Logout'];


function Content (props) {
    const location = useLocation();
    const navigate  = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    
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

    const [openLogin, setOpenLogin] = React.useState(false);
    const handleLoginOpen = () => {
        setOpenLogin(true)
        setFormData(logInitState);
        setFormError({});
    };
    const handleLoginClose = () => setOpenLogin(false);

    const [openRegister, setOpenRegister] = React.useState(false);
    const handleRegisterOpen = () => {
        setOpenRegister(true);
        setFormData(regInitState);
        setFormError({});
    }
    const handleRegisterClose = () => setOpenRegister(false);

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
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
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
                                            <Link href="/login" underline="none" color="#101840" sx={{fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
                                                {'Login'}
                                            </Link>
                                            <Link href="/register" underline="none" color="#101840" sx={{fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
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


        {   // Login Form Modal
            <Modal
                open={openLogin}
                onClose={handleLoginClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Paper elevation={3} sx={{  position: "relative", height: 'fit-content', width: 350, margin: "calc(100vh - 95vh + 10px) auto", padding: "35px", backdropFilter: "blur(5)"}} >
                    <IconButton sx={{ position: "absolute", right: 20, top: 20}} onClick={handleLoginClose}>
                        <CloseIcon/>
                    </IconButton>
                    <img src={require("../../../images/matik-upper.png")} alt="logo" width={270} style={{margin: "auto",  display: "block"}}/>
                    <Typography variant="h5" gutterBottom sx={{textAlign: "center", fontWeight: 600}} mt={3}>
                        Login to Your Account
                    </Typography>
                    <TextField 
                        id="username" 
                        label="Username" 
                        variant="outlined" 
                        onChange={handleOnChange}
                        sx={{marginTop: "15px", width: "100%"}} 
                        error={formError?.username}
                        helperText={formError?.username}
                    />
                    <TextField 
                        id="password" 
                        label="Password" 
                        variant="outlined" 
                        type={"password"} 
                        onChange={handleOnChange}
                        sx={{marginTop: "15px", width: "100%"}} 
                        error={formError?.password}
                        helperText={formError?.password}
                    />
                    <Button 
                        variant="contained"
                        onClick={handleSubmitForm}
                        sx={{marginTop: "15px", width: "100%"}}
                    >
                        <Typography variant="button" gutterBottom sx={{fontWeight: 600, marginBlock: 0.35 }} >
                            Login 
                        </Typography>
                    </Button>
                    <Typography variant="button" gutterBottom sx={{fontWeight: 400, marginBlock: 0.8, display: "block", textAlign: "right"}} >
                        Don't have an account?  
                        <Link
                            component="button"
                            variant="button"
                            sx={{marginLeft: "5px"}}
                            onClick={() => {handleRegisterOpen(); handleLoginClose()}}
                        >
                            Register now!
                        </Link>
                    </Typography>
                </Paper>
            </Modal>
        }
        {   // Register Form Modal
            <Modal
                open={openRegister}
                onClose={handleRegisterClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Paper elevation={3} sx={{  position: "relative", height: 'fit-content', width: 350, margin: "calc(100vh - 95vh + 10px) auto", padding: "35px", backdropFilter: "blur(5)"}} >
                    <IconButton sx={{ position: "absolute", right: 20, top: 20}} onClick={handleRegisterClose}>
                        <CloseIcon/>
                    </IconButton>
                    <img src={require("../../../images/matik-upper.png")} alt="logo" width={270} style={{margin: "auto",  display: "block"}}/>
                    <Typography variant="h5" gutterBottom sx={{textAlign: "center", fontWeight: 600}} mt={3}>
                        Register an Account
                    </Typography>
                    <TextField 
                        id="housename" 
                        label="My Home Name"
                        variant="outlined" 
                        onChange={handleOnChange}
                        sx={{marginTop: "15px", width: "100%"}} 
                        error={formError?.housename}
                        helperText={formError?.housename}
                    />
                    <TextField 
                        id="name" 
                        label="Name" 
                        variant="outlined" 
                        onChange={handleOnChange}
                        sx={{marginTop: "15px", width: "100%"}} 
                        error={formError?.name}
                        helperText={formError?.name}
                    />
                    <TextField 
                        id="username" 
                        label="Username" 
                        variant="outlined" 
                        sx={{marginTop: "15px", width: "100%"}} 
                        onChange={handleOnChange}
                        error={formError?.username}
                        helperText={formError?.username}
                    />
                    <TextField 
                        id="password" 
                        label="Password" 
                        variant="outlined" 
                        type={"password"} 
                        sx={{marginTop: "15px", width: "100%"}} 
                        onChange={handleOnChange}
                        error={formError?.password}
                        helperText={formError?.password}
                    />
                    <TextField 
                        id="cpassword" 
                        label="Confirm Password" 
                        variant="outlined" 
                        type={"password"} 
                        sx={{marginTop: "15px", width: "100%"}} 
                        onChange={handleOnChange}
                        error={formError?.cpassword}
                        helperText={formError?.cpassword}
                    />
                    <Button 
                        variant="contained"
                        sx={{marginTop: "15px", width: "100%"}} 
                        onClick={handleSubmitForm}
                    >
                        <Typography variant="button" gutterBottom sx={{fontWeight: 600, marginBlock: 0.35 }} >
                            Register 
                        </Typography>
                    </Button>
                    <Typography variant="button" gutterBottom sx={{fontWeight: 400, marginBlock: 0.8, display: "block", textAlign: "right"}} >
                        Already have an account?  
                        <Link
                            component="button"
                            variant="button"
                            sx={{marginLeft: "5px"}}
                            onClick={() => {handleRegisterClose(); handleLoginOpen()}}
                        >
                            Login now!
                        </Link>
                    </Typography>
                </Paper>
            </Modal>
        }
	</React.Fragment>
    );
}

export default Content;
