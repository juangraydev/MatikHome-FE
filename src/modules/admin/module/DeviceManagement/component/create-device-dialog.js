import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Container,
	Box,
	Link,
	Typography,
	Paper,
	TextField,
    IconButton,
	Button,
    NativeSelect,
    MenuItem,
    Modal,
    OutlinedInput,
    FormControl,
    FormHelperText
} from "@mui/material"
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
// import Grid from '@mui/material/Unstable_Grid2';
 import {  Formik, Form, Field   } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton';

import Select from '@mui/material/Select';

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';

// import { addRoom, editRoom } from "../../../../modules/user/dashboard/service"
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';


import { createDevice } from '../store/sevice'

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -60%)',
    minWidth: 292,
    width: "100%",
    maxWidth: 400,
    p: 2
  };


  const CustomizedSelectForFormik = ({ children, form, field }) => {
    const { name, value } = field;
    const { setFieldValue } = form;
  
    return (
      <Select
        name={name}
        value={value}
        onChange={e => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    );
  };

function CreateDevice({open, handleClose, type="add"}) {
	const dispatch = useDispatch()

    const [initVal, setInitVal] = React.useState(
        { 
            key: uuidv4(), 
            channel: 2, 
            home: null
        }
        
    );

    const CreateDevice = (values) => {
        alert(values.channel)
        dispatch(createDevice({
            key: values.key,
            home: '966c8278-f4be-4196-bd05-8be5dd6dfb5c',
            channel: values.channel
        }))
    }

    
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{margin: 1}}
        >
            <Paper sx={style}>
                <div style={{display: "flex"}}>
                    <Typography variant="h6" sx={{ flexGrow: 1}}>{type == "add" ? 'Create Device' : 'Update Device'}</Typography>
                    <IconButton onClick={handleClose} sx={{float: "right"}}>
                        <CloseIcon/>
                    </IconButton>
                </div>

                <Formik
                    enableReinitialize
                    initialValues={initVal}
                    validate={values => {
                        const errors = {};
                        // if (!values.name) {
                        //     errors.name = 'This Field is Required';
                        // } 
                        // if (values.type == null) {
                        //     errors.type = 'Required';
                        // } 

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            
                            CreateDevice(values)

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
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth>
                                <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 2}}>
                                    Key
                                </Typography>
                                <OutlinedInput 
                                    id="name" 
                                    placeholder="Device key" 
                                    sx={{width: "-webkit-fill-available"}}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.key}
                                    error={errors?.key}
                                    disabled={true}
                                />
                                <FormHelperText error={errors?.name}>{touched.name && errors?.name}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth>
                                <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 2}}>
                                    Channels
                                </Typography>
                                <Field
                                    name="channel"
                                    component={CustomizedSelectForFormik}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            display: "flex", 
                                            alignItems: "center"
                                        }
                                    }}
                                >
                                    <MenuItem value={2} sx={{alignItems: "center"}}>2 Channels</MenuItem>
                                    <MenuItem value={4} sx={{alignItems: "center"}}>4 Channels</MenuItem>
                                    <MenuItem value={8} sx={{alignItems: "center"}}>8 Channels</MenuItem>
                                </Field>
                                <FormHelperText error={errors?.type}>{touched.type && errors?.type}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth>
                                <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 2}}>
                                    Homes
                                </Typography>
                                <Field
                                    name="home"
                                    component={CustomizedSelectForFormik}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            display: "flex", 
                                            alignItems: "center"
                                        }
                                    }}
                                >
                                    <MenuItem value={0} sx={{alignItems: "center"}}>Home 1</MenuItem>
                                    <MenuItem value={1} sx={{alignItems: "center"}}>Home 2</MenuItem>
                                    <MenuItem value={2} sx={{alignItems: "center"}}>Home 3</MenuItem>
                                </Field>
                                <FormHelperText error={errors?.type}>{touched.type && errors?.type}</FormHelperText>
                            </FormControl>

                            <FormControl sx={{display: "flex", flexDirection: "inherit"}}>
                                <LoadingButton 
                                    variant="text"
                                    onClick={handleClose}
                                    sx={{marginTop: 2, width: "100%", marginInline: 2}}
                                    disabled={isSubmitting}
                                >
                                    <Typography variant="button" sx={{fontFamily: "inherit",fontWeight: 500 }} >
                                        {'Cancel'} 
                                    </Typography>
                                </LoadingButton>
                                <LoadingButton 
                                    variant="contained"
                                    type={"submit"}
                                    loading={isSubmitting}
                                    sx={{marginTop: 2, width: "100%", marginInline: 2}}
                                    disabled={isSubmitting}
                                >
                                    <Typography variant="button" sx={{fontFamily: "inherit",fontWeight: 500 }} >
                                        Create
                                    </Typography>
                                </LoadingButton>
                            </FormControl>
                        </form>
                    )}
                </Formik>
                

            </Paper>
        </Modal>
    );
}

export default CreateDevice;
