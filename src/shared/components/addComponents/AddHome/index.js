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

import { addHome, editHome } from "../../../../modules/user/dashboard/service"
import { useSelector, useDispatch } from 'react-redux'
import { Home } from "@mui/icons-material";

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

function AddHome({open, handleClose, data, type="add"}) {
	const dispatch = useDispatch()

    const [initVal, setInitVal] = React.useState({ name: '' });

    React.useEffect(()=>{
        if(data && type=="edit") {
            setInitVal({id: data?.id, name: data?.name})
        }else{
            setInitVal({ name: ''})
        }
    }, [data])
    
    const AddHomeAPI = (data) => {
        dispatch(addHome(data))
            .then(()=>{
                handleClose();
            })
    }

    const EditHomeAPI = (data) => {
        dispatch(editHome(data))
            .then(()=>{
                handleClose();
            })
    }

    return (
        <Modal
            key={'home'}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{margin: 1}}
        >
            <Paper sx={style}>
                <div style={{display: "flex"}}>
                    <Typography variant="h6" sx={{ flexGrow: 1}}>{type == "add" ? 'Add Home' : 'Edit Home'}</Typography>
                    <IconButton onClick={handleClose} sx={{float: "right"}}>
                        <CloseIcon/>
                    </IconButton>
                </div>

                <Formik
                    enableReinitialize
                    initialValues={initVal}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'This Field is Required';
                        } 
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            if(type == "add"){
                                AddHomeAPI(values)
                            }else if(type == "edit"){
                                EditHomeAPI(values)
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
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <FormControl fullWidth>
                                <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 2}}>
                                    {'Home Name'}
                                </Typography>
                                <OutlinedInput 
                                    id="name" 
                                    placeholder="Home Name" 
                                    sx={{width: "-webkit-fill-available"}}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    error={errors?.name}
                                />
                                <FormHelperText error={errors?.name}>{touched.name && errors?.name}</FormHelperText>
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

export default AddHome;
