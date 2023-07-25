import { useEffect, useState} from 'react';
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
import CreateUserDialog from './component/create-user-dialog';

import { getUserList } from './store/service'

const columns = [
    {label: 'Name', data: 'name', align: 'left', width: '25%'},
    {label: 'Username', data: 'username', align: 'left', width: '25%'},
    {label: 'Password', data: 'password', align: 'left', width: '25%'},
    {label: 'Role', data: 'role', align: 'left', width: '20%'},
    {label: '', data: 'menu', align: 'left', width: '15%'},
]

export default function HomeManagement() {
	const navigate  = useNavigate();
    
    const [createDialog, setCreateDialog] = useState(false)
	const [rows, setRows] = useState([])

    useEffect(()=>{
		getUserList()
			.then((res) => {
				setRows(res);
                console.log("[Retrived][Admin][Users]: ",res);
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
            createDialog && <CreateUserDialog open={true} handleClose={toggleCreateDialog}/>
        }
        <Box component={"div"} sx={{display: "flex", justifyContent: "space-between", alignContent: "center"}}>
            <Typography variant='menu'>
                User list
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
