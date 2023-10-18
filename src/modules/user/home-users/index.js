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
import { Add, Cancel, Close, Delete, DeleteForever, Edit, EditAttributes, EditRounded, Note, Save, Search, Settings, Troubleshoot, Update } from "@mui/icons-material";
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
import InputAdornment from '@mui/material/InputAdornment';

import RoomField from "../../admin/module/component/RoomField.js"

const style = {
    // position: 'absolute',
    // top: '10%',
    // left: '50%',
    // transform: 'translate(-50%, -10%)',
    // minWidth: 292,
    width: "100%",
    // maxWidth: 500,
    height: '100%',
	overflow: 'hidden',
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

	console.log("[selectedHome]",home	);
    return (
		<Box id="main" sx={style}>
			<Box id="wrapper" sx={{overflow: 'hidden'}}>
				{/* <Box id="gen_info" sx={{ minHeight: 250 }}>
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
				</Box> */}
				<Box id="room_list" sx={{ minHeight: 400}}>
					<List component={Paper}>
						<ListItem divider>
							<Typography
								variant="h5"
								sx={{ fontWeight: 600 }}
							>
								Home Members	
							</Typography>
							<ListItemSecondaryAction>
								<IconButton onClick={()=>{handleAddRoom()}}>
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
				{/* <Box id="gen_info" sx={{ minHeight: 400 }}>
					<Typography variant="h5" sx={{ fontWeight: 600 }}>
						Home Setting
					</Typography>
					<Box sx={{pl: 2, py: 2}}>
						<Formik
							initialValues={selectedHome}
							enableReinitialize={true}
							validationSchema={homeInfoSchema}
							onSubmit={(
								values,
								{ setSubmitting, resetForm },
							) => {
								// setEdit(null);
								setTimeout(() => {
									let temp_data = {
										id: values?.id,
										name: values?.name,
										address: values?.address,
									};
									// if (!_.isEqual(values, homeInfo))
									// 	editHomeAPI(temp_data);

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
									<Box
										component={"div"}
										// onClick={() =>
										// 	handlEditField("nickname")
										// }
									>
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
											placeholder="Home Nickname"
											sx={{
												width: "-webkit-fill-available",
											}}
											size="small"
											autoFocus
											onBlur={handleSubmit}
											onChange={handleChange}
											value={values.name}
											error={
												touched?.name &&
												errors?.name
											}
										/>
										<FormHelperText
											error={
												touched?.name &&
												errors?.name
											}
										>
											{touched?.name &&
												errors?.name}
										</FormHelperText>
									</Box>

									<Box
										component={"div"}
										// onClick={() =>
										// 	handlEditField("address")
										// }
									>
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
											placeholder="Home Address"
											sx={{
												width: "-webkit-fill-available",
											}}
											size="small"
											autoFocus
											onBlur={handleSubmit}
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
									</Box>
									<RoomField 
										field={{label: 'Rooms', data: 'rooms', value: 'rooms', fieldType: 'room', align: 'left', width: '15%'}} 
										values={values }
										handleChange={handleChange}
										handleBlur={handleBlur}
										touched={touched}
										errors={errors}
										isHomeSetting={true}
									/>
								</Form>
							)}
						</Formik>
					</Box>
				</Box> */}
				{/* <Box id="members" sx={{ minHeight: 250 }}>
					<Typography variant="h5" sx={{ fontWeight: 600 }}>
						Members
					</Typography>
				</Box>
				<Box id="Devices" sx={{ minHeight: 250 }}>
					<Typography variant="h5" sx={{ fontWeight: 600 }}>
						Devices
					</Typography>
				</Box> */}
			</Box>
			{/* <Fade in={isSelected("home-overview")}>
				<Box
					id="home-overview"
					sx={{
						display: isSelected("home-overview") ? "block" : "none",
					}}
				> */}
			{/* <Box style={{ display: "flex" }}>
						<Typography variant="h6" sx={{ flexGrow: 1 }}>
							Setting
						</Typography>
						<IconButton
							onClick={handleCloseHomeSetting}
							sx={{ float: "right", fontSize: 10 }}
						>
							<CloseIcon size="small" />
						</IconButton>
					</Box>
					<Box>
						<Box
							component={"div"}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-start",
							}}
						>
							<Box>
								<Typography
									sx={{
										fontWeight: 600,
										fontSize: 20,
										color: "#141414",
									}}
								>
									{selectedHome?.name
										.charAt(0)
										.toUpperCase() +
										selectedHome?.name.slice(1)}
								</Typography>
								<Typography
									sx={{
										fontSize: 12,
										fontWeight: 600,
										color: "rgb(67, 77, 91)",
									}}
								>
									{selectedHome?.address}
								</Typography>
							</Box>
							<IconButton
								sx={{ backgroundColor: "#f1f6fc" }}
								onClick={() => {
									setScreenType("home-info");
								}}
							>
								<KeyboardArrowRightIcon size="small" />
							</IconButton>
						</Box>
					</Box> */}

			{/** Start Households */}
			{/* <Box
						component={"div"}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 1,
							mt: 1,
						}}
					>
						<Box
							component={"div"}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography
								variant="button"
								sx={{ fontWeight: 600 }}
							>
								Households
							</Typography>
							<IconButton
								sx={{ backgroundColor: "#f1f6fc" }}
								onClick={() => {
									setScreenType("home-holds");
								}}
							>
								<KeyboardArrowRightIcon size="small" />
							</IconButton>
						</Box>
						<Stack direction="row" spacing={1}>
							{selectedHome?.members &&
								selectedHome?.members?.map((member) => {
									return (
										<LetterAvatar name={member.full_name} />
									);
								})}
							<IconButton sx={{ padding: 0 }}>
								<LetterAvatar
									name="+"
									bgColor="#f1f6fc"
									color="#696d72"
								/>
							</IconButton>
						</Stack>
					</Box> */}
			{/** End Households */}

			{/** Start Rooms */}
			{/* <Box
						component={"div"}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 1,
							mt: 1,
						}}
					>
						<Box
							component={"div"}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography
								variant="button"
								sx={{ fontWeight: 600 }}
							>
								Rooms
							</Typography>
							<IconButton sx={{ backgroundColor: "#f1f6fc" }}>
								<KeyboardArrowRightIcon size="small" />
							</IconButton>
						</Box>
						<Stack
							component={"Stack"}
							direction="row"
							spacing={1}
							sx={{
								height: 55,
								overflowX: "auto",
								scrollPaddingTop: 2,
							}}
						>
							{selectedHome?.rooms?.map((room) => {
								return (
									<Button
										variant="contained"
										sx={{
											background: "#1976d2",
											color: "#fff",
											fontSize: "14px",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap",
											overflow: "hidden",
											minWidth: "fit-content",
											textAlign: "left",
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
									>
										{room?.name}
									</Button>
								);
							})}
						</Stack>
					</Box> */}
			{/** End Rooms */}

			{/** Start Devices */}
			{/* <Box
						component={"div"}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 1,
							mt: 1,
						}}
					>
						<Box
							component={"div"}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography
								variant="button"
								sx={{ fontWeight: 600 }}
							>
								Devices
							</Typography>
							<IconButton sx={{ backgroundColor: "#f1f6fc" }}>
								<KeyboardArrowRightIcon size="small" />
							</IconButton>
						</Box>
						<Stack
							component={"Stack"}
							direction="row"
							spacing={1}
							sx={{
								height: 55,
								overflowX: "auto",
								scrollPaddingTop: 2,
							}}
						></Stack>
					</Box> */}
			{/** End Devices */}
			{/* </Box>
			</Fade> */}

			{/* <HomeInfo
				setScreenType={setScreenType}
				handleCloseHomeSetting={handleCloseHomeSetting}
				isSelected={isSelected}
			/>

			<HomeHolds
				setScreenType={setScreenType}
				handleCloseHomeSetting={handleCloseHomeSetting}
				isSelected={isSelected}
			/> */}

			<InviteModal open={roomModal} handleClose={handleCloseRoom}/>
		</Box>
	);
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