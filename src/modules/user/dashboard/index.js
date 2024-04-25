import React from "react";
import {
	Container,
	Box,
	Typography,
    Grid,
	Breadcrumbs,
	Button
} from "@mui/material"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { isJsonString } from "../../../shared/util/common"
import {HomeModalDelete} from "../home-setting/index"
// import Grid from '@mui/material/Unstable_Grid2';
import { homeList } from "./service";
import { useSelector, useDispatch } from 'react-redux'
import { 
    selectHome
} from './store/actionCreators'
import HomeSetting from "./component/HomeSetting"

import { io } from 'socket.io-client';
import _ from "lodash";
import Channel from "../component/Channel";

function UserDashboard() {
    const [devices, setDevices] = React.useState([]);
	const [homeModal, setHomeModal] = React.useState();
    const [client, setClient] = React.useState()
    const homeData = useSelector(state => state.homeData.data)
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
            client.on("connect", () => {
				console.log("[home_device][connect]", selectedHome?.id);
                client.emit("home_device", selectedHome?.id.replaceAll("-", ""))
            });

            client.on(`db_devices_${selectedHome?.id.replaceAll("-", "")}`, (res) => {
				console.log("[home_device][db_devices]", selectedHome?.id, res);
                client.emit("home_device", selectedHome?.id.replaceAll("-", ""))
                // setDevices(res)
            });

			client.on(`devices_${selectedHome?.id.replaceAll("-", "")}`, (res) => {
				console.log("[home_device][devices]", selectedHome?.id.replaceAll("-", ""), res);
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

	const roomName = (id) => {
		return selectedHome?.rooms.filter((room) => room?.id.replaceAll("-","") === id)[0]?.name
	}

	let devicesGroupByRoom = Object.groupBy(devices, device => device.room_id);

	let RoomChannel = []

	if(devicesGroupByRoom[null]?.length){
		RoomChannel.push({channels: devicesGroupByRoom[null]})
	}
	
	
	for( const room in selectedHome?.rooms || []){
		if(devicesGroupByRoom[selectedHome.rooms[room]?.id.replaceAll("-","")]){
			let temp = {
				...selectedHome.rooms[room],
				channels: devicesGroupByRoom[selectedHome.rooms[room]?.id.replaceAll("-","")]
			}
			RoomChannel.push(temp)
		}
	}

	const handleOpenModalRemoveHome = (data) => {
		setHomeModal(true)
	}

	const handleCloseModalRemoveHome = (data) => {
		setHomeModal(false)
	}

	return (
		<>
			<Container maxWidth={false} sx={{ paddingY: 1.5, margin: 0 }}>
				<Box
					component={"div"}
					sx={{
						paddingBottom: 1.5,
						display: "flex",
                        flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<Box>
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
					</Box>
					<Box sx={{width: 'fit-content'}}>
						<Button variant="outlined" color="error" startIcon={<ExitToAppIcon />} onClick={()=>{handleOpenModalRemoveHome()}}>
							Leave Home
						</Button>
						{
							homeModal && <HomeModalDelete handleClose={handleCloseModalRemoveHome}/>
						}
						<Box component={"div"}>
							<HomeSetting />
						</Box>
					</Box>
				</Box>
				<Box
					component={"div"}
					sx={{
						display: "flex",
						flexWrap: "wrap",
						mt: 2,
					}}
				>
					
					<Grid container spacing={2}>
						<Grid item spacing={2} xs={12}>
							{(selectedRoom === 'ALL' ? RoomChannel : RoomChannel.filter(roomchannel => roomchannel.id?.replaceAll("-", "") === selectedRoom) )?.map((room) => {
								return <Grid container spacing={2} sx={{marginBlock:"10px"}} >
									{
										selectedRoom === 'ALL' && (
											<Grid item xs={12}> 
												<Typography
													variant="subtitle1"
													sx={{
														flexGrow: 1,
														color: '#808080'
													}}
												>
													{room && room.name &&
														room.name.charAt(0).toUpperCase() +
														room.name.slice(1)}
												</Typography>

											</Grid>
										)
									}
									{room?.channels.map((device) => {
										const val = (device?.type === 1  || device?.type === 2) ? true : isJsonString(device.status) ? JSON.parse(device.status)?.on : device.status;
											
										return (
											<Grid
												item
												xs={6}
												sm={6}
												md={4}
												lg={3}
												xl={2}
											>
												<Channel
													data={device}
													onToggle={handleClickChannel}
													val={val}
													icon={<></>}
												/>
											</Grid>
										);
									})}
								</Grid>
							})}
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
}

export default UserDashboard;