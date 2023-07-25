// import * as React from 'react';
// import { useNavigate } from "react-router-dom";
// import {
// 	Container,
// 	Box,
// 	Link,
// 	Typography,
// 	Paper,
// 	TableRow,
// 	TableHead,
//     TableContainer,
//     TableCell,
//     TableBody,
//     Stack,
//     Modal,
//     Table,
//     FormControl,
//     TablePagination, 
//     IconButton
// } from "@mui/material"
// import {
//     AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon
// } from '@mui/icons-material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { getDeviceAPI } from '../../service'

// import CreateDialog from './component/create-device-dialog';


// export default function DeviceManagement() {
// 	const navigate  = useNavigate();
// 	const [devices, setDevices] = React.useState([]);
//     const [page, setPage] = React.useState(0);
    
//     const [createDialog, setCreateDialog] = React.useState(false)
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);
	
// 	React.useEffect(()=>{
// 		getDeviceAPI()
// 			.then((res) => {
// 				setDevices(res);
// 			})
// 			.catch(() => {
// 				setDevices([])
// 			})
// 	}, [])

//     const toggleCreateDialog = () => {
//         setCreateDialog(!createDialog)
//     }
    
//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };
    
//     const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//     };

//     const visibleRows = React.useMemo(
//     () =>
//         devices.slice(
//             page * rowsPerPage,
//             page * rowsPerPage + rowsPerPage,
//         ),
//     [page, rowsPerPage],
//     );


//     return (
//     <Box component="Paper">
//         {
//             createDialog && <CreateDialog open={true} handleClose={toggleCreateDialog}/>
//         }
//         <Box component={"div"} sx={{display: "flex", justifyContent: "space-between", alignContent: "center"}}>
//             <Typography variant='menu'>
//                 Device list
//             </Typography>
//             <IconButton size="small" sx={{color: "#039be5", marginInline: 1}} onClick={toggleCreateDialog}>
//                 <AddCircleOutlineOutlinedIcon/>
//             </IconButton>
//         </Box>
//         <TableContainer component={Paper} sx={{maxHeight: 'calc(100vh - 250px)'}}>
//             <Table stickyHeader aria-label="simple table">
//                 <TableHead>
//                     <TableRow>
//                         <TableCell align="left" sx={{ width: '5%' }}>No.</TableCell>
//                         <TableCell align="left" sx={{width: '25%'}}>Key</TableCell>
//                         <TableCell align="left" sx={{width: '25%'}}>Channels</TableCell>
//                         <TableCell align="left" sx={{width: '15%'}}>Home</TableCell>
//                         <TableCell align="left" sx={{width: '10%'}}> </TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {
//                         visibleRows && visibleRows?.map((device, idx) => {
//                             console.log("device", device);
//                             return (
//                                 <TableRow
//                                     key={idx}
//                                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//                                     >
//                                     <TableCell component="th" scope="row">{idx+1}</TableCell>
//                                     <TableCell align="left">{device?.key}</TableCell>
//                                     <TableCell align="left">8 Channels</TableCell>
//                                     <TableCell align="left">{device?.home}</TableCell>
//                                     <TableCell align="right">
//                                         <IconButton>
//                                             <MoreVertIcon/>
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             )
//                         })
//                     }
                    
//                 </TableBody>
//             </Table>
//         </TableContainer>
//         <TablePagination
//           component="div"
//           count={devices.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//     </Box>
//   );
// }




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

import { getDeviceAPI } from '../../service'


const columns = [
    {label: 'Key', data: 'key', align: 'left', width: '30%'},
    {label: 'Channels', data: 'channels', align: 'left', width: '30%'},
    {label: 'Home', data: 'home', align: 'left', width: '30%'},
    {label: '', data: 'menu', align: 'right', width: '10%'},
]

export default function DeviceManagement() {
	const navigate  = useNavigate();
    
    const [createDialog, setCreateDialog] = React.useState(false)
	const [rows, setRows] = React.useState([])

    React.useEffect(()=>{
		getDeviceAPI()
			.then((res) => {
				setRows(res);
                console.log("res",res);
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

