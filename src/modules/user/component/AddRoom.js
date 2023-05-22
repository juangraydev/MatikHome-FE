import React from "react";
import { Form, useNavigate } from "react-router-dom";
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
    FormControl
} from "@mui/material"
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
// import Grid from '@mui/material/Unstable_Grid2';

import Select from '@mui/material/Select';


import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -60%)',
    width: 300,
    p: 2,
  };



  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));
  


function AddRoom({open, setOpen}) {
    const [roomType, setRoomType] = React.useState(0)


    const handleClose =() => {
        setOpen(false)
    }

    const handleChange = (e) => {
        setRoomType(e.target.value)
    }

    const types = () => {

    }


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper sx={style}>
                <div style={{display: "flex"}}>
                    <Typography variant="h6" sx={{ flexGrow: 1}}>Add Room</Typography>
                    <IconButton onClick={handleClose} sx={{float: "right"}}>
                        <CloseIcon/>
                    </IconButton>
                </div>
                
                <FormControl fullWidth>
                    <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 2}}>
                        Room Name
                    </Typography>
                    <OutlinedInput 
                        id="username" 
                        placeholder="Room Name" 
                        sx={{width: "-webkit-fill-available"}}
                        // onChange={handleOnChange}
                        // error={formError?.username}
                    />
                    {/* <FormHelperText error={formError?.username}>{formError?.username}</FormHelperText> */}
                </FormControl>
                
                <FormControl fullWidth>
                    <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 500, marginTop: 2}}>
                        Room Type
                    </Typography>
                    <Select
                        id="demo-simple-select"
                        value={roomType}
                        onChange={handleChange}
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
                    </Select>
                </FormControl>

                <FormControl sx={{display: "flex", flexDirection: "inherit"}}>
                    <Button 
                        variant="text"
                        // onClick={handleSubmitForm}
                        sx={{marginTop: 2, width: "100%", marginInline: 2}}
                    >
                        <Typography variant="button" sx={{fontFamily: "inherit",fontWeight: 500 }} >
                            Cancel 
                        </Typography>
                    </Button>
                    <Button 
                        variant="contained"
                        // onClick={handleSubmitForm}
                        sx={{marginTop: 2, width: "100%", marginInline: 2}}
                    >
                        <Typography variant="button" sx={{fontFamily: "inherit",fontWeight: 500 }} >
                            Save 
                        </Typography>
                    </Button>
                </FormControl>

            </Paper>
        </Modal>
    );
}

export default AddRoom;
