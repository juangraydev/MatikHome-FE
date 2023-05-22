import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Container,
	Box,
	Link,
	Typography,
	Paper,
	TextField,
	Button,
    Modal,
    Grid
} from "@mui/material"
// import Grid from '@mui/material/Unstable_Grid2';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -60%)',
    width: 400,
    p: 4,
  };


function CreateHome({houses=[]}) {

    const [formData, setFormData] = React.useState({})
    const [formError, setFormError] = React.useState({})

    const handleOnChange = (event) => setFormData({...formData, [event.target.id]: event.target.value})

    const handleSubmitForm = () => {
        setFormError({})
        const error = validateForm(formData);
        setFormError(error)
        
    }
    
    const validateForm = () => {
        let Error = {};
        Object.keys(formData).map((data) => {
            if(formData[data].length === 0 || formData[data] === ""){
                Error = {...Error, [data]: "This Field is Required!"};
            }else if(data === "cpassword"){
                if(formData[data] != formData['password']){
                    Error = {...Error, [data]: "Password Do Not Match!"}
                }
            }
        })
        return Error;
    }

    return (
        <Container maxWidth={"xl"} sx={{padding: "24px 24px"}} id="waa"> 
            <Modal
                open={houses.length == 0 }
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper sx={style}>
                    <Typography variant="h5" gutterBottom sx={{textAlign: "center", fontWeight: 600}}>
                        Create a Home
                    </Typography>
                    <TextField 
                        id="name" 
                        label="Name" 
                        variant="outlined" 
                        onChange={handleOnChange}
                        sx={{marginTop: "15px", width: "100%"}} 
                        error={formError?.name}
                        helperText={formError?.name}
                    />
                </Paper>
            </Modal>
        </Container>
    );
}

export default CreateHome;
