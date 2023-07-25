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
    TablePagination, 
    IconButton
} from "@mui/material"
import {
    AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon
} from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import _ from 'lodash'
// import { getDeviceAPI } from '../../service'



export default function AdminTable({columns, rows}) {
	const navigate  = useNavigate();
	const [tableRows, setTableRows] = React.useState([]);
    const [page, setPage] = React.useState(0);
    
    const [createDialog, setCreateDialog] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
	
	React.useEffect(()=>{
		setTableRows(rows)
	}, [rows])

    const toggleCreateDialog = () => {
        setCreateDialog(!createDialog)
    }
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    };

    const visibleRows = React.useMemo(
        () =>
            tableRows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [tableRows, page, rowsPerPage],
    );

    const CustomColumnCell = ({row, column}) => {
        switch (column?.data) {
            case 'menu':
                return <TableCell align={column?.align}><IconButton> <MoreVertIcon/> </IconButton></TableCell>
                    
            case 'password':
                return <TableCell align={column?.align}>••••••••</TableCell>

            case 'role':
                    return <TableCell align={column?.align}>{row[column?.data] ? "Administrator" : "General User"}</TableCell>
            
            case 'rooms':
            case 'members':
            case 'devices': 
                return <TableCell align={column?.align}>{row[column?.data]?.length || 0}</TableCell>

            default:
                return <TableCell align={column?.align}>{row[column?.data] || "-"}</TableCell>
        }
    }

    return (
    <Box component="Paper">
        <TableContainer component={Paper} sx={{maxHeight: 'calc(100vh - 250px)'}}>
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            columns && columns?.map((column) => {
                                return <TableCell align={column.align} sx={{ width: column?.width }}>{column?.label}</TableCell>
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        visibleRows && visibleRows?.map((row, idx) => {
                            console.log("row", row);
                            return (
                                <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    {
                                        columns?.map(column =>  <CustomColumnCell row={row} column={column}/>)
                                    }
                                </TableRow>
                            )
                        })
                    }
                    
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={tableRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Box>
  );
}
