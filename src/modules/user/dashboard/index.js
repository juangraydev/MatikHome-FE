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
import { isJsonString } from "../../../shared/util/common"
// import Grid from '@mui/material/Unstable_Grid2';
import { homeList, retrieveTempDevice } from "./service";
import GeneralSetting from "../component/GeneralSetting"
import { useSelector, useDispatch } from 'react-redux'
import { 
    selectHome,
    selectRoom
} from './store/actionCreators'
import { Power, Settings } from "@mui/icons-material";
import HomeSetting from "./component/HomeSetting"
import SensorDoorIcon from '@mui/icons-material/SensorDoor';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';



import TungstenIcon from '@mui/icons-material/Tungsten';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import PercentIcon from '@mui/icons-material/Percent';
import OutletIcon from '@mui/icons-material/Outlet';
import PowerIcon from '@mui/icons-material/Power';


import { io } from 'socket.io-client';
import _ from "lodash";



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
                dispatch(selectHome(tempHome[0]))
            }
            // dispatch(selectRoom("ALL")) 
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
        if(isNaN(selectedHome) && isNaN(selectedRoom) ){
            const socket = io(process.env.REACT_APP_WS_URL);
            setClient(socket)
        }
    }, [selectedHome, selectedRoom])


    // [WebSocket Functions]
    React.useEffect(()=>{
        if(client){
            // client-side
			
			console.log("[home_device]", selectedHome?.id);
            client.on("connect", () => {
                client.emit("home_devices", selectedHome?.id.replaceAll("-", ""))
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
        client.emit("channel", selectedHome?.id.replaceAll("-", ""), JSON.stringify({
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

	console.log("[selectedRoom]", devices);

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
				<Box
					component={"div"}
					sx={{
						display: "flex",
						// gap: 2,
						flexWrap: "wrap",
						mt: 2,
					}}
				>
					
					{
						selectedRoom === "ALL" 
						? <Grid container spacing={2}>
							{
								devices.length > 0 && Object.groupBy(devices, device => { console.log("[testing]", devices, device); return device.room_id;})[null]?.map((device, idx) => {
									const val = (device?.type === 1  || device?.type === 2) ? true : JSON.parse(device.status)?.on;
									return (
										<Grid
											item
											xs={6}
											sm={6}
											md={4}
											lg={3}
											xl={2}
										>
											{{
												1: (
													<Paper
														sx={{
															backgroundColor: "white",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
													>
														<ThermostatIcon 
														sx={{
															fontSize: 32,
															color: "#039be5",
														}}/>
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
																	color: "#039be5",
																}}
															>
																{device?.name}
															</Typography>
															<Typography
																variant="button"
																sx={{
																	fontWeight: 600,
																	color: "#039be5",
																}}
															>
																{device?.status + "°C"}
															</Typography>
														</Box>
													</Paper>
												),
												2: (
													<Paper
														sx={{
															backgroundColor: "white",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
													>
														<PercentIcon 
														sx={{
															fontSize: 32,
															color: "#039be5",
														}}/>
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
																	color: "#039be5",
																}}
															>
																{device?.name}
															</Typography>
															<Typography
																variant="button"
																sx={{
																	fontWeight: 600,
																	color: "#039be5",
																}}
															>
																{device?.status + "%"}
															</Typography>
														</Box>
													</Paper>
												),
												3: (
													<Paper
														sx={{
															backgroundColor: !val
																? "#e0e0e0"
																: "White",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
														onClick={(e)=>{
															handleClickChannel(
																device.id,
																!val,
															)
														}}
													>
														{
															val 
															? <SensorDoorIcon 
																sx={{
																	fontSize: 32,
																	color: !val
																		? "#616161"
																		: "#039be5",
																}}
															/>
															: <ToggleOffIcon 
																sx={{
																	fontSize: 32,
																	color: !val
																		? "#616161"
																		: "#039be5",
																}}
															/>
														}
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
																{val ? "Open" : "Close"}
															</Typography>
														</Box>
													</Paper>
												),
												4: (
													<Paper
														sx={{
															backgroundColor: !val
																? "#e0e0e0"
																: "White",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
														onClick={(e)=>{
															handleClickChannel(
																device.id,
																!val,
															)
														}}
													>
														{
															val 
															? <ToggleOnIcon 
																sx={{
																	fontSize: 32,
																	color: !val
																		? "#616161"
																		: "#039be5",
																}}
															/>
															: <ToggleOffIcon 
																sx={{
																	fontSize: 32,
																	color: !val
																		? "#616161"
																		: "#039be5",
																}}
															/>
														}
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
																{val ? "Open" : "Close"}
															</Typography>
														</Box>
													</Paper>
												),
												// 4: (
												// 	<Paper
												// 		sx={{
												// 			backgroundColor: !val
												// 				? "#e0e0e0"
												// 				: "White",
												// 			height: "auto",
												// 			padding: 2,
												// 			display: "flex",
												// 			flexDirection: "column",
												// 			width: "100%",
												// 		}}
												// 		onClick={(e)=>{
												// 			handleClickChannel(
												// 				device.id,
												// 				!val,
												// 			)
												// 		}}
												// 	>
												// 		<TungstenIcon 
												// 			sx={{
												// 				fontSize: 32,
												// 				color: !val
												// 					? "#616161"
												// 					: "#039be5",
												// 			}}
												// 		/>
												// 		<Box
												// 			sx={{
												// 				display: "flex",
												// 				flexDirection: "column",
												// 				paddingTop: "10px",
												// 			}}
												// 		>
												// 			<Typography
												// 				variant="button"
												// 				gutterBottom
												// 				sx={{
												// 					fontWeight: 600,
												// 					marginBlock: 0.35,
												// 					color: !val
												// 						? "#616161"
												// 						: "#039be5",
												// 				}}
												// 			>
												// 				{device?.name}
												// 			</Typography>
												// 			<Typography
												// 				variant="button"
												// 				sx={{
												// 					fontWeight: 600,
												// 					color: !val
												// 						? "#616161"
												// 						: "#039be5",
												// 				}}
												// 			>
												// 				{val ? "Open" : "Close"}
												// 			</Typography>
												// 		</Box>
												// 	</Paper>
												// ),
												5: (
													<Paper
														sx={{
															backgroundColor: !val
																? "#e0e0e0"
																: "White",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
														onClick={(e)=>{
															handleClickChannel(
																device.id,
																!val,
															)
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
																{val ? "Open" : "Close"}
															</Typography>
														</Box>
													</Paper>
												),
												6: (
													<Paper
														sx={{
															backgroundColor: !val
																? "#e0e0e0"
																: "White",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
														onClick={(e)=>{
															handleClickChannel(
																device.id,
																!val,
															)
														}}
													>
														<OutletIcon 
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
																{val ? "Open" : "Close"}
															</Typography>
														</Box>
													</Paper>
												)
												
											}[device.type]}
										</Grid>
									);
								})
							}
							{selectedHome && selectedHome?.rooms?.map((room) => {
								const devicesGroupByRoom = Object.groupBy(devices, device => {
									return device.room_id;
								});
								if(!devicesGroupByRoom[room?.id.replaceAll("-", "")]) return <></>
								return<Grid item spacing={2} xs={12}>
									<Grid container spacing={2}>
										<Grid item xs={12}> 
											<Typography
												variant="subtitle1"
												sx={{
													flexGrow: 1,
													color: '#808080'
												}}
											>
												{room &&
													room.name.charAt(0).toUpperCase() +
													room.name.slice(1)}
											</Typography>
										</Grid>
										{devicesGroupByRoom ? (
											<>
												{
													devicesGroupByRoom[room?.id.replaceAll("-", "")]?.map((device, idx) => {
														const val = (device?.type === 1  || device?.type === 2) ? true : isJsonString(device.status) ? JSON.parse(device.status)?.on : device.status;
														console.log("[device status]: " +device.type, val, device);
														return (
															<Grid
																item
																xs={6}
																sm={6}
																md={4}
																lg={3}
																xl={2}
															>
																{{
																	1: (
																		<Paper
																			sx={{
																				backgroundColor: "white",
																				height: "auto",
																				padding: 2,
																				display: "flex",
																				flexDirection: "column",
																				width: "100%",
																			}}
																		>
																			<ThermostatIcon 
																			sx={{
																				fontSize: 32,
																				color: "#039be5",
																			}}/>
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
																						color: "#039be5",
																					}}
																				>
																					{device?.name}
																				</Typography>
																				<Typography
																					variant="button"
																					sx={{
																						fontWeight: 600,
																						color: "#039be5",
																					}}
																				>
																					{device?.status + "°C"}
																				</Typography>
																			</Box>
																		</Paper>
																	),
																	2: (
																		<Paper
																			sx={{
																				backgroundColor: "white",
																				height: "auto",
																				padding: 2,
																				display: "flex",
																				flexDirection: "column",
																				width: "100%",
																			}}
																		>
																			<PercentIcon 
																			sx={{
																				fontSize: 32,
																				color: "#039be5",
																			}}/>
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
																						color: "#039be5",
																					}}
																				>
																					{device?.name}
																				</Typography>
																				<Typography
																					variant="button"
																					sx={{
																						fontWeight: 600,
																						color: "#039be5",
																					}}
																				>
																					{device?.status + "%"}
																				</Typography>
																			</Box>
																		</Paper>
																	),
																	3: (
																		<Paper
																			sx={{
																				backgroundColor: !val
																					? "#e0e0e0"
																					: "White",
																				height: "auto",
																				padding: 2,
																				display: "flex",
																				flexDirection: "column",
																				width: "100%",
																			}}
																			onClick={(e)=>{
																				handleClickChannel(
																					device.id,
																					!val,
																				)
																			}}
																		>
																			<SensorDoorIcon 
																			sx={{
																				fontSize: 32,
																				color: !val
																					? "#616161"
																					: "#039be5",
																			}}/>
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
																					{val ? "Open" : "Close"}
																				</Typography>
																			</Box>
																		</Paper>
																	),
																	4: (
																		<Paper
																			sx={{
																				backgroundColor: !val
																					? "#e0e0e0"
																					: "White",
																				height: "auto",
																				padding: 2,
																				display: "flex",
																				flexDirection: "column",
																				width: "100%",
																			}}
																			onClick={(e)=>{
																				handleClickChannel(
																					device.id,
																					!val,
																				)
																			}}
																		>
																			{
																				val 
																				? <ToggleOnIcon 
																					sx={{
																						fontSize: 32,
																						color:  "#039be5",
																					}}
																				/>
																				: <ToggleOffIcon 
																					sx={{
																						fontSize: 32,
																						color: "#616161",
																					}}
																				/>
																			}
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
																					{val ? "Open" : "Close"}
																				</Typography>
																			</Box>
																		</Paper>
																	),
																	5: (
																		<Paper
																			sx={{
																				backgroundColor: !val
																					? "#e0e0e0"
																					: "White",
																				height: "auto",
																				padding: 2,
																				display: "flex",
																				flexDirection: "column",
																				width: "100%",
																			}}
																			onClick={(e)=>{
																				handleClickChannel(
																					device.id,
																					!val,
																				)
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
																					{val ? "Open" : "Close"}
																				</Typography>
																			</Box>
																		</Paper>
																	),
																	6: (
																		<Paper
																			sx={{
																				backgroundColor: !val
																					? "#e0e0e0"
																					: "White",
																				height: "auto",
																				padding: 2,
																				display: "flex",
																				flexDirection: "column",
																				width: "100%",
																			}}
																			onClick={(e)=>{
																				handleClickChannel(
																					device.id,
																					!val,
																				)
																			}}
																		>
																			<OutletIcon 
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
																					{val ? "Open" : "Close"}
																				</Typography>
																			</Box>
																		</Paper>
																	)
																	
																}[device.type]}
															</Grid>
														);
													})
												}
											</>
										) : (
											<></>
										)}
									</Grid>
								</Grid>
							})}
						</Grid>
						: <Grid container spacing={2}>
							{devices ? (
							devices && 
								devices?.filter((device) =>
									selectedRoom === "ALL"
										? device
										: device?.room_id === selectedRoom,
								)
								?.map((device, idx) => {
									const val = (device?.type === 1  || device?.type === 2) ? true : JSON.parse(device.status)?.on;
									return (
										<Grid
											item
											xs={6}
											sm={6}
											md={4}
											lg={3}
											xl={2}
										>
											{{
												1: (
													<Paper
														sx={{
															backgroundColor: "white",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
													>
														<ThermostatIcon 
														sx={{
															fontSize: 32,
															color: "#039be5",
														}}/>
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
																	color: "#039be5",
																}}
															>
																{device?.name}
															</Typography>
															<Typography
																variant="button"
																sx={{
																	fontWeight: 600,
																	color: "#039be5",
																}}
															>
																{device?.status + "°C"}
															</Typography>
														</Box>
													</Paper>
												),
												2: (
													<Paper
														sx={{
															backgroundColor: "white",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
													>
														<PercentIcon 
														sx={{
															fontSize: 32,
															color: "#039be5",
														}}/>
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
																	color: "#039be5",
																}}
															>
																{device?.name}
															</Typography>
															<Typography
																variant="button"
																sx={{
																	fontWeight: 600,
																	color: "#039be5",
																}}
															>
																{device?.status + "%"}
															</Typography>
														</Box>
													</Paper>
												),
												3: (
													<Paper
														sx={{
															backgroundColor: !val
																? "#e0e0e0"
																: "White",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
														onClick={(e)=>{
															handleClickChannel(
																device.id,
																!val,
															)
														}}
													>
														<SensorDoorIcon 
														sx={{
															fontSize: 32,
															color: !val
																? "#616161"
																: "#039be5",
														}}/>
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
																{val ? "Open" : "Close"}
															</Typography>
														</Box>
													</Paper>
												),
												7: (
													<Paper
														sx={{
															backgroundColor: !val
																? "#e0e0e0"
																: "White",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
														onClick={(e)=>{
															handleClickChannel(
																device.id,
																!val,
															)
														}}
													>
														{
															val 
															? <ToggleOnIcon 
																sx={{
																	fontSize: 32,
																	color: !val
																		? "#616161"
																		: "#039be5",
																}}
															/>
															: <ToggleOffIcon 
																sx={{
																	fontSize: 32,
																	color: !val
																		? "#616161"
																		: "#039be5",
																}}
															/>
														}
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
																{val ? "Open" : "Close"}
															</Typography>
														</Box>
													</Paper>
												),
												4: (
													<Paper
														sx={{
															backgroundColor: !val
																? "#e0e0e0"
																: "White",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
														onClick={(e)=>{
															handleClickChannel(
																device.id,
																!val,
															)
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
																{val ? "Open" : "Close"}
															</Typography>
														</Box>
													</Paper>
												),
												5: (
													<Paper
														sx={{
															backgroundColor: !val
																? "#e0e0e0"
																: "White",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
														onClick={(e)=>{
															handleClickChannel(
																device.id,
																!val,
															)
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
																{val ? "Open" : "Close"}
															</Typography>
														</Box>
													</Paper>
												),
												6: (
													<Paper
														sx={{
															backgroundColor: !val
																? "#e0e0e0"
																: "White",
															height: "auto",
															padding: 2,
															display: "flex",
															flexDirection: "column",
															width: "100%",
														}}
														onClick={(e)=>{
															handleClickChannel(
																device.id,
																!val,
															)
														}}
													>
														<OutletIcon 
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
																{val ? "Open" : "Close"}
															</Typography>
														</Box>
													</Paper>
												)
												
											}[device.type]}
										</Grid>
									);
								})
						) : (
							<></>
						)}

						</Grid>
					}
				</Box>
			</Container>
		</>
	);
}

export default UserDashboard;
