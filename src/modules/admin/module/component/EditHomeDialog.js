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
	Menu,
	InputAdornment,
	Accordion,
	AccordionSummary,
	AccordionDetails
} from "@mui/material"

import {
    AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
	DeleteForever,
	ExpandMore as ExpandMoreIcon,
	MoreVert as MoreVertIcon,
	Add,
	Edit,
	Delete,
	Save,
	Cancel,
	EditRounded,
	ToggleOn as ToggleOnIcon,
	ToggleOff as ToggleOffIcon,
	Search,
	Tungsten as TungstenIcon,
	Outlet as OutletIcon
} from '@mui/icons-material';
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {  Formik, Form, Field , FieldArray  } from 'formik';
import RoomField from './RoomField'
import { addHome, getHomeList } from '../HomeManagement/store/service'
import { selectHome } from "../../../user/dashboard/store/actionCreators";
const steps = [
	"Create a home",
	"Add Room",
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiPaper-root": {
		maxWidth: 1080,
	},
	"& .MuiDialogContent-root": {
		padding: theme.spacing(1),
		width: 1080
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1)
	},
}));


export default function AddEdithome({ open, handleClose, onEdit, type, selected }) {
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

	//User
	
	const [memberModal, setInviteModal] = React.useState(null);
	const [memberModalData, setMemberModalData] = React.useState({});
	
	//Device
	
	const [deviceModal, setDeviceModal] = React.useState(null);
	const [deviceModalData, setDeviceModalData] = React.useState({});
	const [expanded, setExpanded] = React.useState(false);
	const [deviceList, setDeviceList] = React.useState([]);
	
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
			dispatch(selectHome(selected))
			setHome(selected);
			setDeviceList(selected?.devices)
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

	// User
	const handleInviteUser = () => {
		setInviteModal('invite');
	};
	const handleCloseInvite = () => {
		setInviteModal();
	};


	const handleEditHomeMember = (data) => {
		setInviteModal('edit');
		setMemberModalData(data)
	  };
	
	  const handleDeleteHomeMember = (data) => {
		setInviteModal('delete');
		setMemberModalData(data)
	  };
	

	// Device
	const handleCloseDevice = () => {
		setDeviceModal()
	}

	const handleAddDevice = () => {
		setDeviceModal('add')
	  }
	  
	  const handleDeleteDevice = (data) => {
		setDeviceModal('delete');
		setDeviceModalData(data)
	  }
	
	  const handleEditDevice = (data) => {
		setDeviceModal('edit')
		setDeviceModalData(data)
	  }
	
	  const handleChangeDeviceCollapse = (panel) => (event, isExpanded) => {
		console.log("[event]", event.target);
		setExpanded(isExpanded ? panel : false);
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
					<Grid item xs={6} >
						<Box sx={{ marginBottom: 1 }}>
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
						<Box id="room_list" sx={{ minHeight: "calc(40vh - 64px)" }}>
							<List component={Paper}>
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
						<Box id="member_list" sx={{ minHeight: "calc(40vh - 64px)" }}>
							<List component={Paper} sx={{ minHeight: "100%", maxHeight: '100%' }}>
								<ListItem divider>
								<Typography variant="h5" sx={{ fontWeight: 600 }}>
									Home Members
								</Typography>
								<ListItemSecondaryAction>
									<IconButton
									onClick={() => {
										handleInviteUser();
									}}
									>
									<Add />
									</IconButton>
								</ListItemSecondaryAction>
								</ListItem>
								{home &&
								home?.members?.map((user) => {
									console.log("[U]", user);
									return (
									<ListItem divider>
										<ListItemText
										primary={user?.full_name}
										secondary={
											user?.role
											? "Owner" + (user?.status ? "" : "(Pending)")
											: "Member" + (user?.status ? "" : "(Pending)")
										}
										sx={{ textTransform: "capitalize" }}
										/>
										<ListItemSecondaryAction>
										<IconButton
											onClick={() => {
											handleEditHomeMember(user);
											}}
										>
											<Edit color="primary" />
										</IconButton>
										<IconButton
											onClick={() => {
											handleDeleteHomeMember(user);
											}}
										>
											<Delete color="error" />
										</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
									);
								})}
							</List>
						</Box>
						<Box id="device_list" sx={{ minHeight: "calc(40vh - 64px)" }}>
						<List component={Paper} sx={{ minHeight: "100%", maxHeight: '100%' }}>
							<ListItem divider>
							<Typography variant="h5" sx={{ fontWeight: 600 }}>
								Device List
							</Typography>
							<ListItemSecondaryAction>
								<IconButton
								onClick={() => {
									handleAddDevice();
								}}
								>
								<Add />
								</IconButton>
							</ListItemSecondaryAction>
							</ListItem>
							<Box sx={{overflowY: 'auto', height: '100%', maxHeight: 'calc(50vh - 64px)'}}>
							{deviceList &&
								deviceList?.map((device, idx) => {
								console.log("[devices]", device);
								return (
									<>
									<Accordion expanded={expanded === idx} onChange={handleChangeDeviceCollapse(idx)} >
										<AccordionSummary
										expandIcon={
											<ExpandMoreIcon
											sx={{
												pointerEvents: "auto"
											}}
											/>
										}
										aria-controls="panel1bh-content"
										id="panel1bh-header"
										sx={{
											'& .MuiAccordionSummary-content': {
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center'
											},
										}}
										>
										<Typography sx={{ width: '33%', flexShrink: 0 }}>
											{device.key}
										</Typography>
										<Typography sx={{ color: 'text.secondary' }}>{device?.type == 1 ? "Monitor" : device?.type == 2 ? "Security" : "Control"} </Typography>
										
										<IconButton
											id="delete"
											key="delete"
											onClick={()=>{handleDeleteDevice(device)}}
										>
											<Delete key="delete" color="error" />
										</IconButton>
										</AccordionSummary>
										<AccordionDetails>
										{
											device && device?.channels?.map((channel) => {
											return (
												<ListItem divider>
												<ListItemText
													primary={channel?.name}
													secondary={channel?.room?.name || 'Not assigned to any room'}
													sx={{ textTransform: "capitalize" }}
												/>
												<ListItemSecondaryAction>
													<IconButton
													onClick={() => {
														handleEditDevice(channel);
													}}
													>
													<Edit color="primary" />
													</IconButton>
												</ListItemSecondaryAction>
												</ListItem>
											)
											})
										}
										</AccordionDetails>
									</Accordion>
									</>
									
								);
							})}
							</Box>
						</List>
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
			{roomModal && (
				<RoomModal
					handleClose={handleCloseAddRoom}
					type={roomModalType}
					data={roomModalData}
					onEdit={onEdit}
				/>
			)}
			{roomDeleteModal && (
				<RoomModalDelete
					handleClose={handleCloseDeleteRoom}
					data={roomModalData}
					onEdit={onEdit}
				/>
			)}
			{memberModal === 'invite' && <InviteModal handleClose={handleCloseInvite} onEdit={onEdit} />}
      
			{memberModal === 'edit' && (
				<MemberModal
				handleClose={handleCloseInvite}
				data={memberModalData}
				onEdit={onEdit}
				/>
			)}
			{memberModal === 'delete' && (
				<MemberModalDelete
				handleClose={handleCloseInvite}
				data={memberModalData}
				onEdit={onEdit}
				/>
			)}
			{deviceModal === 'add' && (
				<DeviceModal
				handleClose={handleCloseDevice}
				onEdit={onEdit}
				/>
			)}
			{deviceModal === 'edit' && (
				<ChannelModal
				handleClose={handleCloseDevice}
				data={deviceModalData}
				onEdit={onEdit}
				/>
			)}
			{deviceModal === 'delete' && (
				<DeviceModalDelete
				handleClose={handleCloseDevice}
				data={deviceModalData}
				onEdit={onEdit}
				/>
			)}
		</BootstrapDialog>
	);
}


