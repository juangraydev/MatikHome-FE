import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Container,
	Box,
	Link,
	Typography,
	Paper,
	TextField,
	Button,
    Menu,
    MenuItem,
    Grid,
    Stack,
    Modal,
    OutlinedInput,
    FormControl,
    IconButton
} from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';

import AddRoom from "../addComponents/AddRoom"
import EditHome from "../addComponents/AddHome"

// import Modal from "../../../shared/components/modal/index"
// import Grid from '@mui/material/Unstable_Grid2';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import Header from "../component/header"
// import SelectHouse from "../component/selectHouse"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TungstenIcon from '@mui/icons-material/Tungsten';
import { styled } from '@mui/material/styles';

import { w3cwebsocket as W3CWebSocket } from "websocket";

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { deleteRoom } from "../../../modules/user/dashboard/service"

import { useSelector, useDispatch } from 'react-redux'
// import { 
//     selectHome,
//     selectRoom
// } from './store/actionCreators'

const style = {
    // margin: 2,
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -60%)',
    marginInline: "auto",
    marginTop: 2,
    minWidth: 292,
    width: "calc(100% - 32px)",
    maxWidth: 800,
    p: 2
};




function HomeSetting({open, handleClose }) {
    const navigate  = useNavigate();
	const dispatch = useDispatch()

    const [home, setHome] = React.useState([]);
    const [rooms, setRooms] = React.useState([]);
    
    const [openEditHome, setOpenEditHome] = React.useState(false);

    const [roomModal, setRoomMOdal] = React.useState(false);
    const [modalType, setModalType] = React.useState("add");
    const [editData, setEditData] = React.useState({});
    
    
    const isHomeDataPending = useSelector(state => state.homeData.isPending)
    const selectedHome = useSelector(state => state.homeData.selectedHome)
    const selectedRoom = useSelector(state => state.homeData.selectedRoom)

    React.useEffect(()=>{
        setHome(selectedHome?.name)       
        setRooms(selectedHome?.rooms)
    }, [selectedHome])


    const roomCol = [
        { field: 'id', headerName: 'No.', minWidth: 50, minWidth: 50, fieldType: 'textfield', flex: 0.1 },
        { field: 'name', headerName: 'Name', minWidth: 100, fieldType: 'textfield', flex: 0.5 },
        { field: 'type', headerName: 'Type', minWidth: 70, flex: 0.3,
            renderCell: (params) => {   
                const currentRow = params.row;
                return (
                    <>
                        {{
                            0: (
                                <KitchenIcon sx={{color: "#039be5"}}/>
                            ),
                            1: (
                                <ChairIcon sx={{color: "#039be5"}}/>
                            ),
                            2: (
                                <SingleBedIcon sx={{color: "#039be5"}}/>
                            ),
                            3: (
                                <BusinessIcon sx={{color: "#039be5"}}/>
                            ),
                            4: (
                                <GarageIcon sx={{color: "#039be5"}}/>
                            ),
                            default: (
                                <ChairIcon sx={{color: "#039be5"}}/>
                            )
                        }[currentRow.type]}
                    </>
                );
            }, 
        },
        {
            field: 'action',
            headerName: 'Action',
            minWidth: 100,
            maxWidth: 120,
            flex: 0.2,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onEdit = (e) => {
                  const currentRow = params.row;
                  return handleEditRoom(currentRow);
                };

                const onDelete = () => {
                    const currentRow = params.row;
                    return handleDeleteRoom(currentRow);
                }
                
                return (
                  <Stack direction="row" spacing={1} >
                    <IconButton color={"warning"} onClick={onEdit}>
                        <EditOutlinedIcon/>
                    </IconButton>
                    <IconButton color={"error"} onClick={onDelete}>
                        <DeleteForeverOutlinedIcon/>
                    </IconButton>
                  </Stack>
                );
            },
        }
    ]
    
    const handleEditRoom = (data) => {
        setModalType("edit")
        setEditData(data);
        handleOpenRoomModal();
    }

    const handleAddRoom = () => {
        setModalType("add")
        setEditData({});
        handleOpenRoomModal();
    }

    const handleDeleteRoom = (data) => {
        dispatch(deleteRoom(data?.id))
    }
    
    const handleOpenRoomModal = () => {
        setRoomMOdal(true);
    }

    const handleOpenEditHome = () => {
        setOpenEditHome(true)
    }

    const handleCloseEditHome = () => {
        setOpenEditHome(false)
    }
    
    return (
        <>
            <AddRoom 
                open={roomModal} 
                setOpen={setRoomMOdal}
                type={modalType}
                data={editData}
            />
            <EditHome
                key={"edit_home"}
                open={openEditHome}
                handleClose={handleCloseEditHome}
                type={"edit"}
                data={selectedHome}
            /> 
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Paper sx={style}>
                    <Box component={"div"} sx={{display: "flex"}}>
                        <Typography variant="h6" sx={{ flexGrow: 1}}>{'Home Settings'}</Typography>
                        <IconButton onClick={handleClose} sx={{float: "right"}}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    <FormControl sx={{width: "-webkit-fill-available"}} gutterBottom>
                        <Typography gutterBottom sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 600, marginTop: 1}}>
                            Name
                        </Typography>
                        <Box component={"div"} sx={{display: "flex"}}>
                            <OutlinedInput 
                                id="name" 
                                size="small"
                                placeholder="Home name here" 
                                sx={{width: "-webkit-fill-available"}}
                                value={home}
                                disabled
                                // onChange={handleOnChange}
                                // error={formError?.username}
                            />
                            <IconButton size="small" sx={{color: "#039be5", marginInline: 1}} onClick={()=>handleOpenEditHome()}>
                                <EditOutlinedIcon/>
                            </IconButton>
                        </Box>
                        
                        {/* <FormHelperText error={formError?.username}>{formError?.username}</FormHelperText> */}
                    </FormControl>
                    <Box component={"div"} sx={{marginTop: 1, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1}} >
                        <Typography sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 600}}>
                            Rooms
                        </Typography>
                        <IconButton size="small" sx={{color: "#039be5", marginInline: 1}} onClick={handleAddRoom}>
                            <AddCircleOutlineOutlinedIcon/>
                        </IconButton>
                    </Box>
                    <Box component={"div"}>
                        <DataGrid
                            sx={{
                            
                            }}
                            rows={rooms || []}
                            columns={roomCol || []}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            checkboxSelection={false}
                            // loading={}
                        />
                    </Box>
                </Paper>
            </Modal>
        </>
    );
}

export default HomeSetting;
