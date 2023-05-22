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
    IconButton,
    Menu,
    MenuItem,
    Grid
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import AddRoom from "../../../shared/components/addComponents/AddRoom/"
import AddDevice from "../../../shared/components/addComponents/AddDevice/"
import AddPeople from "../../../shared/components/addComponents/AddPeople/"

function AddMenu({}) {

    const [open, setOpen] = React.useState(null)
    const [openRoom, setOpenRoom] = React.useState(null)
    const [openPeople, setOpenPeople] = React.useState(null)
    

    //Add Menu\
    const settings = ['Add Room', 'Add Device', 'Add People'];
    const handleOpen = (event) => {
		setOpen(event.currentTarget);
    }

    const handleClose =() => {
		setOpen(null);
    }

    const handleSelect = (selected) => {
        handleClose()
        if(selected == 'Add Room'){
            handleOpenRoom()
        }else if (selected == 'Add People'){
            handleOpenPeople();
        }

        
    }

     //Add Room
    const handleOpenRoom = () => {
        setOpenRoom(true);
    }
 
    const handleCloseRoom =() => {
        setOpenRoom(false);
    }

      //Add People
    const handleOpenPeople = () => {
        setOpenPeople(true);
     }
 
     const handleClosePeople =() => {
        setOpenPeople(false);
     }
 
 




    return (
        
        <div style={{display: "block"}}>
            <IconButton  onClick={handleOpen}>
                <AddIcon/>
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="add-menu"
                anchorEl={open}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(open)}
                onClose={handleClose}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={(e) => handleSelect(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>

            <AddRoom open={openRoom} setOpen={setOpenRoom}/>     
            <AddPeople open={openPeople} setOpen={setOpenPeople}/>     
        </div>
    );
}

export default AddMenu;