import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
	Container,
	Box,
    Button,
	Typography,
	Paper,
    Grid,
    IconButton,
	InputAdornment,
    Menu,
    Stack,
    Modal,
    Icon,
    TextField,
    OutlinedInput,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
	List,
	ListItem,
	ListItemIcon,
	ListItemButton,
	MenuItem,
	ListItemText,
	ListItemSecondaryAction,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions
} from "@mui/material"

import { editHome } from '../dashboard/service'

import CloseIcon from '@mui/icons-material/Close';
import { 
    selectHome,
    selectRoom
} from '../dashboard/store/actionCreators'
import _ from 'lodash'
import { Add, Cancel, Close, Delete, DeleteForever, Edit, EditAttributes, EditRounded, Note, Save, Settings, Search, Troubleshoot, Update } from "@mui/icons-material";
import LetterAvatar from '../../../shared/components/avatar'
import Fade from '@mui/material/Fade';
import FormHelperText from '@mui/material/FormHelperText';

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
import { addRoom } from '../dashboard/service'
import HomeInfo from "../dashboard/component/HomeInfo";
import HomeHolds from "../dashboard/component/Homeholds";

import RoomField from "../../admin/module/component/RoomField.js"
import MoreVertIcon from '@mui/icons-material/MoreVert';

const style = {
    // position: 'absolute',
    // top: '10%',
    // left: '50%',
    // transform: 'translate(-50%, -10%)',
    // minWidth: 292,
    width: "100%",
    // maxWidth: 500,
    height: '100%',
	// overflow: 'hidden',
    display: "block",
    p: 2,
  };


