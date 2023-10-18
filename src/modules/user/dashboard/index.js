import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
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

import Modal from "../../../shared/components/modal/index"
// import Grid from '@mui/material/Unstable_Grid2';
import TungstenIcon from '@mui/icons-material/Tungsten';
import { homeList } from "./service";
import GeneralSetting from "../component/GeneralSetting"
import { useSelector, useDispatch } from 'react-redux'
import { 
    selectHome,
    selectRoom
} from './store/actionCreators'
import { Settings } from "@mui/icons-material";
import HomeSetting from "./component/HomeSetting"

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';

import { io } from 'socket.io-client';



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
                    return home?.id === selectedHome?.id
                })

                console.log("tempHome",tempHome[0]);
                
                dispatch(selectHome(tempHome[0]))
            }
            // dispatch(selectRoom("ALL")) 
        }
    },[homeData])

	console.log("[homeData]", isHomeDataPending);

    //SET ROOMS TO COMPONENT STATE
    React.useEffect(()=>{
        if(selectedHome) {
            setRooms(selectedHome['rooms'])
        }
        
    },[selectedHome])

    // [WebSocket QUERY]
    React.useEffect(() => {
        if(isNaN(selectedHome) && isNaN(selectedRoom) ){
            const socket = io(process.env.REACT_APP_WS_URL);
            setClient(socket)
        }
    }, [selectedHome])


    // [WebSocket Functions]
    React.useEffect(()=>{
        if(client){
            // client-side
            client.on("connect", () => {
                client.emit("home_devices", selectedHome?.id)
            });

            client.on("home_devices", (res) => {
                console.log("res",res,selectedRoom);
                setDevices(res)
            });
            
            client.on("disconnect", () => {
                console.log("disconnect",client.id); 
            });
        }
    }, [client])

    const handleClickChannel = (id, status) => {
        client.emit("channel", selectedHome?.id, JSON.stringify({
            'type': "deviceInfo",
            "channelId": id,
            "status": status
        }))
    }

    const handleCloseModal = () => {
        setModal({...modal, status: false});
    }

    const handleChangeRoom = (event) => {
        dispatch(selectRoom(event.target.id.replaceAll("-","")))
    }

	// console.log("[selectedRoom]", selectedHome?.rooms.filter((room) => room?.id.replaceAll("-","") === selectedRoom)[0]);

	const roomName = (id) => {
		return selectedHome?.rooms.filter((room) => room?.id.replaceAll("-","") === id)[0]?.name
	}
    return (
		<>
			<Container maxWidth={false} sx={{ paddingY: 1.5, margin: 0 }}>
				<Box
					component={"div"}
					sx={{
						paddingBottom: 1.5,
						display: "flex",
                        flexDirection: 'column'
					}}
				>
					
					<Breadcrumbs 
						aria-label="breadcrumb"	
						sx={{
							flexGrow: 1,
						}}
					>
						<Typography
							variant="h4"
						>
							{selectedHome &&
								selectedHome.name.charAt(0).toUpperCase() +
									selectedHome.name.slice(1)}
						</Typography>
						<Typography
							variant="h5"
							sx={{
								textTransform: 'capitalize'
							}}
						>
							{selectedRoom &&
								roomName(selectedRoom)
							}
						</Typography>
					</Breadcrumbs>
                    <Typography
						variant="subtitle1"
						sx={{
							flexGrow: 1,
                            color: '#808080'
						}}
					>
						{selectedHome &&
							selectedHome.address.charAt(0).toUpperCase() +
								selectedHome.address.slice(1)}
					</Typography>
					<Box component={"div"}>
						<HomeSetting />
					</Box>
				</Box>

				{/* <Box
					component={"div"}
					sx={{
						display: "flex",
						gap: 1.5,
						height: 55,
						overflowX: "auto",
						scrollPaddingTop: 2,
					}}
				>
					<Button
						variant="contained"
						id="ALL"
						sx={{
							background:
								selectedRoom == "ALL" ? "#1976d2" : "#e5e5e5",
							color: selectedRoom == "ALL" ? "#fff" : "#000",
							fontSize: "14px",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							overflow: "hidden",
							minWidth: "fit-content",
							maxHeight: 36,
						}}
						onClick={handleChangeRoom}
					>
						All
					</Button>
					{rooms &&
						rooms.map((room) => {
							console.log("room", room);
							return (
								<Button
									variant="contained"
									sx={{
										background:
											selectedRoom == room?.id
												? "#1976d2"
												: "#e5e5e5",
										color:
											selectedRoom == room?.id
												? "#fff"
												: "#000",
										fontSize: "14px",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
										overflow: "hidden",
										minWidth: "fit-content",
										maxHeight: 36,
										"&:hover": {
											color: "white",
										},
									}}
									startIcon={
										{
											0: <KitchenIcon />,
											1: <ChairIcon />,
											2: <SingleBedIcon />,
											3: <BusinessIcon />,
											4: <GarageIcon />,
											default: <ChairIcon />,
										}[room.type]
									}
									id={room?.id}
									onClick={handleChangeRoom}
								>
									{room?.name}
								</Button>
							);
						})}
				</Box> */}
				<Box
					component={"div"}
					sx={{
						display: "flex",
						// gap: 2,
						flexWrap: "wrap",
						mt: 2,
					}}
				>
					<Grid container spacing={2}>
						{devices ? (
							devices
								?.filter((device) =>
									selectedRoom === "ALL"
										? device
										: device?.room_id === selectedRoom,
								)
								?.map((device, idx) => {
									const val = JSON.parse(device.status)?.on;
									return (
										<Grid
											item
											xs={6}
											sm={6}
											md={4}
											lg={3}
											xl={2}
										>
											<Paper
												onClick={() =>
													handleClickChannel(
														device.id,
														!val,
													)
												}
												sx={{
													backgroundColor: !val
														? "#e0e0e0"
														: "white",
													height: "auto",
													padding: 2,
													display: "flex",
													flexDirection: "column",
													width: "100%",
												}}
											>
												<TungstenIcon
													sx={{
														fontSize: 32,
														color: !val
															? "#616161"
															: "#039be5",
													}}
												/>
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
															color: !val
																? "#616161"
																: "#039be5",
														}}
													>
														{device?.name}
													</Typography>
													<Typography
														variant="button"
														sx={{
															fontWeight: 600,
															color: !val
																? "#616161"
																: "#039be5",
														}}
													>
														{val ? "On" : "Off"}
													</Typography>
												</Box>
											</Paper>
										</Grid>
									);
								})
						) : (
							<></>
						)}
					</Grid>
				</Box>

				{/* <Box sx={{ width: '100%' }}>
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
                
            </Box> */}
			</Container>
		</>
	);
}

export default UserDashboard;
