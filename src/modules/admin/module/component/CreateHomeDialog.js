import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import { redirect, useNavigate } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import Stack from '@mui/material/Stack'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import * as Yup from "yup";
import { editHome, deleteHome, inviteUser, updateUser, removeMember, addDevice, deleteDevice, updateChannel, addRoom, editRoom, deleteRoom } from "../../../user/dashboard/service";
import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import { useSelector, useDispatch } from 'react-redux'
import _ from "lodash"

import {
	List,
	Paper,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	MenuItem,
	Menu
} from "@mui/material"

import {
    AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
	DeleteForever,
	MoreVert as MoreVertIcon,
	Add,
	Save,
	Cancel,
	EditRounded
} from '@mui/icons-material';
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {  Formik, Form, Field , FieldArray  } from 'formik';
import RoomField from './RoomField'
import { addHome, getHomeList } from '../../module/HomeManagement/store/service'
import { selectHome } from "../../../user/dashboard/store/actionCreators";
const steps = [
	"Create a home",
	"Add Room",
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiPaper-root": {
		maxWidth: 664,
	},
	"& .MuiDialogContent-root": {
		padding: theme.spacing(1),
		width: 664
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1)
	},
}));


export default function Addhome({ open, handleClose, onAdd, type, selected }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [initVal, setInitVal] = React.useState({
		name: null,
		address: null,
		rooms: [{type: 0, name: null}]
	})
	const [genInfoEdit, setGenInfoEdit] = React.useState(null);
	const [home, setHome] = React.useState({});
	
	const [roomModal, setRoomModal] = React.useState(null); //Add and edit room modal
	const [roomDeleteModal, setRoomDeleteModal] = React.useState(null); //Delete Room Modal
	const [roomModalType, setRoomModalType] = React.useState("add");
	const [roomModalData, setRoomModalData] = React.useState({});
	const [roomMenuEl, setRoomMenuEl] = React.useState(null);
	const roomMenuOpen = Boolean(roomMenuEl);
	
	const homeData = useSelector((state) => state.homeData.data);
	const selectedHome = useSelector((state) => state.homeData.selectedHome);
  

    const roomIcons = [
        {value: 0, label: <KitchenIcon sx={{height: 28}}/>},
        {value: 1, label: <ChairIcon sx={{height: 28}}/>},
        {value: 2, label: <SingleBedIcon sx={{height: 28}}/>},
        {value: 3, label: <BusinessIcon sx={{height: 28}}/>},
        {value: 4, label: <GarageIcon sx={{height: 28}}/>},
    ]
	
	React.useEffect(()=>{
		if(type === 'Edit') {
			console.log("[Select NI]", selected,homeData);
			setHome(selected);
		}
	}, [])
	console.log("[selected]", selected);

	const homeInfoSchema = Yup.object().shape({
		name: Yup.string()
		  .max(50, "Exceed from max 50 characters.")
		  .required("This Field is Required!"),
		address: Yup.string()
		  .max(50, "Exceed from max 50 characters.")
		  .required("This Field is Required!"),
	});

	const editHomeAPI = (data) => {
		dispatch(editHome(data));
	};


	// Room
	const handleOpenAddRoom = (type) => {
		console.log("[type]", type);
		setRoomModal(true);
		setRoomModalType(type);
	};

	const handleOpenRoomMenu = (event, data) => {
		console.log("[room menu]", data);
		setRoomMenuEl(event.currentTarget);
		setRoomModalData(data);
	};


	const handleCloseRoomMenu = () => {
		setRoomMenuEl(null);
	};


	const handleOpenDeleteRoom = () => {
		handleCloseRoomMenu();
		setRoomDeleteModal(true);
	};

	const handleCloseAddRoom = () => {
		setRoomModal();
	};

	const handleCloseDeleteRoom = () => {
		setRoomDeleteModal();
	};
	
	return (
		<BootstrapDialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={open}
		>
			<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
				{type === 'Edit' ? 'Edit' : 'Add' } Home
			</DialogTitle>
			<IconButton
				aria-label="close"
				onClick={handleClose}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>

			<DialogContent dividers>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Box sx={{ minWidth: 300 }}>
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
									if (!_.isEqual(values, home)) editHomeAPI(temp_data);

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
									<List component={Paper}>
									<ListItem>
										<Typography variant="h5" sx={{ fontWeight: 600, marginRight: 1 }}>
										Home General Information
										</Typography>
										<ListItemSecondaryAction>
										{genInfoEdit ? (
											<>
											<IconButton onClick={handleSubmit}>
												<Save />
											</IconButton>
											<IconButton
												onClick={() => {
												setGenInfoEdit(null);
												}}
											>
												<Cancel />
											</IconButton>
											</>
										) : (
											<div>
											<IconButton
												onClick={() => {
												setGenInfoEdit(true);
												}}
											>
												<EditRounded />
											</IconButton>
											</div>
										)}
										</ListItemSecondaryAction>
									</ListItem>
									<ListItem sx={{ display: "block" }}>
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
										error={touched?.name && errors?.name}
										/>
										<FormHelperText error={touched?.name && errors?.name}>
										{touched?.name && errors?.name}
										</FormHelperText>
									</ListItem>
									<ListItem sx={{ display: "block" }}>
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
										error={touched?.address && errors?.address}
										/>
										<FormHelperText
										error={touched?.address && errors?.address}
										>
										{touched?.address && errors?.address}
										</FormHelperText>
									</ListItem>
									</List>
								</Form>
								)}
							</Formik>
						</Box>
						<Box id="room_list" sx={{ minHeight: "calc(100vh - 350px)" }}>
							<List component={Paper} sx={{ minHeight: "calc(100vh - 362px)" }}>
								<ListItem>
								<Typography variant="h5" sx={{ fontWeight: 600 }}>
									Rooms List
								</Typography>
								<ListItemSecondaryAction>
									<IconButton
									onClick={() => {
										handleOpenAddRoom("add");
									}}
									>
									<Add />
									</IconButton>
								</ListItemSecondaryAction>
								</ListItem>
								{home &&
								home?.rooms?.map((room) => {
									return (
									<ListItem>
										<ListItemIcon sx={{ minWidth: 24, marginRight: 1 }}>
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
										<ListItemText
										primary={room?.name}
										sx={{ textTransform: "capitalize" }}
										/>
										<ListItemSecondaryAction>
										<IconButton
											onClick={(e) => handleOpenRoomMenu(e, room)}
										>
											<MoreVertIcon />
										</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
									);
								})}

								<Menu
								id="basic-menu"
								anchorEl={roomMenuEl}
								open={roomMenuOpen}
								onClose={handleCloseRoomMenu}
								MenuListProps={{
									"aria-labelledby": "basic-button",
								}}
								>
								<MenuItem onClick={(e) => handleOpenAddRoom("edit")}>
									Edit
								</MenuItem>
								<MenuItem onClick={handleOpenDeleteRoom}>Delete</MenuItem>
								</Menu>
							</List>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box>Item 3</Box>
						<Box>Item 4</Box>
					</Grid>
				</Grid>
			</DialogContent>
			{roomModal && (
				<RoomModal
				handleClose={handleCloseAddRoom}
				type={roomModalType}
				data={roomModalData}
				/>
			)}
			{roomDeleteModal && (
				<RoomModalDelete
				handleClose={handleCloseDeleteRoom}
				data={roomModalData}
				/>
			)}
		</BootstrapDialog>
	);
}


