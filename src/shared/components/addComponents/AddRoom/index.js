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
 import {  Formik, Form, Field   } from 'formik';

import Select from '@mui/material/Select';

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';

import { addRoom } from "../../../../modules/user/dashboard/service"
import { useSelector, useDispatch } from 'react-redux'

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

function AddRoom({open, setOpen}) {
	const dispatch = useDispatch()

    const selectedHome = useSelector(state => state.homeData.selectedHome)
    
    const AddRoomAPI = (data) => {
        dispatch(addRoom(selectedHome, data))
            .then(()=>{
                handleClose();
            })
    }

    const handleClose =() => {
        setOpen(false)
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
                    <Typography variant="h6" sx={{ flexGrow: 1}}>Add Room</Typography>
                    <IconButton onClick={handleClose} sx={{float: "right"}}>
                        <CloseIcon/>
                    </IconButton>
                </div>

                <Formik
                    initialValues={{ name: '', type: 0 }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'This Field is Required';
                        } 
                        if (values.type == null) {
                            errors.type = 'Required';
                        } 

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                        AddRoomAPI(values)
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
                                    {'Room Name'}
                                </Typography>
                                <OutlinedInput 
                                    id="name" 
                                    placeholder="Room Name" 
                                    sx={{width: "-webkit-fill-available"}}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    error={errors?.name}
                                />
                                <FormHelperText error={errors?.name}>{touched.name && errors?.name}</FormHelperText>
                            </FormControl>

                            <FormControl fullWidth>
                                <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 2}}>
                                    {'Room Type'}
                                </Typography>
                                <Field
                                    name="type"
                                    component={CustomizedSelectForFormik}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            display: "flex", 
                                            alignItems: "center"
                                        }
                                    }}
                                >
                                    <MenuItem value={0} sx={{alignItems: "center"}}><KitchenIcon sx={{fontSize: 18, color: "#039be5", marginRight: 1}}/>{"Kitchen"}</MenuItem>
                                    <MenuItem value={1} sx={{alignItems: "center"}}><ChairIcon sx={{fontSize: 18, color: "#039be5", marginRight: 1}}/>{"Living Room"}</MenuItem>
                                    <MenuItem value={2} sx={{alignItems: "center"}}><SingleBedIcon sx={{fontSize: 18, color: "#039be5", marginRight: 1}}/>{"Bed Room"}</MenuItem>
                                    <MenuItem value={3} sx={{alignItems: "center"}}><BusinessIcon sx={{fontSize: 18, color: "#039be5", marginRight: 1}}/>{"Office"}</MenuItem>
                                    <MenuItem value={4} sx={{alignItems: "center"}}><GarageIcon sx={{fontSize: 18, color: "#039be5", marginRight: 1}}/>{"Garage"}</MenuItem>
                                </Field>
                                <FormHelperText error={errors?.type}>{touched.type && errors?.type}</FormHelperText>
                            </FormControl>

                            <FormControl sx={{display: "flex", flexDirection: "inherit"}}>
                                <Button 
                                    variant="text"
                                    onClick={handleClose}
                                    sx={{marginTop: 2, width: "100%", marginInline: 2}}
                                    disabled={isSubmitting}
                                >
                                    <Typography variant="button" sx={{fontFamily: "inherit",fontWeight: 500 }} >
                                        {'Cancel'} 
                                    </Typography>
                                </Button>
                                <Button 
                                    variant="contained"
                                    type={"submit"}
                                    sx={{marginTop: 2, width: "100%", marginInline: 2}}
                                    disabled={isSubmitting}
                                >
                                    <Typography variant="button" sx={{fontFamily: "inherit",fontWeight: 500 }} >
                                        {'Save'} 
                                    </Typography>
                                </Button>
                            </FormControl>
                        </form>
                    )}
                </Formik>
                

            </Paper>
        </Modal>
    );
}

export default AddRoom;
