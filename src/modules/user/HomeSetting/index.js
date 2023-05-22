// import LoginComponent from "./login/index";
// import RegisterComponent from "./register/index";


// export const Login = LoginComponent
// export const Register = RegisterComponent

import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Container,
    Grid,
	Box,
	Link,
	Typography,
	Paper,
	TextField,
    Modal,
	Button,
    OutlinedInput,
    IconButton,
    Alert
} from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import jwt_decode from "jwt-decode"
import  CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useSelector, useDispatch } from 'react-redux'
import RoomCard from "../component/RoomCard"

function HomeSetting() {
	const navigate  = useNavigate();
    
    const [homeDisabled, setHomeDisabled] = React.useState(true);


    const selectedHome = useSelector(state => state.homeData.selectedHome)
    const selectedRoom = useSelector(state => state.homeData.selectedRoom)

    const handleClick = (value) => {
        console.log("test", value);
    }
    console.log("[selectedRoom]", selectedHome, selectedRoom);
    return (
		<Container maxWidth={"xl"} className="Container" sx={{paddingInline: "70px!important"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <IconButton onClick={()=>{navigate("/dashboard")}}>
                    <ArrowBackIcon/>
                </IconButton>
                <Typography variant="h6" sx={{fontFamily: "inherit", color: "#101840", width: 620,}}>
                    Home Setting
                </Typography>
            </div>
            <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 3}}>
                Home Name
            </Typography>
            <OutlinedInput 
                id="username" 
                placeholder="Your username here" 
                sx={{width: "30ch"}}
                disabled={homeDisabled}
                value={selectedHome?.name}
                // onChange={handleOnChange}
                // error={formError?.username}
            />
            {/* <FormHelperText error={formError?.username}>{formError?.username}</FormHelperText> */}
            <IconButton>
                <CreateRoundedIcon onClick={()=>{setHomeDisabled(false)}}/>
            </IconButton>
            <div style={{marginTop: 16, display: "flex", alignItems: "center"}}>
                <Typography variant="button" gutterBottom sx={{fontWeight: 600, marginBlock: 0.35, color: "#101840" }} >
                    Rooms 
                </Typography>
                <IconButton>
                    <AddCircleOutlineRoundedIcon onClick={()=>{}}/>
                </IconButton>
            </div>
            <Grid container spacing={2}>
                {selectedHome && selectedHome?.rooms?.map((room, idx) => {
                    console.log("[room]", room);
                    return <RoomCard setControlType={handleClick} controlType={"ALL"} name={room?.name} icon={room?.type}></RoomCard>
                })}
            </Grid>
            
		</Container>
  );
}

export default HomeSetting;