export default function HomeSetting({open, handleCloseHomeSetting}) {
	const navigate = useNavigate();
    const dispatch = useDispatch()
    // const [anchorElDashboardMenu, setAnchorElDashboardMenu] = React.useState(null);
    const [genInfoEdit , setGenInfoEdit] = React.useState(null);
	const [home, setHome] = React.useState({})
	const [roomModal, setRoomModal] = React.useState(null)
	const [inviteModal, setInviteModal] = React.useState(null)
	const [roomMenuEl, setRoomMenuEl] = React.useState(null);


	
	const roomMenuOpen = Boolean(roomMenuEl);

    const homeData = useSelector(state => state.homeData.data)
    const selectedHome = useSelector(state => state.homeData.selectedHome)

	React.useEffect(()=>{
		let tempHome = homeData.filter(home => {
			return home?.id === selectedHome?.id
		})
		console.log("[home]", homeData, selectedHome);

		// console.log("tempHome",tempHome[0]);
		
		dispatch(selectHome(tempHome[0]))
		
	}, [homeData])

	React.useEffect(()=>{

		setHome(selectedHome)
	}, [selectedHome])
    
    const homeInfoSchema = Yup.object().shape({
        name: Yup.string()
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
        address: Yup.string()
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
    });


	
	const handleOpenRoomMenu = (event, id) => {
		setRoomMenuEl(event.currentTarget);
	};
	const handleCloseRoomMenu = () => {
		setRoomMenuEl(null);
	};
	
	  

	const editHomeAPI = (data) => {
		console.log("[data]", data);
        dispatch(editHome(data))
    }

	const handleRoomSetting = (roomId) => {
		navigate(`/dashboard`)
		dispatch(selectRoom(roomId.replaceAll("-",""))) 
	}

	const handleAddRoom = () => {
		setRoomModal(true)
	}

	const handleCloseRoom = () => {
		setRoomModal()
	}

	const handleInviteUser = () => {
		setInviteModal(true)
	}

	const handleCloseInvite = () => {
		setInviteModal()
	}

	
	console.log("[selectedHome]",home	);
    return (
		<Box id="main" sx={style}>
			<Box id="wrapper" >
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Box id="gen_info" sx={{ minHeight: 250 }}>
							<Formik
								initialValues={home}
								enableReinitialize={true}
								validationSchema={homeInfoSchema}
								onSubmit={(values, { setSubmitting, resetForm }) => {
									setGenInfoEdit(null);
									setTimeout(() => {
										let temp_data = {
											id: values?.id,
											name: values?.name,
											address: values?.address,
										};
										if (!_.isEqual(values, home))
											editHomeAPI(temp_data);

										setSubmitting(false);
									}, 400);
									resetForm();
								}}
							>
								{({
									values,
									errors,
									touched,
									handleChange,
									handleSubmit,
									handleBlur,
								}) => (
									<Form>
										<List component={Paper} >
											<ListItem>
												<Typography
													variant="h5"
													sx={{ fontWeight: 600 }}
												>
													Home General Information
												</Typography>
												<ListItemSecondaryAction>
													{
														genInfoEdit
														? 	<>
																<IconButton onClick={handleSubmit}>
																	<Save/>
																</IconButton>
																<IconButton onClick={()=>{setGenInfoEdit(null)}}>
																	<Cancel/>
																</IconButton>
															</>
														: 	<IconButton onClick={()=>{setGenInfoEdit(true)}}>
																<EditRounded/>
															</IconButton>
													}
												</ListItemSecondaryAction>
											</ListItem>
											<ListItem sx={{display: "block"}}>
												<Typography
													gutterBottom
													sx={{
														fontFamily: "inherit",
														fontSize: "12px",
														color: "rgba(0, 0, 0, 0.6)",
														textAlign: "left",
														fontWeight: 600,
													}}
												>
													Home Nickname
												</Typography>
												<OutlinedInput
													id="name"
													name="name"
													placeholder="Home Nickname"
													disabled={!genInfoEdit}
													sx={{
														width: "-webkit-fill-available",
													}}
													size="small"
													autoFocus
													// onBlur={handleSubmit}
													onChange={handleChange}
													value={values.name}
													error={
														touched?.name && errors?.name
													}
												/>
												<FormHelperText
													error={
														touched?.name && errors?.name
													}
												>
													{touched?.name && errors?.name}
												</FormHelperText>
											</ListItem>
											<ListItem sx={{display: "block"}}>
												<Typography
													gutterBottom
													sx={{
														fontFamily: "inherit",
														fontSize: "12px",
														color: "rgba(0, 0, 0, 0.6)",
														textAlign: "left",
														fontWeight: 600,
													}}
												>
													Home Address
												</Typography>
												<OutlinedInput
													id="address"
													name="address"
													placeholder="Home Address"
													sx={{
														width: "-webkit-fill-available",
													}}
													disabled={!genInfoEdit}
													size="small"
													autoFocus
													// onBlur={handleSubmit}
													onChange={handleChange}
													value={values.address}
													error={
														touched?.address &&
														errors?.address
													}
												/>
												<FormHelperText
													error={
														touched?.address &&
														errors?.address
													}
												>
													{touched?.address &&
														errors?.address}
												</FormHelperText>
											</ListItem>
										</List>
									</Form>
								)}
							</Formik>
						</Box>
						<Box id="room_list" sx={{ minHeight: 'calc(100vh - 350px)'}}>
							<List component={Paper}  sx={{ minHeight: 'calc(100vh - 362px)'}} >
								<ListItem>
									<Typography
										variant="h5"
										sx={{ fontWeight: 600 }}
									>
										Rooms List	
									</Typography>
									<ListItemSecondaryAction>
										<IconButton onClick={()=>{handleAddRoom()}}>
											<Add/>
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
								{
									home && home?.rooms?.map((room) => {	
										return(
											<ListItem>
												<ListItemIcon sx={{minWidth: 24, marginRight: 1 }}>
													{
														{
															0: <KitchenIcon />,
															1: <ChairIcon />,
															2: <SingleBedIcon />,
															3: <BusinessIcon />,
															4: <GarageIcon />,
															default: <ChairIcon />,
														}[room.type]
													}
												</ListItemIcon>
												<ListItemText primary={room?.name} sx={{textTransform: 'capitalize'}}/>
												<ListItemSecondaryAction>
													<IconButton onClick={handleOpenRoomMenu}>
														<MoreVertIcon/>
													</IconButton>
													<Menu
														id="basic-menu"
														anchorEl={roomMenuEl}
														open={roomMenuOpen}
														onClose={handleCloseRoomMenu}
														MenuListProps={{
														'aria-labelledby': 'basic-button',
														}}
													>
														<MenuItem onClick={handleCloseRoomMenu}>Edit</MenuItem>
														<MenuItem onClick={handleCloseRoomMenu} color="error">Remove</MenuItem>
													</Menu>
												</ListItemSecondaryAction>
											</ListItem>
										)
									})
								}
							</List>
						</Box>
					</Grid>
					<Grid item xs={6} sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
						<Box id="member_list" sx={{ height: 'calc(50vh - 64px)'}}>
							<List component={Paper} sx={{height: 'calc(50vh - 64px)'}}>
								<ListItem divider>
									<Typography
										variant="h5"
										sx={{ fontWeight: 600 }}
									>
										Home Members	
									</Typography>
									<ListItemSecondaryAction>
										<IconButton onClick={()=>{handleInviteUser()}}>
											<Add/>
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
								{
									home && home?.members?.map((user) => {	
										return(
											<ListItem divider>
												<ListItemText primary={user?.full_name} secondary={user?.role ? "Owner" : "Member"} sx={{textTransform: 'capitalize'}}/>
												<ListItemSecondaryAction>
													<IconButton onClick={()=>{handleRoomSetting(user?.id)}}>
														<Edit color="primary"/>
													</IconButton>
													<IconButton onClick={()=>{handleRoomSetting(user?.id)}}>
														<Delete color="error"/>
													</IconButton>
												</ListItemSecondaryAction>
											</ListItem>
										)
									})
								}
								
							</List>
						</Box>
						<Box id="device_list" sx={{ height: 'calc(50vh - 64px)'}}>
							<List component={Paper} sx={{height: 'calc(50vh - 64px)'}}>
								<ListItem divider>
									<Typography
										variant="h5"
										sx={{ fontWeight: 600 }}
									>
										Device List	
									</Typography>
									<ListItemSecondaryAction>
										<IconButton onClick={()=>{handleInviteUser()}}>
											<Add/>
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
								{
									home && home?.members?.map((user) => {	
										return(
											<ListItem divider>
												<ListItemText primary={user?.full_name} secondary={user?.role ? "Owner" : "Member"} sx={{textTransform: 'capitalize'}}/>
												<ListItemSecondaryAction>
													<IconButton onClick={()=>{handleRoomSetting(user?.id)}}>
														<Edit color="primary"/>
													</IconButton>
													<IconButton onClick={()=>{handleRoomSetting(user?.id)}}>
														<Delete color="error"/>
													</IconButton>
												</ListItemSecondaryAction>
											</ListItem>
										)
									})
								}
								
							</List>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<RoomModal open={roomModal} handleClose={handleCloseRoom}/>
			<InviteModal open={inviteModal} handleClose={handleCloseInvite}/>
		</Box>
	);
}




