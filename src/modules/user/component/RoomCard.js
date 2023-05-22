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
    Grid
} from "@mui/material"
// import Grid from '@mui/material/Unstable_Grid2';
import SettingsIcon from '@mui/icons-material/Settings';
import Header from "./header"
import SelectHouse from "./selectHouse"
import TungstenIcon from '@mui/icons-material/Tungsten';
import { styled } from '@mui/material/styles';

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';

function RoomCard(props) {
    console.log("props.controlType",props.controlType);
    
    return (
    <>
        <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
            <Paper sx={{
                    backgroundColor: ((props.controlType == props.name || props.controlType == "ALL") ? "white" : "#e0e0e0"),
                    height: "80px", 
                    padding: 2, 
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onClick={() => props.setControlType(props.controlType == props.name ? "ALL" : props.name )}
            >
                {{
                    
                    0: (
                        <KitchenIcon sx={{fontSize: 55, color: (props.controlType == props.name || props.controlType == "ALL") ? "#039be5" : "#616161"}}/>
                    ),
                    1: (
                        <ChairIcon sx={{fontSize: 55, color: (props.controlType == props.name || props.controlType == "ALL") ? "#039be5" : "#616161"}}/>
                    ),
                    2: (
                        <SingleBedIcon sx={{fontSize: 55, color: (props.controlType == props.name || props.controlType == "ALL") ? "#039be5" : "#616161"}}/>
                    ),
                    3: (
                        <BusinessIcon sx={{fontSize: 55, color: (props.controlType == props.name || props.controlType == "ALL") ? "#039be5" : "#616161"}}/>
                    ),
                    4: (
                        <GarageIcon sx={{fontSize: 55, color: (props.controlType == props.name || props.controlType == "ALL") ? "#039be5" : "#616161"}}/>
                    ),
                    default: (
                        <ChairIcon sx={{fontSize: 55, color: (props.controlType == props.name || props.controlType == "ALL") ? "#039be5" : "#616161"}}/>
                    )
                }[props.icon]}
                <Typography variant="button" gutterBottom sx={{fontWeight: 600, marginBlock: 0.35, color: (props.controlType == props.name || props.controlType == "ALL") ? "#039be5" : "#616161" }} >
                    {props.name}
                </Typography>
            </Paper>
        </Grid>
    </>
    );
}

export default RoomCard;
