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
import * as Yup from 'yup';
import jwtEncode from 'jwt-encode'

import { getUserList, deleteUser, addUser, editUser } from './store/service'
import { useDispatch } from 'react-redux';


const columns = [
    {label: 'First Name', data: 'first_name', value: 'first_name', fieldType: 'text', align: 'left', width: '20%'},
    {label: 'Last Name', data: 'last_name', value: 'last_name', fieldType: 'text', align: 'left', width: '20%'},
    {label: 'Username', data: 'username', value: 'username', fieldType: 'text', align: 'left', width: '20%'},
    {label: 'Password', data: 'password', value: 'password', fieldType: 'password', align: 'left', width: '20%'},
    {label: 'Role', data: 'role', value: 'role', fieldType: 'pulldown', options: [{label: "Administrator", value: 1},{label: "General User", value: 0}], align: 'left', width: '20%'}
]

export default function HomeManagement() {
	const navigate  = useNavigate();
    const dispatch = useDispatch();
    
    const [createDialog, setCreateDialog] = useState(false)
	const [rows, setRows] = useState([])
    
    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
        last_name: Yup.string()
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
        username: Yup.string()
            .max(50, 'Exceed from Maximum 50 characters.')
            .required('This Field is Required!'),
        password: Yup.string()
            .min(8, 'Minimum Password should be 8 characters.')
            .max(50, 'Exceed from Maximum 50 characters.')
            .required('This Field is Required!'),
        role: Yup.string()
            .required('This Field is Required!'),
    });

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

    function onAdd(data){
        // data.password = jwtEncode({"password": data.password}, "matik_home")
        const userInfo = jwtEncode({userInfo: data}, "matik_home")
        // const userInfo = jwt.sign({"userInfo": data}, "matik_home", {algorithms:["HS256"]})
        console.log("userInfo",userInfo);
        dispatch(addUser({userInfo}))
            .then(async (res)=>{
                await getUserList()
                .then((res) => {
                    setRows(res);
                    console.log("[Retrived][Admin][Users]: ",res);
                })
                .catch(() => {
                    setRows([])
                })
            })
            .catch((err)=>{
                console.log("[Admin][User] Failed to add user:", err);
            })
    }

    function onEdit(data){
        console.log("data",data);
         const userInfo = jwtEncode({userInfo: data}, "matik_home")
         console.log("userInfo",userInfo);
         dispatch(editUser({userInfo}))
             .then(async (res)=>{
                 await getUserList()
                 .then((res) => {
                     setRows(res);
                     console.log("[Retrived][Admin][Users]: ",res);
                 })
                 .catch(() => {
                     setRows([])
                 })
             })
             .catch((err)=>{
                 console.log("[Admin][User] Failed to add user:", err);
             })
    }

    function onDelete(id){
        deleteUser(id)
            .then(async (res)=>{
                await getUserList()
                    .then((res) => {
                        setRows(res);
                        console.log("[Retrived][Admin][Users]: ",res);
                    })
                    .catch(() => {
                        setRows([])
                    })
            })
            .catch((err)=>{

            })
    }

    
    
    return (
    <Box component="Paper" >
        {
            createDialog && <CreateUserDialog open={true} handleClose={toggleCreateDialog}/>
        }
        <AdminTable
            columns={columns || []}
            rows={rows || []}
            title={'User Management'}
            modalTitle={'User'}
            validationSchema={validationSchema}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    </Box>
  );
}
