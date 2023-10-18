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


function CreateHome({handleClose}) {

    return (
        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper sx={style}>
                <Typography variant="h5" gutterBottom sx={{textAlign: "center", fontWeight: 600}}>
                    Create a Home
                </Typography>
            </Paper>
        </Modal>
    );
}

export default CreateHome;