function RoomModal({ handleClose, type, onEdit, data }) {
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
			if (type === "add"){
				dispatch(addRoom(selectedHome, values));
				onEdit();
			}else {
				dispatch(editRoom(values));
				onEdit();
			}
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

function RoomModalDelete({ handleClose, data, onEdit }) {
const dispatch = useDispatch();
const selectedHome = useSelector((state) => state.homeData.selectedHome);

const handleRemove = async() => {
	await dispatch(deleteRoom(data?.id));
	onEdit();
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

function InviteModal({ open, handleClose, onEdit }) {
	const dispatch = useDispatch();
	const selectedHome = useSelector((state) => state.homeData.selectedHome);
  
	const invite_schema = Yup.object().shape({
	  username: Yup.string().required("This Field is Required!"),
	});
  
	return (
	  <Dialog open={true} onClose={handleClose} sx={{}}>
		<Formik
		  initialValues={{
			username: "",
		  }}
		  enableReinitialize={true}
		  validationSchema={invite_schema}
		  onSubmit={(values, { setSubmitting, resetForm }) => {
			setTimeout(async() => {
			  await dispatch(inviteUser(selectedHome, values))
			  .then((res) => {
				console.log("[Invite User]", res);
			  })
			  .catch((err) => {
				console.log("[Invite User Error]", err);
			  })
			  console.log("[Invite]", selectedHome, values);
			  setSubmitting(false);
			  onEdit();
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
					id="username"
					name="username"
					placeholder="@username"
					error={errors?.username}
					value={values?.username}
					onChange={handleChange}
					InputProps={{
					  startAdornment: (
						<InputAdornment position="start">
						  <Search />
						</InputAdornment>
					  ),
					}}
					helperText={errors?.username}
				  />
				</Box>
			  </DialogContent>
			  <DialogActions>
				<Button type="submit">Invite</Button>
			  </DialogActions>
			</Form>
		  )}
		</Formik>
	  </Dialog>
	);
  }
  
  function MemberModal({ handleClose, data, onEdit }) {
	const dispatch = useDispatch();
	const selectedHome = useSelector((state) => state.homeData.selectedHome);
	const [init, setInit] = React.useState({
	  full_name: "",
	  role: 0,
	});
  
	React.useEffect(() => {
	  console.log("[member modal data]", data);
	  setInit(data)
	}, []);
  
	const schema = Yup.object().shape({
	  full_name: Yup.string().required("This Field is Required!"),
	  role: Yup.boolean()
		.required("This Field is Required!"),
	});
  
	console.log("[init]", init);
  
	return (
	  <Dialog open={true} onClose={handleClose}>
		<Formik
		  initialValues={init}
		  enableReinitialize={true}
		  validationSchema={schema}
		  onSubmit={(values, { setSubmitting, resetForm }) => {
			setTimeout(async() => {
			  console.log("[member modal]", values);
			  await dispatch(updateUser(selectedHome, values)).then((res) => {
				console.log("[update user]", res);
			  });
			  setSubmitting(false);
			  onEdit();
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
				  Edit Member Information
				</Typography>
				<IconButton onClick={handleClose}>
				  <CloseIcon />
				</IconButton>
			  </DialogTitle>
			  <DialogContent dividers>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
				  <TextField
					// {...field}
					id="full_name"
					type="text"
					label="Member Name"
					value={values?.full_name}
					onChange={handleChange}
					error={touched?.full_name && errors?.full_name}
					sx={{
					  mb: 1,
					}}
				  />
				  <TextField
					id="role"
					name="role"
					select
					label="Member Role"
					value={values?.role}
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
					<MenuItem key={0} value={false}>
					  Member
					</MenuItem>
					<MenuItem key={1} value={true}>
					  Owner
					</MenuItem>
				  </TextField>
				</Box>
			  </DialogContent>
			  <DialogActions>
				<Button type="submit">
				  Update
				</Button>
			  </DialogActions>
			</Form>
		  )}
		</Formik>
	  </Dialog>
	);
  }
  
  function MemberModalDelete({ handleClose, data, onEdit }) {
	const dispatch = useDispatch();
	const selectedHome = useSelector((state) => state.homeData.selectedHome);
  
	const handleRemove = async() => {
	  await dispatch(removeMember(selectedHome?.id, data?.id));
	  handleClose();
	  onEdit();
	};
  
	console.log("[delete]", data);
  
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
		  <Typography>Remove Member</Typography>
		  <IconButton onClick={handleClose}>
			<CloseIcon />
		  </IconButton>
		</DialogTitle>
		<DialogContent dividers sx={{ maxWidth: 400, textAlign: "center" }}>
		  <Typography variant="h6" sx={{ fontWeight: 600 }}>
			Are you sure to Remove "{data.full_name}({data.role ? "Owner" : "Member"})" in "{selectedHome?.name}"
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
  
  
  function DeviceModal({ handleClose, onEdit }) {
	const dispatch = useDispatch();
	const selectedHome = useSelector((state) => state.homeData.selectedHome);
	const [init, setInit] = React.useState({
	  key: "",
	});
  
	const schema = Yup.object().shape({
	  key: Yup.string().required("This Field is Required!")
	});
  
	console.log("[init]", init);
  
	return (
	  <Dialog open={true} onClose={handleClose}>
		<Formik
		  initialValues={init}
		  enableReinitialize={true}
		  validationSchema={schema}
		  onSubmit={ (values, { setSubmitting, resetForm }) => {
			setTimeout(async () => {
			  console.log("[Device modal]", values);
			  await dispatch(addDevice(selectedHome?.id, values))
			  .then((res) => {
				console.log("[Add Device]", res);
			  })
			  .catch((err) => {
				console.log("[Add Device error]", err);
			  })
			  setSubmitting(false);
			  onEdit();
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
				  Add Device
				</Typography>
				<IconButton onClick={handleClose}>
				  <CloseIcon />
				</IconButton>
			  </DialogTitle>
			  <DialogContent dividers>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
				  <TextField
					// {...field}
					id="key"
					type="text"
					label="Device Key"
					value={values?.key}
					onChange={handleChange}
					error={touched?.key && errors?.key}
					sx={{
					  mb: 1,
					}}
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
	);
  }
  
  function DeviceModalDelete({ handleClose, data, onEdit }) {
	const dispatch = useDispatch();
	const selectedHome = useSelector((state) => state.homeData.selectedHome);
  
	const handleRemove = async() => {
	  console.log("[selected Home][Device]", data);
	  await dispatch(deleteDevice(selectedHome?.id, data?.key));
	  handleClose();
	  onEdit();
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
		  <Typography>Remove Device</Typography>
		  <IconButton onClick={handleClose}>
			<CloseIcon />
		  </IconButton>
		</DialogTitle>
		<DialogContent dividers sx={{ maxWidth: 400, textAlign: "center" }}>
		  <Typography variant="h6" sx={{ fontWeight: 600 }}>
			Are you sure to Remove "{data['key']}" Device  in "{selectedHome?.name}"?
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
  
  function ChannelModal({ handleClose, data, onEdit }) {
	const dispatch = useDispatch();
	const selectedHome = useSelector((state) => state.homeData.selectedHome);
	const [init, setInit] = React.useState({
	  name: "",
	  room: "",
	});
	const [rooms, setRooms] = React.useState(selectedHome['rooms'])
	const [schema, setSchema] = React.useState({})
  
	React.useEffect(() => {
	  let temp_data = _.cloneDeep(data);
	  if(_.isObject(temp_data['room'])){
		temp_data['room'] = temp_data['room']['id']
	  }
	  console.log("[temp data]", temp_data)
  
	  setInit(temp_data)
	  if(Number(data['type']) <= 3){
		setSchema(Yup.object().shape({
		  name: Yup.string().required("This Field is Required!"),
		  room: Yup.string(),
		}))
	  }else {
		setSchema(Yup.object().shape({
		  name: Yup.string().required("This Field is Required!"),
		  room: Yup.string(),
		  type: Yup.number().required("This Field is Required!")
		}))
	  }
  
	}, []);
	return (
	  <Dialog open={true} onClose={handleClose}>
		<Formik
		  initialValues={init}
		  enableReinitialize={true}
		  validationSchema={schema}
		  onSubmit={(values, { setSubmitting, resetForm }) => {
			setTimeout(async() => {
			  console.log("[channel modal]", values);
			  if(values['room'] === '-'){
				values['room'] = ""
			  }
			  await dispatch(updateChannel(data?.id, values))
			  setSubmitting(false);
			  onEdit();
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
		  }) => {
  
			console.log("value:", values)
			return (
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
					Device Channel
				  </Typography>
				  <IconButton onClick={handleClose}>
					<CloseIcon />
				  </IconButton>
				</DialogTitle>
				<DialogContent dividers>
				  <Box sx={{ display: "flex", flexDirection: "column" }}>
					<TextField
					  id="name"
					  type="text"
					  label="Channel Name"
					  value={values?.name}
					  onChange={handleChange}
					  error={touched?.name && errors?.name}
					  sx={{
						mb: 1,
					  }}
					/>
					{
					  Number(data['type']) > 3 && (
						<TextField
						  id="type"
						  name="type"
						  select
						  label="Channel type"
						  value={Number(values?.type)}
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
						  <MenuItem value={4}>
							<Typography sx={{color: "#039be5", display: "flex", alignItems: 'center', gap: 1}}> <ToggleOnIcon /> Switch </Typography>
						  </MenuItem>
						  <MenuItem value={5}>
							<Typography sx={{color: "#039be5", display: "flex", alignItems: 'center', gap: 1}}> <TungstenIcon/> Light </Typography>
						  </MenuItem>
						  <MenuItem value={6}>
							<Typography sx={{color: "#039be5", display: "flex", alignItems: 'center', gap: 1}}> <OutletIcon /> Outlet </Typography>
						  </MenuItem>
						</TextField>
					  )
					}
					
					<TextField
					  id="room"
					  name="room"
					  select
					  label="Channel Room"
					  value={values?.room}
					  onChange={handleChange}
					  error={touched?.room && errors?.room}
					  sx={{
						"& .MuiSelect-select": {
						  display: "flex",
						  alignItems: "center",
						  gap: 1,
						},
						mb: 1,
					  }}
					>
					  
					  <MenuItem value={"-"} sx={{color:"#039be5"}}>
						Do not assign
					  </MenuItem>
					  {
						rooms && rooms?.map((room, idx) => {
						  console.log("[room]", room, idx);
						  return (
							<MenuItem key={idx} value={room?.id} sx={{color:"#039be5"}}>
							  {room?.name}
							</MenuItem>
						  )
						})
					  }
					</TextField>
				  </Box>
				</DialogContent>
				<DialogActions>
				  <Button type="submit">
					Update
				  </Button>
				</DialogActions>
			  </Form>
			)
		  }}
		</Formik>
	  </Dialog>
	);
  }