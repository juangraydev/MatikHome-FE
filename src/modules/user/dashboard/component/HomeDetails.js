import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Container,
	Box,
    Button,
	Typography,
	Paper,
    Grid,
    IconButton,
    Menu,
    Stack,
    Modal,
    Icon
} from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';
import { 
    selectHome,
    selectRoom
} from '../store/actionCreators'
import { Settings, Troubleshoot } from "@mui/icons-material";
import LetterAvatar from '../../../../shared/components/avatar'

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useSelector, useDispatch } from 'react-redux'
import { space } from "postcss/lib/list";
const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -10%)',
    minWidth: 292,
    width: "100%",
    maxWidth: 500,
    p: 2
  };

export default function HomeDetails() {

    const [anchorElDashboardMenu, setAnchorElDashboardMenu] = React.useState(null);

    const selectedHome = useSelector(state => state.homeData.selectedHome)

    const handleOpenHomeDetailModal = (event) => {
        setAnchorElDashboardMenu(Troubleshoot)
    }

    const handleCloseHomeDetailModal = () => {
        setAnchorElDashboardMenu(null)
    }
    
    return (
    <>
        <Box>   
            <Box
                component={'div'}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start"
                }}
            >
                <Box>
                    <Typography 
                        sx={{
                            fontWeight: 600,
                            fontSize: 20,
                            color: "#141414"
                        }}
                    >
                        {selectedHome.name.charAt(0).toUpperCase() + selectedHome.name.slice(1)}
                    </Typography>
                    <Typography 
                        sx={{
                            fontSize: 12,
                            fontWeight: 600, 
                            color: "rgb(67, 77, 91)"
                        }}
                    >
                        {selectedHome?.address}
                    </Typography>
                </Box>
                <IconButton sx={{backgroundColor: "#f1f6fc"}} onClick={handleOpenHomeDetailModal}>
                    <KeyboardArrowRightIcon size="small" />
                </IconButton>
            </Box>
            <Box
                component={"div"}
                sx={{
                    paddingBlock: 1
                }}
            >
                <Stack direction="row" spacing={1}>
                    {
                        selectedHome?.members 
                            && selectedHome?.members?.map((member)=> {
                                let full_name = member?.first_name + " " + member?.last_name
                                return <LetterAvatar name={full_name}/>
                            })
                    }
                    <IconButton sx={{padding: 0}}>
                        <LetterAvatar name="+" bgColor="#f1f6fc" color="#696d72"/>
                    </IconButton>
                </Stack>
            </Box>
        </Box>

        
        {/* Edit Modal */}
        <Modal
            open={anchorElDashboardMenu}
            onClose={handleCloseHomeDetailModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{margin: 1}}
        >
            <Paper sx={style}>
                <div style={{display: "flex"}}>
                    <Typography variant="h6" sx={{ flexGrow: 1}}>Home Details</Typography>
                    <IconButton onClick={handleCloseHomeDetailModal} sx={{float: "right", fontSize: 10}}>
                        <CloseIcon size="small"/>
                    </IconButton>
                </div>
            </Paper>
        </Modal>
    </>
  );
}