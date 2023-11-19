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

import * as Yup from 'yup';
import { getHomeList, addHome, deleteHome } from './store/service'
import { useDispatch } from 'react-redux';


const columns = [
    {label: 'Nickname', data: 'name', value: 'name', fieldType: 'text', align: 'left', width: '25%'},
    {label: 'Address', data: 'address', value: 'address', fieldType: 'text', align: 'left', width: '30%'},
    {label: 'Created By', data: 'created_by.username', value: 'created_by', fieldType: 'text', align: 'left', width: '15%'},
    {label: 'Members', data: 'members', value: 'members', fieldType: 'member', align: 'left', width: '10%'},
    {label: 'Rooms', data: 'rooms', value: 'rooms', fieldType: 'room', align: 'left', width: '10%'},
    {label: 'Devices', data: 'devices', value: 'devices', fieldType: 'device', align: 'left', width: '10%'},
]

export default function HomeManagement() {
    const dispatch = useDispatch
	const navigate  = useNavigate();
    
    const [createDialog, setCreateDialog] = React.useState(false)
	const [rows, setRows] = React.useState([])

    const validationSchema = Yup.object().shape({
        name: Yup.string('')
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
        address: Yup.string()
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
        rooms: Yup.array()
            .of(
                Yup.object()
                    .shape({
                        type: Yup.string().required('This field is required!'),
                        name: Yup.string().required('This field is required!')
                    })
            ),
        devices: Yup.array()
            .of(
                Yup.string()
                    .required()
            )
        // members: Yup.array()
        //     .Yup.object()
        //         .Yup.shape({
        //             id: Yup.string(),
        //             name: Yup.string()
        //         }),
        // devices: Yup.string()
        //     .required('This Field is Required!'),
    });

    React.useEffect(()=>{
		getHomeList()
			.then((res) => {
				setRows(res);
                console.log("[Retrived][Admin][Home]: ",res);
			})
			.catch(() => {
				setRows([])
			})
	}, [])

    const onAdd = (data) => {
        addHome(data)
            .then(async (res)=>{
                await getHomeList()
                .then((res) => {
                    setRows(res);
                    console.log("[Retrived][Admin][Home]: ",res);
                })
                .catch(() => {
                    setRows([])
                })
            })
            .catch((err)=>{
                console.log("[add home error]", err);
            })
    }

    const onEdit = () => {
        
    }
    
    const onDelete = (id) => {
        deleteHome(id)
            .then(async (res)=>{
                await getHomeList()
                    .then((res) => {
                        setRows(res);
                        console.log("[Retrived][Admin][Home]: ",res);
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
            title={'Home Management'}
            modalTitle={'Home'}
            validationSchema={validationSchema}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    </Box>
  );
}
