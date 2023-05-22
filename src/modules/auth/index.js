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
    IconButton,
    Alert
} from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';
import jwt_decode from "jwt-decode"

import "./style.css"

function LandingPage() {
	const navigate  = useNavigate();
    

    return (
		<Container maxWidth={"xl"} className="Container" sx={{paddingInline: "70px!important"}}>
            <Typography variant="h1" sx={{fontFamily: "inherit", color: "#101840", mt: 5, width: 620, mb: 3}}>
                Control your home from anywhere.
            </Typography>
            <Link href="/register" underline="none" color="#101840" sx={{fontWeight: 500,fontFamily: "inherit"}}>
                <Button variant="contained" sx={{textTransform: "none", borderRadius: 15, fontSize: 18, paddingBlock: "10px",paddingInline: "25px"}}>
                    {'Create an account'}
                </Button>
            </Link>
		</Container>
  );
}

export default LandingPage;
