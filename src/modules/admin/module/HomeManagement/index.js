import * as React from 'react';
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
import {
    AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon
} from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AdminTable from '../component/Table';
// import CreateDialog from './component/create-device-dialog';

import { getHomeList } from './store/service'


const columns = [
    {label: 'Nickname', data: 'name', align: 'left', width: '25%'},
    {label: 'Address', data: 'address', align: 'left', width: '25%'},
    {label: 'Rooms', data: 'rooms', align: 'left', width: '15%'},
    {label: 'Members', data: 'members', align: 'left', width: '15%'},
    {label: 'Devices', data: 'devices', align: 'left', width: '15%'},
    {label: '', data: 'menu', align: 'right', width: '5%'},
]

export default function HomeManagement() {
	const navigate  = useNavigate();
    
    const [createDialog, setCreateDialog] = React.useState(false)
	const [rows, setRows] = React.useState([])

    React.useEffect(()=>{
		getHomeList()
			.then((res) => {
				setRows(res);
                // setRows([
                //     {name: 'Home 1', address: 'Address 1', rooms: [1,2,3,4,5], members: [2,3,1], devices: [1]},
                //     {name: 'Home 2', address: 'Address 2', rooms: [1,2,3], members: [2], devices: [2,3]},
                //     {name: 'Home 3', address: 'Address 3', rooms: [4,5], members: [1,2,3,4], devices: [4,2,1]},
                // ])
                console.log("[Retrived][Admin][Home]: ",res);
			})
			.catch(() => {
				setRows([])
			})
	}, [])


    const toggleCreateDialog = () => {
        setCreateDialog(!createDialog)
    }
    
    return (
    <Box component="Paper" >
        {
            // createDialog && <CreateDialog open={true} handleClose={toggleCreateDialog}/>
        }
        <Box component={"div"} sx={{display: "flex", justifyContent: "space-between", alignContent: "center"}}>
            <Typography variant='menu'>
                Home list
            </Typography>
            <IconButton size="small" sx={{color: "#039be5", marginInline: 1}} onClick={toggleCreateDialog}>
                <AddCircleOutlineOutlinedIcon/>
            </IconButton>
        </Box>
        <AdminTable
            columns={columns || []}
            rows={rows || []}
        />
    </Box>
  );
}
