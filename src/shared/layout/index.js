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
        console.log("[Logic]", );
        if(!location.pathname.includes('/dashboard')){
          navigate("/dashboard");
        }
      }
    } else {
      if (location.pathname === "/admin" || location.pathname === "/dashboard" || location.pathname === "/dashboard/home-setting"){
        navigate("/");
      }
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
}
