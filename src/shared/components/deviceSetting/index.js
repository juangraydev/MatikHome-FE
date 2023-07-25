import React from "react";
import { useNavigate } from "react-router-dom";
import {
	Container,
	Box,
	Link,
	Typography,
	Paper,
	TableRow,
	TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Stack,
    Modal,
    Table,
    FormControl,
    IconButton
} from "@mui/material"


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
import { deviceList } from "../../../modules/user/dashboard/service"

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




function DeviceSetting({open, handleClose }) {
    const navigate  = useNavigate();
	const dispatch = useDispatch()

    const isHomeDataPending = useSelector(state => state.homeData.isPending)
    const selectedHome = useSelector(state => state.homeData.selectedHome)
    const selectedRoom = useSelector(state => state.homeData.selectedRoom)
    const deviceData = useSelector(state => state.homeData.dataDevice)

    React.useEffect(()=>{
        console.log("[selectedHome]",selectedHome?.id);
        dispatch(deviceList(selectedHome?.id));
    }, [selectedHome])



    const handleAddRoom = () => {
        // setModalType("add")
        // setEditData({});
        // handleOpenRoomModal();
    }

    const handleOpenRoomModal = () => {
        // setRoomMOdal(true);
    }
    

    console.log("[deviceData]",deviceData);
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Paper sx={style}>
                    <Box component={"div"} sx={{display: "flex"}}>
                        <Typography variant="h6" sx={{ flexGrow: 1}}>{'Device Settings'}</Typography>
                        <IconButton onClick={handleClose} sx={{float: "right"}}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    <Box component={"div"} sx={{marginTop: 1, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1}} >
                        <Typography sx={{fontFamily: "inherit", fontSize: '14px', color: "#101840", textAlign: "left", fontWeight: 600}}>
                            Devices
                        </Typography>
                        <IconButton size="small" sx={{color: "#039be5", marginInline: 1}} onClick={handleAddRoom}>
                            <AddCircleOutlineOutlinedIcon/>
                        </IconButton>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Key</TableCell>
                                <TableCell>Pin</TableCell>
                                <TableCell>Channels</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {/* {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{1}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Modal>
        </>
    );
}

export default DeviceSetting;
