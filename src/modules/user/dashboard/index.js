import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Container,
	Box,
	Typography,
	Paper,
    Grid,
} from "@mui/material"

import Modal from "../../../shared/components/modal/index"
// import Grid from '@mui/material/Unstable_Grid2';
import TungstenIcon from '@mui/icons-material/Tungsten';
import { homeList } from "./service";

import { w3cwebsocket as W3CWebSocket } from "websocket";

import GeneralSetting from "../component/GeneralSetting"
import { useSelector, useDispatch } from 'react-redux'
import { 
    selectHome,
    selectRoom
} from './store/actionCreators'



function UserDashboard() {
    const navigate  = useNavigate();
    const [devices, setDevices] = React.useState([]);
    const [rooms, setRooms] = React.useState([]);
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
            if(selectedHome == null){
                dispatch(selectHome(homeData[0]))
            }else {
                let tempHome = homeData.filter(home => {
                    return home?.id == selectedHome?.id
                })
                
                dispatch(selectHome(tempHome[0]))
            }
            dispatch(selectRoom("ALL")) 
        }
    },[homeData])

    //SET ROOMS TO COMPONENT STATE
    React.useEffect(()=>{
        if(selectedHome) {
            setRooms(selectedHome['rooms'])
        }
        
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

    const handleClickChannel = (id, status) => {
        client.send(JSON.stringify({
            'type': "deviceInfo",
            "channelId": id,
            "status": status
        }))
    }

    const handleCloseModal = () => {
        setModal({...modal, status: false});
    }

    return (
    <>
        <Modal open={modal?.status} handleClose={handleCloseModal}>
            {selectedHome?.name && <GeneralSetting data={selectedHome}/>}
        </Modal>
        <Container maxWidth={"xl"} sx={{padding: "24px 24px", margin: 0}}> 
            <Box sx={{ width: '100%' }}>
                { isHomeDataPending ?  <>Loading .....</> 
                : <Grid container spacing={2} columnGap={0}>
                    <Grid item xs={12} sx={{display: "flex", alignItems: "center"}}>
                        <Typography variant="button" gutterBottom sx={{fontWeight: 600, marginBlock: 0.35, color: "#757575" }} >
                        {
                            ((selectedRoom == "ALL" 
                                ? selectedHome?.name?.toUpperCase() 
                                : rooms.filter(room => room?.id == selectedRoom)[0]?.name) + "'s Control Panel")
                        } 
                        </Typography>
                    </Grid>
                    <>
                        {
                            devices 
                                ? devices.map((device, idx) => {
                                    const val = JSON.parse(device.status)?.on
                                    return(
                                        <Grid item xs={6} sm={6} md={4} lg={2} xl={2}>
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
                            }) : (
                                <></>
                            )
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
