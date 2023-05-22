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

import "./style.css"

function LandingPage() {
	const navigate  = useNavigate();
    

    return (
		<Container maxWidth={"xl"} className="Container" sx={{paddingInline: "40px!important"}}>
            <Typography sx={{ 
                typography: { xs: 'h4', sm: 'h3', md: 'h2', lg: 'h1',  xl: 'h1' }, 
                fontFamily: "inherit", 
                color: "#101840", 
                mt: 5, 
                width: { xs: 350, sm: 500, md: 600, lg: 800,  xl: 800 }, 
                mb: 3
            }}>
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
