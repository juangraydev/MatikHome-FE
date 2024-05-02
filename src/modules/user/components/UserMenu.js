import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {
	Box,
	List,
    ListItem,
    ListItemButton,
    Typography,
    Menu,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Divider,
	Popover
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import HomeIcon from '@mui/icons-material/Home';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';

import { 
    selectHome,
    selectRoom
} from '../dashboard/store/actionCreators'

import AddHome from './AddHome'
import HomeSetting from './HomeSetting';
import GeneralSetting from '../dashboard/component/HomeSetting'
import { Login } from '@mui/icons-material';

export default function UserLayout (props) {
	const location = useLocation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
    const [anchorElHome, setAnchorElHome] = React.useState(null);
    const [openAddHome, setOpenAddHome] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [openHomeSetting, setOpenHomeSetting] = React.useState(false);
    const [openDevice, setOpenDevice] = React.useState(false);
    const [home, setHome] = React.useState([])
    const [anchorEl, setAnchorEl] = React.useState(null);

    const selectedHome = useSelector(state => state.homeData.selectedHome)
    const selectedRoom = useSelector(state => state.homeData.selectedRoom)
    const homes = useSelector(state => state.homeData.data)


    React.useEffect(()=>{
        setHome(selectedHome)
		handleSelectedHome(selectedHome)
    }, [selectedHome ])

	//Popper Home Name Start
	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	//Popper Home Name End

    const handleOpenHomeSetting = () => {
        // setOpenHomeSetting(true)
		navigate('/dashboard/home-setting')
        dispatch(selectRoom("home-setting")) 

    }

	const handleOpenHomeMember = () => {
        // setOpenHomeSetting(true)
		navigate('/home/member')
        dispatch(selectRoom("home-member")) 

    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSelectedHome = (home) => {
        handleCloseHomeMenu()
        dispatch(selectHome(home))
        dispatch(selectRoom("ALL"))
    }

    const handleSelectRoom = (id) => {
		dispatch(selectRoom(id.replaceAll("-",""))) 
		if(location.pathname !== "/dashboard" || location.pathname !== "/dashboard/home-setting"){
			navigate('/dashboard')
		}
        handleDrawerToggle()
    }

    const handleOpenHomeMenu = (event) => {
		setAnchorElHome(event.currentTarget);
	};
	
	const handleCloseHomeMenu = () => {
		setAnchorElHome(null);
	};

    const handleOpenAddHome = () => {
		setOpenAddHome(true);
		handleCloseHomeMenu();
	}

    const handleOpenDeviceSetting = () => setOpenDevice(true);

    const onCloseAddHomeDialog = () => {
        setOpenAddHome(false)
    }

	const onCloseAddHomeSettingDialog = () => {
        setOpenHomeSetting(false)
    }

    return (
		<React.Fragment>
			{openAddHome && (
				<AddHome open={true} handleClose={onCloseAddHomeDialog} />
			)}
			{openHomeSetting && (
				<GeneralSetting open={true} handleClose={onCloseAddHomeSettingDialog} home={home}/>
			)}
			{/* Home Dropdown */}
			<List>
				<ListItem
					key={"home"}
					disablePadding
					onClick={handleOpenHomeMenu}
					aria-label="menu of home"
					aria-controls="menu-home"
					aria-haspopup="true"
				>
					<ListItemButton sx={{ paddingInline: 0 }}>
						<Box
							component="div"
							sx={{
								color: "#fff",
								width: "-webkit-fill-available",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h5"
								aria-owns={open ? 'mouse-over-popover' : undefined}
								aria-haspopup="true"
								onMouseEnter={handlePopoverOpen}
								onMouseLeave={handlePopoverClose}

								sx={{ 
									paddingInline: 2, 
									fontWeight: 600,
									overflow:'hidden',
									whiteSpace:'nowrap',
									textOverflow:'ellipsis'
								}}
							>
								{selectedHome?.name.charAt(0).toUpperCase() +
									selectedHome?.name.slice(1)}
							</Typography>
							<Popover
								id="mouse-over-popover"
								sx={{
								pointerEvents: 'none',
								}}
								open={open}
								anchorEl={anchorEl}
								anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
								}}
								transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
								}}
								onClose={handlePopoverClose}
								disableRestoreFocus
							>
								<Typography sx={{ p: 1 }}>
								{selectedHome?.name.charAt(0).toUpperCase() +
									selectedHome?.name.slice(1)}
								</Typography>
							</Popover>
							<ExpandMoreIcon sx={{ marginInline: 2 }} />
						</Box>
					</ListItemButton>
				</ListItem>
				<Menu
					key={"home_list_menu"}
					sx={{ mt: "45px" }}
					PaperProps={{
						style: {
							width: 250,
						},
					}}
					id="menu-home"
					anchorEl={anchorElHome}
					anchorOrigin={{
						vertical: "top",
						horizontal: "left",
					}}
					keepMounted
					transformOrigin={{
						vertical: "top",
						horizontal: "left",
					}}
					open={Boolean(anchorElHome)}
					onClose={handleCloseHomeMenu}
				>
					<MenuItem key={"add_home"} onClick={handleOpenAddHome}>
						<Typography textAlign="center">{"Add Home"}</Typography>
					</MenuItem>
					{homes?.map((home, idx) => (
						<MenuItem
							key={idx}
							onClick={() => {
								handleSelectedHome(home);
							}}
						>
							<Typography
								sx={{
									color:
										selectedHome?.name === home?.name
											? "#039be5"
											: "inherit",
								}}
								textAlign="center"
							>
								{home?.name}
							</Typography>
						</MenuItem>
					))}
				</Menu>
				
				<ListItem
					key={"home_control_panel"}
					disablePadding
					onClick={() => handleSelectRoom("ALL")}
				>
					<ListItemButton
						selected={selectedRoom === "ALL"}
						sx={{
							minWidth: "35px",
							// color: selectedRoom === "ALL" ? "#039be5" : "#fff",
						}}
					>
						<ListItemIcon
							sx={{ minWidth: "35px", color: "inherit" }}
						>
							<HomeIcon
								sx={{ color: selectedRoom ==="ALL"
								? "#039be5"
								: "#fff" }}
							/>
						</ListItemIcon>
						<ListItemText
							primary={"Home"}
							sx={{
								color:
									selectedRoom === "ALL" ? "#039be5" : "#fff",
							}}
						/>
					</ListItemButton>
				</ListItem>

				
				{
					home && home.members && home.members.filter((memberObj) => memberObj.full_name === props.userInfo.first_name + " " + props.userInfo.last_name)[0]?.role && <ListItem
						key={"home-setting"}
						disablePadding
						onClick={() => handleOpenHomeSetting()}
					>
						<ListItemButton
							selected={selectedRoom === "home-setting"}
							sx={{
								minWidth: "35px",
								// color: selectedRoom === room?.id.replaceAll("-","") ? "#039be5" : "#fff",
							}}
						>
							<ListItemIcon
								sx={{ minWidth: "35px", color: "inherit" }}
							>
								<ViewQuiltIcon
									sx={{ color: selectedRoom ==="home-setting"
										? "#039be5"
										: "#fff" }}
								/>
							</ListItemIcon>
							<ListItemText
								primary={"Home Settings"}
								sx={{
									color:
										selectedRoom === "home-setting" ? "#039be5" : "#fff",
								}}
							/>
						</ListItemButton>
					</ListItem>
				}

				<Divider />
				<Typography
					sx={{
						color: "#fff",
						fontSize: "16px",
						paddingInline: 2,
						marginTop: 2,
						fontWeight: 600,
					}}
				>
					{"Rooms"}
				</Typography>
				{home?.rooms &&
					home?.rooms.map((room, index) => {
                        console.log("Selected Room", room?.id.replaceAll("-",""), selectedRoom);
                        return(
                            <ListItem
                                key={room?.id}
                                disablePadding
                                onClick={() => handleSelectRoom(room?.id)}
                            >
                                <ListItemButton
									selected={selectedRoom === room?.id.replaceAll("-","")}
                                    sx={{
                                        minWidth: "35px",
                                        // color: selectedRoom === room?.id.replaceAll("-","") ? "#039be5" : "#fff",
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{ minWidth: "35px", color: "inherit" }}
                                    >
                                        {
                            				{
                            					0: (
                            						<KitchenIcon
                            							sx={{ color: selectedRoom === room?.id.replaceAll("-","")
                                                            ? "#039be5"
                                                            : "#fff" }}
                            						/>
                            					),
                            					1: (
                            						<ChairIcon
                            							sx={{ color: selectedRoom === room?.id.replaceAll("-","")
                                                            ? "#039be5"
                                                            : "#fff" }}
                            						/>
                            					),
                            					2: (
                            						<SingleBedIcon
                            							sx={{ color: selectedRoom === room?.id.replaceAll("-","")
                                                            ? "#039be5"
                                                            : "#fff" }}
                            						/>
                            					),
                            					3: (
                            						<BusinessIcon
                            							sx={{ color: selectedRoom === room?.id.replaceAll("-","")
                                                            ? "#039be5"
                                                            : "#fff" }}
                            						/>
                            					),
                            					4: (
                            						<GarageIcon
                            							sx={{ color: selectedRoom === room?.id.replaceAll("-","")
                                                            ? "#039be5"
                                                            : "#fff" }}
                            						/>
                            					),
                            					default: (
                            						<ChairIcon
                            							sx={{ color: selectedRoom === room?.id.replaceAll("-","")
                                                            ? "#039be5"
                                                            : "#fff"}}
                            						/>
                            					),
                            				}[room.type]
                            			}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            room?.name.charAt(0).toUpperCase() +
                                            room?.name.slice(1)
                                        }
                                        sx={{
                                            color:
                                                selectedRoom === room?.id.replaceAll("-","") ? "#039be5" : "#fff",
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                            // <ListItem
                            // 	key={room?.name}
                            // 	disablePadding
                            // 	onClick={() => handleSelectRoom(room?.id)}
                            // >
                            // 	<ListItemButton
                            // 		sx={{
                            // 			minWidth: "35px",
                            // 			color:
                            // 				selectedRoom === room?.id
                            // 					? "#039be5"
                            // 					: "#fff",
                            // 		}}
                            // 	>
                            // 		<ListItemIcon
                            // 			sx={{ minWidth: "35px", color: "inherit" }}
                            // 		>
                            // 			{
                            // 				{
                            // 					0: (
                            // 						<KitchenIcon
                            // 							sx={{ color: selectedRoom === room?.id
                            //                                 ? "#039be5"
                            //                                 : "#fff" }}
                            // 						/>
                            // 					),
                            // 					1: (
                            // 						<ChairIcon
                            // 							sx={{ color: selectedRoom === room?.id
                            //                                 ? "#039be5"
                            //                                 : "#fff" }}
                            // 						/>
                            // 					),
                            // 					2: (
                            // 						<SingleBedIcon
                            // 							sx={{ color: selectedRoom === room?.id
                            //                                 ? "#039be5"
                            //                                 : "#fff" }}
                            // 						/>
                            // 					),
                            // 					3: (
                            // 						<BusinessIcon
                            // 							sx={{ color: selectedRoom === room?.id
                            //                                 ? "#039be5"
                            //                                 : "#fff" }}
                            // 						/>
                            // 					),
                            // 					4: (
                            // 						<GarageIcon
                            // 							sx={{ color: selectedRoom === room?.id
                            //                                 ? "#039be5"
                            //                                 : "#fff" }}
                            // 						/>
                            // 					),
                            // 					default: (
                            // 						<ChairIcon
                            // 							sx={{ color: selectedRoom === room?.id
                            //                                 ? "#039be5"
                            //                                 : "#fff"}}
                            // 						/>
                            // 					),
                            // 				}[room.type]
                            // 			}
                            // 		</ListItemIcon>
                            // 		<ListItemText
                            // 			primary={
                            //                 room?.name.charAt(0).toUpperCase() +
                            // 				room?.name.slice(1)
                            //             }
                            // 			sx={{
                            // 				color:
                            // 					selectedRoom === room?.id
                            // 						? "#039be5"
                            // 						: "#fff",
                            // 			}}
                            // 		/>
                            // 	</ListItemButton>
                            // </ListItem>
                        )
                    }
                    )}
			</List>

			{/* <List sx={{ maxHeight: "calc(48px * 5)", overflow: "auto" }}>
				{home?.rooms &&
					home?.rooms.map((room, index) => (
						<ListItem
							key={room?.name}
							disablePadding
							onClick={() => handleSelectRoom(room?.id)}
						>
							<ListItemButton>
								<ListItemIcon sx={{ minWidth: "35px" }}>
									{
										{
											0: (
												<KitchenIcon
													sx={{ color: "#039be5" }}
												/>
											),
											1: (
												<ChairIcon
													sx={{ color: "#039be5" }}
												/>
											),
											2: (
												<SingleBedIcon
													sx={{ color: "#039be5" }}
												/>
											),
											3: (
												<BusinessIcon
													sx={{ color: "#039be5" }}
												/>
											),
											4: (
												<GarageIcon
													sx={{ color: "#039be5" }}
												/>
											),
											default: (
												<ChairIcon
													sx={{ color: "#039be5" }}
												/>
											),
										}[room.type]
									}
								</ListItemIcon>
								<ListItemText
									primary={
										room?.name.charAt(0).toUpperCase() +
										room?.name.slice(1)
									}
									sx={{
										color:
											selectedRoom === room?.id
												? "#039be5"
												: "#fff",
									}}
								/>
							</ListItemButton>
						</ListItem>
					))}
			</List> */}
		</React.Fragment>
	);
}