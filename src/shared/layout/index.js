import React, { useState } from "react";
import Sidebar from "./component/Sidebar";
import jwt_decode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";

import { resetUserData } from "../../modules/auth/store/actionCreators";
import { resetHomeData } from "../../modules/user/dashboard/store/actionCreators";
import {
  selectHome,
  selectRoom,
} from ".././../modules/user/dashboard/store/actionCreators";
import { hideMessage } from "../../router/store/actionCreators";

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Layout(props) {
  const { window } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({})

  const UserData = useSelector((state) => state.UserData.data);
  const alertOpen = useSelector((state) => state.alertMessage.open);
  const alertMessage = useSelector((state) => state.alertMessage.message);
  const alertType = useSelector((state) => state.alertMessage.type);
  
  React.useEffect(() => {
    if (UserData?.token) {
      var decoded = jwt_decode(UserData?.token);
      setUserInfo(decoded)
      if (decoded?.role == 1) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      if (location.pathname === "/admin" || location.pathname === "/dashboard")
        navigate("/");
    }
  }, [UserData]);

  const handleClose = (e, reason) => {
    if (reason === 'clickaway'){
      return
    }
    dispatch(hideMessage())
  }

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
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
      { UserData?.token && <Sidebar userInfo={userInfo}/>}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 4, background: "#f0f2f5", overflowY: "scroll" }}
      >
        {props.children}
      </Box>
    </Box>
  );

  // return (
  //     <Box sx={{ display: 'fixed' }}>
  //          <Snackbar
  //             sx={{marginTop: 6}}
  // 			open={alertOpen}
  // 			onClose={handleClose}
  // 			autoHideDuration={3000}
  // 			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  // 		>
  //             <MuiAlert elevation={6} variant='filled' onClose={handleClose} severity={alertType}>
  // 				<div style={{ whiteSpace: 'pre' }}>{alertMessage}</div>
  //             </MuiAlert>
  // 		</Snackbar>

  //         { (location.pathname != "/") &&
  //             (
  //                 <AppBar
  //                     position="fixed"
  //                     sx={{
  //                         backgroundColor: "#00062A"
  //                     }}
  //                 >
  //                     <Container maxWidth="false" >
  //                         <Toolbar sx={{padding: "0px!important"}}>
  //                             <Box component="div" sx={{ flexGrow: 1, display: "flex" }}>
  //                                 <IconButton sx={{color: 'whitesmoke'}} size="xl" onClick={handleOpenHomeMenu}>
  //                                     <OtherHousesIcon/>
  //                                 </IconButton>
  //                                 <Menu
  //                                     key={"home_list_menu"}
  //                                     sx={{ mt: '45px'}}
  //                                     PaperProps={{
  //                                             style: {
  //                                                 width: 200,
  //                                             },
  //                                         }}
  //                                     id="menu-home"
  //                                     anchorEl={anchorElHome}
  //                                     anchorOrigin={{
  //                                         vertical: 'top',
  //                                         horizontal: 'left',
  //                                     }}
  //                                     keepMounted
  //                                     transformOrigin={{
  //                                         vertical: 'top',
  //                                         horizontal: 'left',
  //                                     }}
  //                                     open={Boolean(anchorElHome)}
  //                                     onClose={handleCloseHomeMenu}
  //                                     >
  //                                     <MenuItem key={'add_home'} onClick={handleOpenAddHome}>
  //                                         <Typography textAlign="center">{'Add Home'}</Typography>
  //                                     </MenuItem>
  //                                     {
  //                                         homes?.map((home,idx) => (
  //                                             <MenuItem key={idx} onClick={()=>{handleSelectedHome(home)}}>
  //                                                 <Typography sx={{color: selectedHome?.name == home?.name ? "#039be5" : "inherit"}} textAlign="center">{home?.name}</Typography>
  //                                             </MenuItem>
  //                                         ))
  //                                     }
  //                                 </Menu>
  //                             </Box>
  //                             <Box component="div" sx={{ flexGrow: 0, display: "flex" }}>

  //                                 <img
  //                                     src={require("../images/matik_upper_2.png")}
  //                                     width={200}
  //                                     style={{ display: "block" } }
  //                                 />
  //                             </Box>

  //                         <div style={{flexGrow: 1}}/>
  //                         {
  //                             UserData ? (
  //                                 <>
  //                                     <IconButton
  //                                         size="large"
  //                                         aria-label="account of current user"
  //                                         aria-controls="menu-appbar"
  //                                         aria-haspopup="true"
  //                                         color="inherit"
  //                                         onClick={handleOpenUserMenu}
  //                                     >
  //                                         <AccountCircleIcon/>
  //                                     </IconButton>
  //                                     <Menu
  //                                     sx={{ mt: '45px' }}
  //                                         id="menu-appbar"
  //                                         anchorEl={anchorElUser}
  //                                         anchorOrigin={{
  //                                             vertical: 'top',
  //                                             horizontal: 'right',
  //                                         }}
  //                                         keepMounted
  //                                         transformOrigin={{
  //                                             vertical: 'top',
  //                                             horizontal: 'right',
  //                                         }}
  //                                         open={Boolean(anchorElUser)}
  //                                         onClose={handleCloseUserMenu}
  //                                         >
  //                                         {settings.map((setting) => (
  //                                             <MenuItem key={setting} onClick={() => handleSelectUserMenu(setting)}>
  //                                                 <Typography textAlign="center">{setting}</Typography>
  //                                             </MenuItem>
  //                                         ))}
  //                                     </Menu>
  //                                 </>
  //                             ) : (
  //                                 <div style={{float: "right"}}>
  //                                     <IconButton
  //                                         color={'inherit'}
  //                                         sx={{ display: { xs: 'flex', sm: 'none' } }}
  //                                         onClick={()=>{setAnchorElResponse(true)}}
  //                                     >
  //                                         <MenuIcon/>
  //                                     </IconButton>
  //                                     <Menu
  //                                         sx={{ mt: '45px', display: {sm: 'none'} }}
  //                                         id="menu-appbar"
  //                                         anchorEl={anchorElResponse}
  //                                         anchorOrigin={{
  //                                             vertical: 'top',
  //                                             horizontal: 'right',
  //                                         }}
  //                                         keepMounted
  //                                         transformOrigin={{
  //                                             vertical: 'top',
  //                                             horizontal: 'right',
  //                                         }}
  //                                         open={Boolean(anchorElResponse)}
  //                                         onClose={()=>{setAnchorElResponse(null)}}
  //                                         >
  //                                         <MenuItem key={"login"} >
  //                                             <Link href="/login" underline="none" color="inherit" sx={{ display: { xs: 'inline', sm: 'none' }, fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
  //                                                 {'Login'}
  //                                             </Link>
  //                                         </MenuItem>
  //                                         <MenuItem key={"register"}  >
  //                                             <Link href="/register" underline="none" color="inherit" sx={{display: { xs: 'inline', sm: 'none' },fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
  //                                                 {'Create an account'}
  //                                             </Link>
  //                                         </MenuItem>
  //                                     </Menu>
  //                                     <Link href="/login" underline="none" color="inherit" sx={{ display: { xs: 'none', sm: 'inline' }, fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
  //                                         {'Login'}
  //                                     </Link>
  //                                     <Link href="/register" underline="none" color="#101840" sx={{display: { xs: 'none', sm: 'inline' },fontWeight: 500,fontFamily: "inherit", marginInline: 2}}>
  //                                         <Button variant="contained" sx={{textTransform: "none", borderRadius: 5}}>{'Create an account'}</Button>
  //                                     </Link>

  //                                 </div>
  //                             )
  //                         }
  //                         </Toolbar>
  //                     </Container>
  //                 </AppBar>
  //             )
  //         }

  //         {
  //             (location.pathname != "/") && false &&
  //             (
  //                 <Box
  //                     component="nav"
  //                     sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
  //                     aria-label="mailbox folders"
  //                 >
  //                     {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
  //                     <Drawer
  //                         container={container}
  //                         variant="temporary"
  //                         open={mobileOpen}
  //                         onClose={handleDrawerToggle}
  //                         ModalProps={{
  //                             keepMounted: true, // Better open performance on mobile.
  //                         }}
  //                         sx={{
  //                             display: { xs: 'block', sm: 'none' },
  //                             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
  //                         }}
  //                     >
  //                         <LayoutDrawer/>
  //                     </Drawer>
  //                     <Drawer
  //                     variant="permanent"
  //                     sx={{
  //                         display: { xs: 'none', sm: 'block' },
  //                         '& .MuiDrawer-paper': { boxSizing: 'border-box', width: (location.pathname != "/") ? drawerWidth : 0 },
  //                     }}
  //                     open
  //                     >
  //                         <LayoutDrawer/>
  //                     </Drawer>
  //                 </Box>
  //             )
  //         }
  //         <Box component="main" sx={{ flexGrow: 1, paddingTop: 9}}>
  //             {props.children}
  //         </Box>
  //     </Box>
  // );
}