function RoomModal({open, handleClose}){
    const dispatch = useDispatch()
    const selectedHome = useSelector(state => state.homeData.selectedHome)

	const roomType = [
		{
		  value: 0,
		  icon: <KitchenIcon />,
		  label: 'Kitchen',
		},
		{
		  value: 1,
		  icon: <ChairIcon />,
		  label: 'Living Room',
		},
		{
		  value: 2,
		  icon: <SingleBedIcon />,
		  label: 'Bed Room',
		},
		{
		  value: 3,
		  icon: <BusinessIcon />,
		  label: 'Office',
		},
		{
		  value: 4,
		  icon: <GarageIcon />,
		  label: 'Garage',
		}
	  ];
	
	const room_schema = Yup.object().shape({
        type: Yup.string()
            .required('This Field is Required!'),
		name: Yup.string()
            .max(20, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
    });

	return(
		<Dialog
			open={open}
			onClose={handleClose}
			sx={{

			}}
		>
			<Formik
				initialValues={{
					type: 0,
					name: ''
				}}
				enableReinitialize={true}
				validationSchema={room_schema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setTimeout(() => {
						dispatch(addRoom(selectedHome, values))
						setSubmitting(false);
						handleClose()
					}, 400);
					resetForm();
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleSubmit,
					handleBlur,
				}) => (
					<Form>
						<DialogTitle sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 400}}>
							<Typography>
								Add Room
							</Typography>
							<IconButton onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</DialogTitle>
						<DialogContent dividers>
							<Box sx={{display: 'flex', flexDirection: 'column',}}>
								<TextField
									id="type"
									name="type"
									select
									label="Room Type"
									value={values?.type}
									onChange={handleChange}
									error={
										touched?.type && errors?.type
									}
									sx={{
										'& .MuiSelect-select': {
											display: "flex", 
											alignItems: "center",
											gap: 1
										},
										mb: 1	
									}}
									>
									{roomType.map((option) => (
										<MenuItem key={option.value} value={option.value} >
											{option.icon}
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField 
									// {...field} 
									id="name"
									type="text" 
									label="Room Name" 
									value={values?.name}
									onChange={handleChange}
									error={
										touched?.name && errors?.name
									}
									
								/>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button type="submit">
								Add
							</Button>
						</DialogActions>
					</Form>
				)}

			</Formik>


			
		</Dialog>
	)
}


function InviteModal({open, handleClose}){
    const dispatch = useDispatch()
    const selectedHome = useSelector(state => state.homeData.selectedHome)

	const roomType = [
		{
		  value: 0,
		  icon: <KitchenIcon />,
		  label: 'Kitchen',
		},
		{
		  value: 1,
		  icon: <ChairIcon />,
		  label: 'Living Room',
		},
		{
		  value: 2,
		  icon: <SingleBedIcon />,
		  label: 'Bed Room',
		},
		{
		  value: 3,
		  icon: <BusinessIcon />,
		  label: 'Office',
		},
		{
		  value: 4,
		  icon: <GarageIcon />,
		  label: 'Garage',
		}
	  ];
	
	const room_schema = Yup.object().shape({
        type: Yup.string()
            .required('This Field is Required!'),
		name: Yup.string()
            .max(20, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
    });

	return (
		<Dialog open={open} onClose={handleClose} sx={{}}>
			<Formik
				initialValues={{
					type: 0,
					name: "",
				}}
				enableReinitialize={true}
				validationSchema={room_schema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setTimeout(() => {
						dispatch(addRoom(selectedHome, values));
						setSubmitting(false);
						handleClose();
					}, 400);
					resetForm();
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleSubmit,
					handleBlur,
				}) => (
					<Form>
						<DialogTitle
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								width: 400,
							}}
						>
							<Typography>Invite Member</Typography>
							<IconButton onClick={handleClose}>
								<CloseIcon />
							</IconButton>
						</DialogTitle>
						<DialogContent dividers>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
								}}
							>
								 <TextField
									label="Search User"
									id="searchUser"
									placeholder="1020304050"
									// sx={{ m: 1, width: '25ch' }}
									InputProps={{
										startAdornment: <InputAdornment position="start"><Search/></InputAdornment>,
									}}
								/>
							</Box>
						</DialogContent>
						<DialogActions>
							<Button type="submit">Search</Button>
						</DialogActions>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
}