function RoomModal({ handleClose, type, data }) {
	const dispatch = useDispatch();
	const selectedHome = useSelector((state) => state.homeData.selectedHome);
	const [init, setInit] = React.useState({
	  type: 0,
	  name: "",
	});
  
	React.useEffect(() => {
	  console.log("[room modal data]", data, type);
	  if (type === "edit") setInit(data);
	}, []);
  
	const roomType = [
	  {
		value: 0,
		icon: <KitchenIcon />,
		label: "Kitchen",
	  },
	  {
		value: 1,
		icon: <ChairIcon />,
		label: "Living Room",
	  },
	  {
		value: 2,
		icon: <SingleBedIcon />,
		label: "Bed Room",
	  },
	  {
		value: 3,
		icon: <BusinessIcon />,
		label: "Office",
	  },
	  {
		value: 4,
		icon: <GarageIcon />,
		label: "Garage",
	  },
	];
  
	const room_schema = Yup.object().shape({
	  type: Yup.string().required("This Field is Required!"),
	  name: Yup.string()
		.max(20, "Exceed from max 50 characters.")
		.required("This Field is Required!"),
	});
  
	return (
	  <Dialog open={true} onClose={handleClose}>
		<Formik
		  initialValues={init}
		  enableReinitialize={true}
		  validationSchema={room_schema}
		  onSubmit={(values, { setSubmitting, resetForm }) => {
			setTimeout(() => {
			  if (type === "add") dispatch(addRoom(selectedHome, values));
			  else dispatch(editRoom(values));
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
				<Typography>
				  {type === "edit" ? "Edit" : "Create"} Room
				</Typography>
				<IconButton onClick={handleClose}>
				  <CloseIcon />
				</IconButton>
			  </DialogTitle>
			  <DialogContent dividers>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
				  <TextField
					id="type"
					name="type"
					select
					label="Room Type"
					value={values?.type}
					onChange={handleChange}
					error={touched?.type && errors?.type}
					sx={{
					  "& .MuiSelect-select": {
						display: "flex",
						alignItems: "center",
						gap: 1,
					  },
					  mb: 1,
					}}
				  >
					{roomType.map((option) => (
					  <MenuItem key={option.value} value={option.value}>
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
					error={touched?.name && errors?.name}
				  />
				</Box>
			  </DialogContent>
			  <DialogActions>
				<Button type="submit">
				  {type === "edit" ? "Update" : "Create"}
				</Button>
			  </DialogActions>
			</Form>
		  )}
		</Formik>
	  </Dialog>
	);
  }
  
  function RoomModalDelete({ handleClose, data }) {
	const dispatch = useDispatch();
	const selectedHome = useSelector((state) => state.homeData.selectedHome);
  
	const handleRemove = () => {
	  dispatch(deleteRoom(data?.id));
	  handleClose();
	};
  
	return (
	  <Dialog open={true} onClose={handleClose}>
		<DialogTitle
		  sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			width: 400,
		  }}
		>
		  <Typography>Remove Room</Typography>
		  <IconButton onClick={handleClose}>
			<CloseIcon />
		  </IconButton>
		</DialogTitle>
		<DialogContent dividers sx={{ maxWidth: 400, textAlign: "center" }}>
		  <Typography variant="h6" sx={{ fontWeight: 600 }}>
			Are you sure to Remove "{data.name}" room in "{selectedHome?.name}"
		  </Typography>
		</DialogContent>
		<DialogActions>
		  <Button color="error" onClick={handleRemove}>
			Remove
		  </Button>
		  <Button color="inherit" onClick={handleClose}>
			Cancel
		  </Button>
		</DialogActions>
	  </Dialog>
	);
  }