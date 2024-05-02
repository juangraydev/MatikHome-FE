import React from 'react'
import { useNavigate } from "react-router-dom";
import { Formik, Form, setIn } from 'formik';
import {
	Container,
	Box,
	Link,
	Typography,
	Paper,
    IconButton,
    Grid,
	Button,
    OutlinedInput,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material"

import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from 'react-redux'
import {loginAPI, registerAPI} from "../service"
import jwt_decode from "jwt-decode"
import FormHelperText from '@mui/material/FormHelperText';
import * as Yup from 'yup';
import jwtEncode from 'jwt-encode'
import _ from 'lodash'
import { editUser } from '../../admin/module/UserManagement/store/service'
import { successUserData } from "../../auth/store/actionCreators"
import "../style.css"

function UserSettings({handleClose}) {
    const userData = useSelector((state) => state.UserData.data);
    

	const navigate  = useNavigate();
	const dispatch = useDispatch()
    const [init, setInit] = React.useState({
        first_name: '',
        last_name: '',
        username: '', 
        password: '12345678',
    })
    


    React.useEffect(()=>{
        console.log("[selectedHome]", jwt_decode(userData?.token));
        setInit(jwt_decode(userData?.token))
        setInit({
            first_name: jwt_decode(userData?.token)?.first_name,
            last_name: jwt_decode(userData?.token)?.last_name,
            username: jwt_decode(userData?.token)?.username, 
            password: '12345678'
        })
        
    }, [userData])

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


    const updateAPI = (data) => {
        
        data['id'] = jwt_decode(userData?.token)?.id
        data['role'] = jwt_decode(userData?.token)?.role
        const userInfo = jwtEncode({userInfo: data}, "matik_home")
        dispatch(editUser({userInfo})).then((res) => {
            dispatch(successUserData(res?.data));
            localStorage.setItem("TOKEN", res?.data?.token)
            console.log("[res]", res);
            window.location.reload();

        }).catch((err) => {
            console.log("[err]", err);
            window.location.reload();

        })
    }
    
    const handleChangePage = () => {
        setInit({
            first_name: '',
            last_name: '',
            username: '', 
            password: ''
        })
    }

    const handleOnFocusPass = (e, handleChange) => {
        console.log("[e]", e);
        e.target.value = ''
        handleChange(e)
    }

    console.log("[init]", init);
    

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: 400,
            }}
            >
            <Typography>User Information</Typography>
            <IconButton onClick={handleClose}>
                <CloseIcon />
            </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ maxWidth: 400, textAlign: "center" }}>
                <Box >
                    <Formik
                        initialValues={init}
                        enableReinitialize={true}
                        validationSchema={SignUpSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                let data = _.cloneDeep(values);
                                data.password = (data?.password !== init.password) ? jwtEncode({"password": data.password}, "matik_home") : data?.password
                                updateAPI(data)
                                console.log("[data]", data);
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
                        }) =>{
                            console.log("[errors]", errors);
                        return (
                            <Form>
                                
                                <FormControl sx={{width: "-webkit-fill-available"}}>
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

                                <FormControl sx={{width: "-webkit-fill-available"}}>
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
                                        onClick={(e)=>{handleOnFocusPass(e, handleChange)}}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        error={touched?.password && errors?.password}
                                    />
                                    <FormHelperText error={touched?.password && errors?.password}>{touched?.password && errors?.password}</FormHelperText>
                                </FormControl>
                                <FormControl sx={{width: "-webkit-fill-available", marginTop: 2}}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Update
                                    </Button>
                                </FormControl>
                            </Form>
                        )}}
                    </Formik>
                </Box>
            </DialogContent>
        </Dialog>
    )   
}

export default UserSettings