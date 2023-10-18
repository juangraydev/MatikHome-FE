import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
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
    TableContainer,
    Toolbar,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions
} from "@mui/material"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineRounded from '@mui/icons-material/AddCircleOutlineRounded'
import { 
    selectHome,
    selectRoom
} from '../store/actionCreators'
import _ from 'lodash'
import { Close, Delete, Edit, Note, Settings, Troubleshoot, Update } from "@mui/icons-material";
import LetterAvatar from '../../../../shared/components/avatar'
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
import { editHome } from '../service'
const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -10%)',
    minWidth: 292,
    width: "100%",
    maxWidth: 500,
    height: 500,
    overflowY: "auto",
    display: "block",
    p: 2,
  };
  
export default function HomeHolds({
    setScreenType,
    handleCloseHomeSetting,
    isSelected
}) {
    const dispatch = useDispatch()
    const [homeInfo, setHomeInfo] = React.useState(null)

    const [edit, setEdit] = React.useState(null)
	
	const [inviteModal, setInviteModal] = React.useState(false)
	

    const selectedHome = useSelector(state => state.homeData.selectedHome)

    useEffect(()=>{
        console.log("[selectedHome]",selectedHome);
        setHomeInfo(selectedHome);
    }, [selectedHome])

    const homeInfoSchema = Yup.object().shape({
        name: Yup.string()
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
        address: Yup.string()
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
    });

    const handlEditField = (field) => {
        setEdit(field)
    }

    const editHomeAPI = (data) => {
        dispatch(editHome(data))
    }

	const handleClose = () => {
		setInviteModal(false)
	}

	const handleOpen = () => {
		setInviteModal(true)
	}

    return (
		<>
			<InvitePerson open={inviteModal} handleClose={handleClose}/>
			<Fade in={isSelected("home-holds")}>
				<Box
					id="home-holds"
					sx={{
						display: isSelected("home-holds") ? "block" : "none",
					}}
				>
					<Box style={{ display: "flex", alignItems: "center" }}>
						<IconButton
							onClick={() => {
								setScreenType("home-overview");
							}}
						>
							<ArrowBackIcon sx={{ fontSize: 20 }} />
						</IconButton>
						<Typography variant="h6" sx={{ flexGrow: 1 }}>
							Household
						</Typography>
						<IconButton
							onClick={handleCloseHomeSetting}
							sx={{ float: "right" }}
						>
							<CloseIcon sx={{ fontSize: 20 }} />
						</IconButton>
					</Box>
					<Box sx={{ px:1, py:2}}>
						<Box sx={{display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>
							<Typography variant='body2' sx={{fontWeight: "bold"}}>People in this home</Typography>
							<Button sx={{textTransform: 'capitalize'}} variant="text" startIcon={<AddCircleOutlineRounded />} onClick={handleOpen}>
								Invite person
							</Button>
						</Box>
						<Box>
						<List>
							{selectedHome?.members &&
								selectedHome?.members?.map((member) => {
									console.log("[member]", member);
									return (
										<>
											<ListItem
												disablePadding
												key={member?.id}
												secondaryAction={
													<Typography variant="body2">
														{member.role
															? "Owner"
															: "Member"}
													</Typography>
												}
											>
												<ListItemButton>
													<ListItemIcon>
														<LetterAvatar
															name={member.full_name}
														/>
													</ListItemIcon>
													<ListItemText
														primary={member.full_name}
														sx={{
															textTransform: 'capitalize'
														}}
													/>
												</ListItemButton>
											</ListItem>
										</>
									);
							})}
						</List>
						</Box>
					</Box>
					

					{/* <TableContainer component={Paper} sx={{ minHeight: "740px)" }}>
						<Toolbar
							sx={{
								background: "#64b5f6",
								color: "white",
								display: "flex",
								justifyContent: "space-between",
							}}
							variant={"dense"}
						></Toolbar>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Role</TableCell>
									<TableCell align="center">Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{selectedHome &&
									selectedHome?.members?.map((member) => {
										return (
											<TableRow>
												<TableCell>
													{member?.full_name}
												</TableCell>
												<TableCell>
													{member?.role
														? "Owner"
														: "Member"}
												</TableCell>
												<TableCell
													sx={{
														display: "flex",
														flexDirection: "row",
														justifyContent: "center",
													}}
												>
													<IconButton
														size="small"
														color="primary"
													>
														<Settings size="small" />
													</IconButton>
													<IconButton
														size="small"
														color="error"
													>
														<Close size="small" />
													</IconButton>
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer> */}
				</Box>
			</Fade>
		</>
		
	);
}




function InvitePerson({open, handleClose}) {
	
	return (
		<Dialog open={open} onClose={handleClose}>
			<Formik
				initialValues={{ search: "" }}
				onSubmit={(values, actions) => {
					setTimeout(() => {
						alert(JSON.stringify(values, null, 2));
						actions.setSubmitting(false);
					}, 1000);
				}}
			>
				{(props) => (
					<form onSubmit={props.handleSubmit}>
						<DialogTitle>
							<Typography>Invite Person</Typography>
						</DialogTitle>
						<DialogContent dividers sx={{ minWidth: 400 }}>
							<TextField
								id="filled-search"
								label="User Id"
								type="search"
								variant="filled"
								onChange={props.handleChange}
								onBlur={props.handleBlur}
								value={props.values.search}
								name="search"
								fullWidth
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PersonSearchIcon />
										</InputAdornment>
									),
								}}
							/>
							{props.errors.name && (
								<div id="feedback">{props.errors.name}</div>
							)}
						</DialogContent>
						<DialogActions sx={{ justifyContent: "space-between" }}>
							<Button>Cancel</Button>
							<Button type="submit">Search</Button>
						</DialogActions>
					</form>
				)}
			</Formik>
		</Dialog>
	);
}