import React from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {
	Box,
	IconButton,
    AppBar,
    Container,
    Toolbar,
    Menu,
    MenuItem,
    Typography,
    Link,
    Button} from "@mui/material"

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import {resetUserData} from "../../../modules/auth/store/actionCreators"
import {resetHomeData} from "../../../modules/user/dashboard/store/actionCreators"
import { 
    selectHome,
    selectRoom
} from '../../../modules/user/dashboard/store/actionCreators'
import OtherHousesIcon from '@mui/icons-material/OtherHouses';



const settings = ['Account Setting', 'Logout'];

export default function Header (props) {
    const { window } = props;
    const location = useLocation();
	const dispatch = useDispatch()
    const navigate  = useNavigate()
    
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElHome, setAnchorElHome] = React.useState(null);
    const [anchorElResponse, setAnchorElResponse] = React.useState(null);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openAddHome, setOpenAddHome] = React.useState(false);
    const [openHome, setOpenHome] = React.useState(false);
    const [openDevice, setOpenDevice] = React.useState(false);

    const UserData = useSelector(state => state.UserData.data)
    const selectedHome = useSelector(state => state.homeData.selectedHome)
    const homes = useSelector(state => state.homeData.data)


    

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




    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
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
    const handleOpenAddHome = () => {
        setOpenAddHome(true)
        handleCloseHomeMenu()
    }


    const handleSelectedHome = (home) => {
        handleCloseHomeMenu()
        dispatch(selectHome(home))
        dispatch(selectRoom("ALL"))
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "#fff"
            }}
        >
            <Container maxWidth="false" >
                <Toolbar sx={{padding: "0px!important"}}>
                    <Box component="div" sx={{ flexGrow: 1, display: "flex" }}>
                        <IconButton sx={{color: 'whitesmoke'}} size="xl" onClick={handleOpenHomeMenu}>
                            <OtherHousesIcon/>
                        </IconButton>
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
                    </Box>
                    <Box component="div" sx={{ flexGrow: 0, display: "flex" }}>
                        
                        <img 
                            src={require("../../images/matik_upper_2.png")} 
                            width={200} 
                            style={{ display: "block" } }
                        />
                    </Box>
                
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
                                    <MenuItem key={setting} onClick={() => handleSelectUserMenu(setting)}>
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
    );
}