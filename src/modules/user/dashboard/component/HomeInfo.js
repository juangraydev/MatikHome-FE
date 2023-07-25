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
    Icon,
    TextField,
    OutlinedInput
} from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';
import { 
    selectHome,
    selectRoom
} from '../store/actionCreators'
import { Settings, Troubleshoot } from "@mui/icons-material";
import LetterAvatar from '../../../../shared/components/avatar'
import Fade from '@mui/material/Fade';

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useSelector, useDispatch } from 'react-redux'
import { space } from "postcss/lib/list";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -10%)',
    minWidth: 292,
    width: "100%",
    maxWidth: 500,
    height: '400px',
    overFlow: "scroll",
    display: "block",
    p: 2
  };

export default function HomeInfo() {

    const selectedHome = useSelector(state => state.homeData.selectedHome)
    // const handleOpenHomeSetting = (event) => {
    //     setAnchorElDashboardMenu(Troubleshoot)
    // }

    // const handleCloseHomeSetting = () => {
    //     setAnchorElDashboardMenu(null)
    // }
    

    return (
    <>
        <Box
            id="home-info"
        >
            <Box style={{display: "flex", alignItems: "center"}}>
                <IconButton onClick={()=>{}}>
                    <ArrowBackIcon sx={{fontSize: 20}}/> 
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1}}>Home Information</Typography>
                <IconButton sx={{float: "right"}}>
                    <CloseIcon sx={{fontSize: 20}}/>
                </IconButton>
            </Box>
            <Box
                sx={{mt:1.5, gap: 2, display: 'flex', flexDirection: 'column'}}
            >
                <Box>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: 16
                        }}
                    >
                        Home Nickname
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 16
                        }}
                    >
                        {selectedHome?.name}
                    </Typography>
                    <Typography 
                        gutterBottom 
                        sx={{
                            fontFamily: "inherit",
                            fontSize: '12px', 
                            color: "rgba(0, 0, 0, 0.6)", 
                            textAlign: "left", 
                            fontWeight: 600, 
                            marginTop: 3
                        }}
                    >
                        Home Nickname
                    </Typography>
                    <Typography  
                        sx={{
                            fontFamily: "inherit",
                            fontSize: '16px', 
                            color: "rgba(0, 0, 0, 0.6)", 
                            textAlign: "left", 
                            fontWeight: 600, 
                        }}
                    >
                    {selectedHome?.name}
                    </Typography>
                    <OutlinedInput 
                        id="homenickname" 
                        placeholder="Home Nickname" 
                        sx={{width: "-webkit-fill-available"}}
                        size="small"
                    />
                </Box>

                {/* {/* <TextField 
                    label={'Home Nickname'} 
                    value={selectedHome?.name}
                    sx={{
                        width: '100%'
                    }}    
                /> */}
                <TextField 
                    label={'Home Address'} 
                    value={selectedHome?.address}
                    sx={{
                        width: '100%'
                    }}    
                /> 
            </Box>
        </Box>

    </>
  );
}