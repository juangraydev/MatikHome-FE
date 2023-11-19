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
import * as Yup from 'yup';
// import CreateDialog from './component/create-device-dialog';

import { getAdminDeviceAPI, deleteAdminDevice, addAdminDeviceAPI, editAdminDeviceAPI} from './store/sevice'
import { getHomeList } from '../HomeManagement/store/service'
import { useDispatch } from 'react-redux';

const init_columns = [
    {label: 'Key', data: 'key', fieldType: 'uuid', align: 'left', width: '25%'},
    {label: 'Type', data: 'type', fieldType: 'pulldown', options: [{label: "Monitor", value: 1}, {label: "Control", value: 2}, {label: "Security", value: 3}],align: 'left', width: '25%'},
    {label: 'Home', data: 'home.name', fieldType: 'home', options: [], align: 'left', width: '25%'},
]


export default function DeviceManagement() {
	const navigate  = useNavigate();
    const dispatch = useDispatch();
    
    const [createDialog, setCreateDialog] = React.useState(false)
	const [rows, setRows] = React.useState([])
	const [columns, setColumns] = React.useState(init_columns)

    const validationSchema = Yup.object().shape({
        key: Yup.string()
            .required('This Field is Required!'),
        type: Yup.string()
            .required('This Field is Required!'),
        home_id: Yup.string(),
        
    });

    React.useEffect(()=>{
		getAdminDeviceAPI()
			.then((res) => {
				setRows(res);
			})
			.catch(() => {
				setRows([])
			})
        
        getHomeList()
			.then((res) => {
				setColumns([
                    {label: 'Key', data: 'key', value: 'key', fieldType: 'uuid', align: 'left', width: '33%'},
                    {label: 'Type', data: 'type',  value: 'type', fieldType: 'pulldown', options: [{label: "Monitor", value: 1}, {label: "Security", value: 2}, {label: "Control(2 Channels)", value: 3}, {label: "Control(4 Channels)", value: 4}],align: 'left', width: '25%'},
                    {label: 'Home', data: 'home.name', value: 'home_id', fieldType: 'home', options: res.map(home => {return {value: home.id,label: home.name}}) || [], align: 'left', width: '34%'},
                
                ])
			})
			.catch(() => {
				setColumns(init_columns)
			})
	}, [])


    const toggleCreateDialog = () => {
        setCreateDialog(!createDialog)
    }

    const onAdd = (data) => {
        dispatch(addAdminDeviceAPI(data))
            .then(async (res)=>{
                await getAdminDeviceAPI()
                    .then((res) => {
                        setRows(res);
                        console.log("[Retrived][Admin][Device]: ",res);
                    })
                    .catch(() => {
                        setRows([])
                    })
            })
            .catch((err)=>{

            })
    }

    const onEdit = (data) => {
        
        console.log("[onEdit]:", data)
        dispatch(editAdminDeviceAPI(data))
            .then(async (res)=>{
                await getAdminDeviceAPI()
                    .then((res) => {
                        setRows(res);
                        console.log("[Retrived][Admin][Device]: ",res);
                    })
                    .catch(() => {
                        setRows([])
                    })
            })
            .catch((err)=>{

            })
    }

    const onDelete = (id) => {
        deleteAdminDevice(id)
            .then(async (res)=>{
                await getAdminDeviceAPI()
                    .then((res) => {
                        setRows(res);
                        console.log("[Retrived][Admin][Device]: ",res);
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
        <AdminTable
            columns={columns || []}
            rows={rows || []}
            title={'Device Management'}
            modalTitle={'Device'}
            validationSchema={validationSchema}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    </Box>
  );
}

