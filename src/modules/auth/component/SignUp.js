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
    Alert,
    FormControl
} from "@mui/material"

import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close';
// import {loginAPI, registerAPI} from "./service"
import jwt_decode from "jwt-decode"
import FormHelperText from '@mui/material/FormHelperText';

import "../style.css"

export default function SignUpPage() {
	const navigate  = useNavigate();
	const dispatch = useDispatch()
    const [formData, setFormData] = React.useState({})
    const [formError, setFormError] = React.useState({})

    const handleOnChange = (event) => setFormData({...formData, [event.target.id]: event.target.value})

    const handleSubmitForm = () => {
        setFormError({})
        const error = validateForm(formData);
        setFormError(error)
        if(!Object.keys(error).length){
            // LoginAPI(formData);
        }
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

    // const RegisterAPI = (data) => {
    //     dispatch(registerAPI(data)).then(()=>{
    //         if(localStorage.getItem("TOKEN")){
    //             var decoded = jwt_decode(localStorage.getItem("TOKEN"));
    //             if(decoded?.role == 1){
    //                 navigate("/admin");
    //             }else{
    //                 navigate("/dashboard");
    //             }
    //         }
    //     })
    // }
    

    return (
		<Container maxWidth={"false"} className="Container" sx={{paddingTop: 4}}>
            <Paper
                sx={{minWidth: 300, maxWidth: 400, height: 'auto', margin: "auto", paddingBlock: 3, paddingInline: 4}}
            >
                <img onClick={()=>{navigate("/")}} src={require("../../../shared/images/matik_upper_4.png")} alt="logo" style={{width: "-webkit-fill-available", margin: "auto",  display: "block"}}/>
                <Typography variant="h4" sx={{fontSize: "2rem",fontFamily: "inherit",  textAlign: "center", color: "#101840" }} mt={2}>
                    Register an Account
                </Typography>
                <FormControl sx={{width: "-webkit-fill-available"}}>
                    <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 3}}>
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
                </FormControl>
                <FormControl sx={{width: "-webkit-fill-available"}}>
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
                        helperText={formError?.password}
                    />
                    <FormHelperText error={formError?.password}>{formError?.password}</FormHelperText>
                </FormControl>
                
                
                <Button 
                    variant="contained"
                    onClick={handleSubmitForm}
                    sx={{marginTop: 2, width: "100%"}}
                >
                    <Typography variant="button" sx={{fontFamily: "inherit",fontWeight: 500 }} >
                        Login 
                    </Typography>
                </Button>
                <Typography variant="button" sx={{fontFamily: "inherit",fontWeight: 400, marginTop: 2, display: "block", textAlign: "center"}} >
                    Don't have an account?  
                    <Link
                        component="Typography"
                        variant="button"
                        sx={{fontFamily: "inherit",marginLeft: "5px", color: "#101840", textDecoration: "none"}}
                        // onClick={() => {handleRegisterOpen(); handleLoginClose()}}
                        onClick={()=>{navigate("/register")}}
                    >
                        Register now!
                    </Link>
                </Typography>
            </Paper>
		</Container>
  );
}
