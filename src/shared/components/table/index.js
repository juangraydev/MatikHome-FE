import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Button, Typography, Paper, TextField, IconButton  } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '../modal/index'
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function DataTable({title,  columns, rows, pageSize}) {
  const [openAdd, setOpenAdd] = React.useState(false)
 
  const handleOpenAdd = () => {
    setOpenAdd(true);
  }

  const handleCloseAdd = () => {
    setOpenAdd(false)
  }

  return (
    <>
      <Modal open={openAdd} handleClose={handleCloseAdd} >
        <Paper elevation={3} sx={{ display: "flex", flexDirection: "column",  position: "relative", height: 'fit-content', width: 350, margin: "calc(100vh - 95vh + 10px) auto", padding: "35px", backdropFilter: "blur(5)"}} >   
          <IconButton sx={{ position: "absolute", right: 20, top: 20}} onClick={handleCloseAdd}>
              <CloseIcon/>
          </IconButton>  
          <Typography gutterBottom sx={{fontWeight: 600 ,display: "flex", flexGrow: 1, alignItems: "center"}}>Add {title} </Typography>
          {
            columns.map((col) => {
              if(col.field != 'action'){

                if(col?.fieldType == 'textfield'){
                  return <TextField 
                            width={'100%'} 
                            id={col.field} 
                            label={col.field == 'id' ? col.headerName : col.headerName+"*"} 
                            disabled={col.field == 'id'} 
                            value={col.field == 'id' ? rows?.length + 1 : ''}  
                            variant="standard" 
                            sx={{marginBlock: "3px"}}
                          />
                }else if(col?.fieldType == 'dropdown'){
                  const handleChange = (event) => {
                  };
                  return <>
                    <InputLabel 
                      id="demo-simple-select-label" 
                      sx={{
                        marginTop: "3px",
                        fontSize: "12px",
                        width: "fit-content"
                      }}>
                        {col.headerName}*
                    </InputLabel> 
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={col && col.fieldValues[0]}
                      variant="standard" 
                      sx={{marginBottom: "3px"}}
                      onChange={handleChange}
                    >
                      {
                        col?.fieldValues.map((value, idx)=><MenuItem value={idx}>{value}</MenuItem>)
                      }
                    </Select>
                  </>
                }

                return <></>
              }
            })
          }
          <div style={{display: "flex", justifyContent: "center", padding: 10}}>
            <Button variant="contained" color="primary" sx={{paddingInline: 6, marginInline: 1}}>Submit</Button>
            <Button variant="outlined" color="error" sx={{paddingInline: 6, marginInline: 1}} onClick={handleCloseAdd} >Cancel</Button>
          </div>
        </Paper>
      </Modal>
      <Container maxWidth={false} sx={{padding:"0px!important", display: "flex", marginBottom: 1}}>
        <Typography sx={{fontWeight: 600 ,display: "flex", flexGrow: 1, alignItems: "center"}}>{title + " List"} </Typography>
        <Button onClick={()=>handleOpenAdd()} size='small' variant="contained"  startIcon={<AddCircleOutlineIcon />}>
            Add {title}
        </Button>
      </Container>
      <DataGrid
        sx={{
          height: '200px!important',
          '.MuiDataGrid-cell': { minHeight:  "100px!important", maxHeight:  "100px!important"},
          '.MuiDataGrid-row': { minHeight:  "300px!important",maxHeight:  "300px!important"},
          
        }}
        rows={rows || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: pageSize },
          },
        }}
        checkboxSelection={false}
        loading={!rows}
      />
    </>
  );
}