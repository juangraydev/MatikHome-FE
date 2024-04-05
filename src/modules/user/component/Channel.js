import React from "react";

import {
	Container,
	Box,
    Button,
	Typography,
	Paper,
    Grid,
    IconButton,
    Menu,
    MenuItem,
	Breadcrumbs
} from "@mui/material"

import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

import TungstenIcon from '@mui/icons-material/Tungsten';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import PercentIcon from '@mui/icons-material/Percent';
import OutletIcon from '@mui/icons-material/Outlet';
import PowerIcon from '@mui/icons-material/Power';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';


const Channel = (props) =>{

    const {data, onToggle, val} = props

    const isOnline = () => {
        return data.device_status
    }

    return (
        <Paper
            sx={{
                backgroundColor: (val && isOnline()) ? "White" : "#e0e0e0",
                height: "auto",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                width: "100%",
                ':hover': {
                    boxShadow: 5, // theme.shadows[20]
                  },
            }}
            onClick={(e)=>{
                if (isOnline()){
                    onToggle(
                        data.id,
                        !val,
                    )
                }
            }}
        >
            {{
                1: (<ThermostatIcon sx={{fontSize: 32, color: "#039be5"}}/>),
                2: (<PercentIcon sx={{fontSize: 32, color: "#039be5"}}/>),
                3: (<SensorDoorIcon sx={{fontSize: 32, color: !val ? "#616161" : "#039be5"}}/>),
                4: (val ? <ToggleOnIcon sx={{fontSize: 32,color:  "#039be5",}}/> : <ToggleOffIcon sx={{fontSize: 32,color: "#616161",}}/>),
                5: (<TungstenIcon sx={{fontSize: 32,color: !val? "#616161": "#039be5"}}/>),
                6: (<OutletIcon sx={{fontSize: 32,color: !val? "#616161": "#039be5",}}/>)
                
            }[data.type]} 

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "10px",
                }}
            >
                <Typography
                    variant="button"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        marginBlock: 0.35,
                        color: (!val && isOnline)
                            ? "#616161"
                            : "#039be5",
                    }}
                >
                    {data?.name}
                </Typography>
                <Typography
                    variant="button"
                    sx={{
                        fontWeight: 600,
                        color: (!val && isOnline)
                            ? "#616161"
                            : "#039be5",
                    }}
                >
                    {isOnline ? (val ? "Open" : "Close") : 'Offline'}
                </Typography>
            </Box>
        </Paper>

    )
}

export default Channel;