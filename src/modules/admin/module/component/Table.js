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
    IconButton,
    Toolbar
} from "@mui/material"
import {
    Add,
    AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon,
    Delete,
    Edit
} from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import _ from 'lodash'
import FormDialog from './CustomDialog';
import CreateHomeDialog from './CreateHomeDialog'
import EditHomeDialog from './EditHomeDialog'
import ConfirmModal from '../../../../shared/components/modal/ConfirmModal';
// import { getDeviceAPI } from '../../service'



export default function AdminTable({
    columns, 
    rows, 
    title, 
    modalTitle, 
    validationSchema,
    onAdd,
    onEdit,
    onDelete
}) {
	const navigate  = useNavigate();
	const [tableRows, setTableRows] = React.useState([]);
    const [page, setPage] = React.useState(0);

    
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogType, setDialogType] = React.useState("Add");
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    
    const [createDialog, setCreateDialog] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
	
    const [selected, setSelected] = React.useState([]);

	React.useEffect(()=>{
		setTableRows(rows)
        console.log("initialized", rows);
	}, [rows])


    React.useEffect(()=>{
        console.log("[selected]", selected, tableRows, tableRows.filter((row) => row.id === selected[0]));
        
	}, [selected])

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
        console.log("[type]", row, column?.data);
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

            case 'type':
                return <TableCell 
                            align={column?.align}
                        >{
                            {
                                '1': "Monitor",
                                '2': "Security",
                                '3': "Control 2 Channels",
                                '4': "Control 4 Channels",
                                default:  "Monitor",
                            }[ row["type"]]}     
                            </TableCell>
            

            case 'channel': 
                return <TableCell align={column?.align}>{column?.data.split('.').reduce(function(o, k) {
                    return o && o[k];
                }, row) || 0}</TableCell>

            default:
                return <TableCell align={column?.align}>{column?.data.split('.').reduce(function(o, k) {
                    return o && o[k];
                  }, row) || "-"}</TableCell>
        }
    }

    const handleClick = (event, name) => {
        console.log("select", name, selected);
        const selectedIndex = selected?.indexOf(name);
        if(selectedIndex === 0 ) setSelected([]);
        else setSelected([name]);
    };
    

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setConfirmOpen(false)
    }

    const handleOpenDialog = (type) => {
        
        setDialogType(type)
        if(type === "Delete"){
            setConfirmOpen(true)
        }else {
            setDialogOpen(true)
        }
    }

    const handleConfirmDialogOk = () => {
        onDelete(selected)
        handleCloseDialog()
    }

    const handleOnAdd = (data) => {
        onAdd(data)
        setDialogOpen(false)
    }

    const handleOnEdit = (data) => {
        onEdit(data)
        setDialogOpen(false)
    }
    

    const isSelected = (name) => selected.indexOf(name) !== -1;

    return (
    <Box component="Paper">
        {
            dialogOpen && modalTitle !== 'Home' &&
            <FormDialog 
                open={true} 
                handleClose={handleCloseDialog} 
                title={modalTitle} 
                type={dialogType} 
                fields={columns}
                selected={tableRows.filter((row) => row.id === selected[0])[0]}
                validationSchema={validationSchema}
                onAdd={handleOnAdd}
                onEdit={handleOnEdit}
            />
        }

        { 
            dialogOpen && modalTitle === 'Home' && dialogType=== 'Add' &&
            <CreateHomeDialog 
                open={true} 
                handleClose={handleCloseDialog} 
                title={modalTitle} 
                type={dialogType} 
                fields={columns}
                selected={tableRows.filter((row) => row.id === selected[0])[0]}
                validationSchema={validationSchema}
                onAdd={handleOnAdd}
                onEdit={handleOnEdit}
            />
        }
        
        { 
            dialogOpen && modalTitle === 'Home' && dialogType=== 'Edit' &&
            <EditHomeDialog 
                open={true} 
                handleClose={handleCloseDialog} 
                title={modalTitle} 
                type={dialogType} 
                fields={columns}
                selected={tableRows.filter((row) => row.id === selected[0])[0]}
                validationSchema={validationSchema}
                onAdd={handleOnAdd}
                onEdit={handleOnEdit}
            />
        }



        {
            confirmOpen &&
                <ConfirmModal
                    type={dialogType}
                    title={modalTitle} 
                    open={true} 
                    handleClose={handleCloseDialog} 
                    handleOk={handleConfirmDialogOk}
                />
        }
        
        <TableContainer component={Paper} sx={{minHeight: '740px)'}}>
            <Toolbar
                sx={{
                    background: "#64b5f6",
                    color: "white", 
                    display: "flex",
                    justifyContent: "space-between"
                }}
                variant={'dense'}
            >   
                <Typography>{title}</Typography>
                <Box>
                    <IconButton sx={{color: "white"}} onClick={()=>handleOpenDialog("Add")}>
                        <AddCircleOutlineOutlinedIcon/>
                    </IconButton>
                    {
                        selected.length > 0 && 
                        <>
                            <IconButton sx={{color: "white"}} onClick={()=>handleOpenDialog("Edit")}>
                                <Edit/>
                            </IconButton>
                            <IconButton sx={{color: "white"}} onClick={()=>handleOpenDialog("Delete")}>
                                <Delete/>
                            </IconButton>
                        </>
                    }
                </Box>
            </Toolbar>
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
                            const isItemSelected = isSelected(row?.id);
                            return (
                                <TableRow
                                    key={row.id}
                                    hover
                                    selected={isItemSelected}
                                    onClick={(event) => handleClick(event, row?.id)}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
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
