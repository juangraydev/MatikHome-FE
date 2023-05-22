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
    Menu,
    MenuItem,
    Grid,
    IconButton
} from "@mui/material"

import Modal from "../../../shared/components/modal/index"
// import Grid from '@mui/material/Unstable_Grid2';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Header from "../component/header"
import SelectHouse from "../component/selectHouse"
import TungstenIcon from '@mui/icons-material/Tungsten';
import { styled } from '@mui/material/styles';
import { homeList } from "./service";

import { w3cwebsocket as W3CWebSocket } from "websocket";

import RoomCard from "../component/RoomCard"
import GeneralSetting from "../component/GeneralSetting"
import { useSelector, useDispatch } from 'react-redux'
import { 
    selectHome,
    selectRoom
} from './store/actionCreators'

// Add Menu Components
import AddMenu from "../component/AddMenu"


function UserDashboard() {
    const navigate  = useNavigate();

    //Add State
    const [openRoom, setOpenRoom] = React.useState(false);
    const [openPeople, setPeople] = React.useState(false);

    const [loading, setLoading] = React.useState(1);
    const [houses, setHouse] = React.useState([])
    const [selectedHouse, setSelectedHouse] = React.useState({})
    const [devices, setDevices] = React.useState([]);
    const [rooms, setRooms] = React.useState([]);
    const [controlType, setControlType] = React.useState("ALL");
    const [selectedRooms, setSelectedRooms] = React.useState("ALL");
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [modal, setModal] = React.useState({
        status: false,
        type: "houseSetting"
    })

    const [client, setClient] = React.useState()
    const homeData = useSelector(state => state.homeData.data)
    const isHomeDataPending = useSelector(state => state.homeData.isPending)
    const selectedHome = useSelector(state => state.homeData.selectedHome)
    const selectedRoom = useSelector(state => state.homeData.selectedRoom)

	const dispatch = useDispatch()
    
    //GET HOME LIST QUERY TO BACKEND
    React.useEffect(()=>{
        dispatch(homeList())
    }, [])

    //SET HOME LIST TO COMPONENT STATE
    React.useEffect(()=>{
        if (homeData) {
            setHouse(homeData)
            setSelectedRooms("ALL")
            if(selectedHome == null){
                dispatch(selectHome(homeData[1]))
                dispatch(selectRoom("ALL")) 
            }else {
                dispatch(selectRoom("ALL")) 
            }
        }
    },[homeData])

    //SET ROOMS TO COMPONENT STATE
    React.useEffect(()=>{
        if(selectedHome) setRooms(selectedHome['rooms'])
        
    },[selectedHome])

    // [WebSocket QUERY]
    React.useEffect(() => {
        if(isNaN(selectedHome)){
            const url = 'ws://localhost:8000/ws/'+ selectedHome?.id +'/' + selectedRoom  + '/';
            setClient(new W3CWebSocket(url))
        }
    }, [selectedHome,selectedRoom])


    // [WebSocket Functions]
    React.useEffect(()=>{
        if(client){
            client.onopen = () => {
                console.log("[WebSocket] client open");
            };
    
            client.onmessage = (message) => {
                const dataFromServer = JSON.parse(message.data);
                setDevices(dataFromServer?.deviceStatus)
                console.log("[WebSocket] deviceStatus", dataFromServer);
            };
    
            client.onclose = () => {
                console.log("[WebSocket] client close");
            };
        }
    }, [client])

    const handleOpenHomeMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

    const handleSelectHomeMenu = (value) => {
		handleCloseHomeMenu()
        if(value == "Home Setting") navigate("/home/setting");
    }
    
    const handleCloseHomeMenu = () => {
		setAnchorElUser(null);
	};


    const handleClickChannel = (id, status) => {
        console.log("[WebSocket] onClick Channel");
        client.send(JSON.stringify({
            'type': "deviceInfo",
            "channelId": id,
            "status": status
        }))
    }

    const handleSelectHouse = (house) => {
        dispatch(selectHome(house))
        dispatch(selectRoom("ALL"))
        setControlType("ALL")
    }

    const handleControlType = (type) => {
        console.log("[selected room]", )
        let roomId = rooms.filter(room => room?.name == type)[0]?.id ? rooms.filter(room => room?.name == type)[0]?.id : "ALL"
        dispatch(selectRoom(roomId)) 
        setControlType(type)
    }


    const handleOpenModal = () => {
        setModal({...modal, status: true});
    }
    const handleCloseModal = () => {
        setModal({...modal, status: false});
    }

    const settings = ['Home Setting', 'Device Setting', 'Accesibility Setting'];

    return (
    <>
        <Modal open={modal?.status} handleClose={handleCloseModal}>
            {selectedHome?.name && <GeneralSetting data={selectedHome}/>}
        </Modal>
        <Container maxWidth={"xl"} sx={{padding: "24px 24px"}}> 
            <Box sx={{ width: '100%' }}>
                { isHomeDataPending ?  <>Loading .....</> 
                : <Grid container spacing={2} columnGap={0}>
                    <Grid item xs={12} sx={{display: "flex", alignItems: "center"}}>
                        <div style={{flexGrow: 1, display: "flex" }}>
                            {houses.length != 0 && (<>
                                {/* <SelectHouse houses={houses} selected={selectedHome} setSelectedHouse={handleSelectHouse}/> */}
                                <Typography variant="h5">{  selectedHome?.name.charAt(0).toUpperCase() + selectedHome?.name.slice(1) }</Typography>
                                <IconButton sx={{marginLeft: "10px"}} onClick={handleOpenHomeMenu}>
                                    <SettingsIcon/>
                                </IconButton>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseHomeMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={(e) => handleSelectHomeMenu(setting)}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>)}
                        </div>
                        <AddMenu/>
                        
                        
                    </Grid>
                    <Grid item xs={12} sx={{display: "flex", alignItems: "center"}}>
                        <Typography variant="button" gutterBottom sx={{fontWeight: 600, marginBlock: 0.35, color: "#757575" }} >
                            Rooms 
                        </Typography>
                    </Grid>
                    
                    { rooms && rooms.map((room, idx) => <RoomCard setControlType={handleControlType} controlType={controlType} name={room?.name} icon={room?.type}/>) }
                    <Grid item xs={12} sx={{display: "flex", alignItems: "center"}}>
                        <Typography variant="button" gutterBottom sx={{fontWeight: 600, marginBlock: 0.35, color: "#757575" }} >
                        {
                            ((controlType.toUpperCase() == "ALL" ?  selectedHome?.name?.toUpperCase() : controlType.toUpperCase()) + "'s Control Panel")
                        } 
                        </Typography>
                    </Grid>
                    <>
                        {
                            devices.map((device, idx) => {
                                console.log("[devices]",device, JSON.parse(device.status))
                                const val = JSON.parse(device.status)?.on
                                
                                return(
                                    <Grid item xs={6} sm={4} md={3} lg={2} xl={2}>
                                        <Paper onClick={()=>handleClickChannel(device.id, !val)} sx={{
                                            backgroundColor: (!val ? "#e0e0e0" : "white"),
                                            height: "auto", 
                                            padding: 2, 
                                            display: "flex",
                                            flexDirection: "column"
                                        }}>
                                            <TungstenIcon 
                                                sx={{
                                                    fontSize: 32, 
                                                    color: (!val  ? "#616161" : "#039be5")
                                                }}
                                            />
                                            <Box sx={{display: "flex", flexDirection: "column", paddingTop: "10px"}}>
                                                <Typography variant="button" gutterBottom sx={{fontWeight: 600, marginBlock: 0.35, color: (!val  ? "#616161" : "#039be5") }} >
                                                    {device?.name}
                                                </Typography>
                                                <Typography variant="button" sx={{fontWeight: 600, color: (!val  ? "#616161" : "#039be5") }} >
                                                    {val ? "On" : "Off"}
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                        
                        
                    </>

                </Grid>
            }
                
            </Box>
        </Container>
    </>
  );
}

export default UserDashboard;
