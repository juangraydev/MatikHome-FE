import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import {
	Container,
	Box,
	Link,
	Typography,
	Paper,
	Button,
    OutlinedInput,
    FormControl
} from "@mui/material"

import { useDispatch } from 'react-redux'
import {loginAPI, registerAPI} from "./service"
import jwt_decode from "jwt-decode"
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import jwtEncode from 'jwt-encode'
import _ from 'lodash'
import "./style.css"

export default function AuthPage() {
	const navigate  = useNavigate();
	const dispatch = useDispatch()
    const [pageType, setPageType] = React.useState(1)
    const [init, setInit] = React.useState({ username: '', password: '' })

    const SignUpSchema = Yup.object().shape({
        first_name: Yup.string()
            .max(20, 'Exceed from max 20 characters.')
            .required('This Field is Required!'),
        last_name: Yup.string()
            .max(20, 'Exceed from max 20 characters.')
            .required('This Field is Required!'),
        username: Yup.string()
            .max(15, 'Exceed from Maximum 15 characters.')
            .required('This Field is Required!'),
        password: Yup.string()
            .min(8, 'Minimum Password should be 8 characters.')
            .max(50, 'Exceed from Maximum 50 characters.')
            .required('This Field is Required!'),
    });

    const SignInSchema = Yup.object().shape({
        username: Yup.string()
            .max(50, 'Exceed from Maximum 50 characters.')
            .required('This Field is Required!'),
        password: Yup.string()
            .min(8, 'Minimum Password should be 8 characters.')
            .max(50, 'Exceed from Maximum 50 characters.')
            .required('This Field is Required!'),
    });


    const LoginAPI = async(data) => {
        dispatch(loginAPI(data))
            .then(()=>{
                if(localStorage.getItem("TOKEN")){
                    var decoded = jwt_decode(localStorage.getItem("TOKEN"));
                    if(decoded?.role == 1){
                        navigate("/admin");
                    }else{
                        navigate("/dashboard");
                    }
                }
            })
            .catch(()=>{
                console.log('[Auth][Login][Error]');
            })

    }

    const RegisterAPI = (data) => {
        console.log('[Register]', data);
        dispatch(registerAPI(data)).then(()=>{
            if(localStorage.getItem("TOKEN")){
                console.log("TOKEN",localStorage.getItem("TOKEN"));
                var decoded = jwt_decode(localStorage.getItem("TOKEN"));
                if(decoded?.role === 1){
                    navigate("/admin");
                }else{
                    navigate("/dashboard");
                }
            }
        })
    }
    
    const handleChangePage = () => {
        setPageType(!pageType)
        if (!pageType){
            setInit({
                username: '', password: ''
            })
        } else {
            setInit({
                first_name: '',
                last_name: '',
                username: '', 
                password: ''
            })
        }
        
    }
    

    return (
		<Container maxWidth={"false"} className="Container" sx={{paddingTop: 4}}>
            <Paper
                sx={{minWidth: 300, maxWidth: 400, height: 'auto', margin: "auto", paddingBlock: 3, paddingInline: 4}}
            >
                <img onClick={()=>{navigate("/")}} src={require("../../shared/images/matik_upper_4.png")} alt="logo" style={{width: "-webkit-fill-available", margin: "auto",  display: "block"}}/>
                <Typography variant="h4" sx={{fontSize: "2rem",fontFamily: "inherit",  textAlign: "center", color: "#101840" }} mt={2}>
                {
                    pageType ? "Login to Your Account" : "Register an Account"
                }
                </Typography>
                <Formik
                    initialValues={init}
                    enableReinitialize={true}
                    validationSchema={pageType ? SignInSchema : SignUpSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            let data = _.cloneDeep(values);
                            data.password = jwtEncode({"password": data.password}, "matik_home")
                            data.role = 0
                            if(pageType){
                                LoginAPI(data)
                            }else {
                                RegisterAPI(data)
                            }
                            setSubmitting(false);
                        }, 400);
                    }}
                    >
                    {({ 
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <Form>
                            {
                                !pageType && 
                                <Box
                                    component={"div"}
                                    sx={{display: "flex", gap: 2}}
                                >
                                    <FormControl sx={{width: "50%"}}>
                                        <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500}}>
                                            First Name
                                        </Typography>
                                        <OutlinedInput 
                                            id="first_name" 
                                            name="first_name"
                                            placeholder="First name" 
                                            size="small"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.first_name}
                                            error={touched?.first_name && errors?.first_name}
                                        />
                                        <FormHelperText error={touched?.first_name && errors?.first_name}>{touched?.first_name && errors?.first_name}</FormHelperText>
                                    </FormControl>

                                    <FormControl sx={{width: "50%"}}>
                                        <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500}}>
                                            Last Name
                                        </Typography>
                                        <OutlinedInput 
                                            id="last_name" 
                                            name="last_name"
                                            placeholder="Last Name" 
                                            size="small"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.last_name}
                                            error={touched?.last_name && errors?.last_name}
                                        />
                                        <FormHelperText error={touched?.last_name && errors?.last_name}>{touched?.last_name && errors?.last_name}</FormHelperText>
                                    </FormControl>
                                </Box>
                            }

                            <FormControl sx={{width: "-webkit-fill-available"}}>
                                <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500}}>
                                    Username
                                </Typography>
                                <OutlinedInput 
                                    id="username" 
                                    name="username"
                                    placeholder="Username" 
                                    size="small"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    error={touched?.username && errors?.username}
                                />
                                <FormHelperText error={touched?.username && errors?.username}>{touched?.username && errors?.username}</FormHelperText>
                            </FormControl>

                            <FormControl sx={{width: "-webkit-fill-available"}}>
                                <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500}}>
                                    Password
                                </Typography>
                                <OutlinedInput 
                                    id="password" 
                                    name="password"
                                    type="password"
                                    placeholder="Password" 
                                    size="small"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    error={touched?.password && errors?.password}
                                />
                                <FormHelperText error={touched?.password && errors?.password}>{touched?.password && errors?.password}</FormHelperText>
                            </FormControl>
                            <Button 
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                                sx={{marginTop: 2, width: "100%"}}
                            >
                                <Typography variant="button" sx={{fontFamily: "inherit",fontWeight: 500 }} >
                                    { pageType ? "Login" : "Register" } 
                                </Typography>
                            </Button>
                        </Form>
                    )}
                </Formik>
                
                <Typography variant="button" sx={{fontFamily: "inherit",fontWeight: 400, marginTop: 2, display: "block", textAlign: "center"}} >
                    { pageType ? "Don't have an account?" : "Already have an account?"}  
                    <Link
                        component="button"
                        variant="button"
                        sx={{fontFamily: "inherit",marginLeft: "5px", color: "#1976d2", fontWeight: 'bold', textDecoration: "none"}}
                        onClick={()=>{handleChangePage()}}
                    >
                        { pageType ? "Register now!" : "Login now!"}
                    </Link>
                </Typography>
            </Paper>
		</Container>
  );
}