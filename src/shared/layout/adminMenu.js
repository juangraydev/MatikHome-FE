import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {
	Box,
	List,
    ListItem,
    ListItemButton,
    Typography,
    Menu,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Divider
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import HomeIcon from '@mui/icons-material/Home';

import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';

import { 
    selectHome,
    selectRoom
} from '.././../modules/user/dashboard/store/actionCreators'



export default function AdminLayout () {
	const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selected, setSelected] = React.useState(0);

    const [anchorElHome, setAnchorElHome] = React.useState(null);
    const [openAddHome, setOpenAddHome] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const navOptions = [
        {
            Label: "Dashboard",
            icon: <ViewQuiltIcon/>,
            link: "/admin"
        },
        {
            Label: "User Management",
            icon: <GroupIcon/>,
            link: "/admin/user-management"
        },
        {
            Label: "Home Management",
            icon: <HomeIcon />,
            link: "/admin/home-management"
        },
        {
            Label: "Device Management",
            icon: <DevicesOtherIcon />,
            link: "/admin/device-management"
        },
    ]
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSelectOption = (index, link) => {
        setSelected(index)
        handleDrawerToggle()
        navigate(link)
    }

    return (
        <React.Fragment>
            <List sx={{maxHeight: 'calc(48px * 5)', overflow: 'auto', marginInline: 1}}>
                {navOptions?.map((option, index) => {
                    return (
                        <ListItem key={option?.Label+index} disablePadding onClick={()=>handleSelectOption(index, option?.link)}>
                            <ListItemButton
                                sx={{
                                    borderRadius: 1,
                                    backgroundColor: selected == index ? "#00AEEF" : "none",
                                    transition: 'backgroundColor 2s',
                                    '&:hover': {
                                        background: selected == index ? "#00AEEF" : "none"
                                    }
                                }}
                            >
                                <ListItemIcon 
                                    sx={{
                                        minWidth: '35px',
                                        color: selected == index ? "#FFF" : "#039be5"
                                    }}
                                >
                                    {option?.icon}
                                </ListItemIcon>
                                {/* <ListItemText primary={ option?.Label }/> */}
                                <Typography variant={ selected == index ? 'menuSelected' : 'menu'}>
                                    { option?.Label }
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
	    </React.Fragment>
    );
}