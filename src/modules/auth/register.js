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
    OutlinedInput,
    Alert
} from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';
import {loginAPI, registerAPI} from "./service"
import jwt_decode from "jwt-decode"
import FormHelperText from '@mui/material/FormHelperText';

import { useSelector, useDispatch } from 'react-redux'
import "./style.css"

function LoginPage() {
	const navigate  = useNavigate();
	const dispatch = useDispatch()
    const [formData, setFormData] = React.useState({
        housename: "",
        name: "",
        username: "",
        password: ""
    })
    const [formError, setFormError] = React.useState({})

    const handleOnChange = (event) => setFormData({...formData, [event.target.id]: event.target.value})

    const handleSubmitForm = () => {
        setFormError({})
        const error = validateForm(formData);
        setFormError(error)
        console.log("[formData]",formData);
        // if(!Object.keys(error).length){
        //     RegisterAPI(formData);
        // }
    }

    const validateForm = () => {
        let Error = {};
        Object.keys(formData).map((data) => {
            if(formData[data].length === 0 || formData[data] === ""){
                Error = {...Error, [data]: "This Field is Required!"};
            }
        })
        return Error;
    }

    const RegisterAPI = (data) => {
        dispatch(registerAPI(data)).then(()=>{
            if(localStorage.getItem("TOKEN")){
                var decoded = jwt_decode(localStorage.getItem("TOKEN"));
                if(decoded?.role == 1){
                    navigate("/admin");
                }else{
                    navigate("/dashboard");
                }
            }
        })
    }
    

    return (
		<Container maxWidth={"false"} className="Container" sx={{paddingTop: 4}}>
            <Paper
                sx={{minWidth: 300, maxWidth: 400, height: 'auto', margin: "auto", paddingBlock: 3, paddingInline: 4}}
            >
                <img onClick={()=>{navigate("/")}} src={require("../../shared/images/matik_upper_2.png")} alt="logo" width={300} style={{margin: "auto",  display: "block"}}/>
                <Typography variant="h4" sx={{fontFamily: "inherit",  textAlign: "center", color: "#101840",  fontWeight: 500 }} mt={2}>
                Register an Account
                </Typography>
                <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 3}}>
                    Home Name
                </Typography>
                <OutlinedInput 
                    id="housename" 
                    margin="dense"
                    placeholder="The name of the home here" 
                    sx={{width: "-webkit-fill-available"}}
                    onChange={handleOnChange}
                    error={formError?.housename}
                />
                <FormHelperText error={formError?.housename}>{formError?.housename}</FormHelperText>
                <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 2}}>
                    Display Name
                </Typography>
                <OutlinedInput 
                    id="name" 
                    placeholder="Your display name here" 
                    sx={{width: "-webkit-fill-available"}}
                    onChange={handleOnChange}
                    error={formError?.name}
                />
                <FormHelperText error={formError?.name}>{formError?.name}</FormHelperText>
                <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 2}}>
                    Username
                </Typography>
                <OutlinedInput 
                    id="username" 
                    placeholder="Your username here" 
                    sx={{width: "-webkit-fill-available"}}
                    onChange={handleOnChange}
                    error={formError?.username}
                />
                <FormHelperText error={formError?.username}>{formError?.username}</FormHelperText>
                <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 2}}>
                    Password
                </Typography>
                <OutlinedInput 
                    id="password" 
                    placeholder="Your password here" 
                    sx={{width: "-webkit-fill-available"}}
                    type={"password"} 
                    onChange={handleOnChange}
                    error={formError?.password}
                />
                <FormHelperText error={formError?.password}>{formError?.password}</FormHelperText>
                <Button 
                    variant="contained"
                    onClick={handleSubmitForm}
                    sx={{marginTop: 2, width: "100%"}}
                >
                    <Typography variant="button" gutterBottom sx={{fontFamily: "inherit",fontWeight: 500 }} >
                        Register 
                    </Typography>
                </Button>
                <Typography variant="button" sx={{fontFamily: "inherit",fontWeight: 400, marginTop: 2, display: "block", textAlign: "center"}} >
                    Already have an account?  
                    <Link
                        component="Typography"
                        variant="button"
                        sx={{fontFamily: "inherit",marginLeft: "5px", color: "#101840", textDecoration: "none"}}
                        // onClick={() => {handleRegisterOpen(); handleLoginClose()}}
                        onClick={()=>{navigate("/login")}}
                    >
                        Login now!
                    </Link>
                </Typography>
            </Paper>
		</Container>
  );
}

export default LoginPage;
