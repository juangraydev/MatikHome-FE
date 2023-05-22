import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ModalCard from '@mui/material/Modal' 
import TextField from '@mui/material/TextField' 

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Save from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from '@mui/material/Stack';
import {
Paper,
  IconButton,
  Container
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import DataTable from '../../../shared/components/table/index'

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';

const style = {
  position: 'absolute',
  top: '25%',
  left: '50%',
  transform: 'translate(-50%, -25%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const roomCol = [
    { field: 'id', headerName: 'No.', width: 100, fieldType: 'textfield' },
    { field: 'name', headerName: 'Name', width: 200, fieldType: 'textfield' },
    { field: 'type', headerName: 'Type', width: 200, fieldType: 'dropdown', fieldValues: [<KitchenIcon/>, <ChairIcon/>, <SingleBedIcon/>, <GarageIcon/>, <BusinessIcon/>] },
    {
        field: 'action',
        headerName: 'Action',
        width: 300,
        sortable: false,
        disableClickEventBubbling: true,
        
        renderCell: (params) => {
            const onClick = (e) => {
              const currentRow = params.row;
              return alert(JSON.stringify(currentRow, null, 4));
            };
            
            return (
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" color="warning" size="small" onClick={onClick}>Edit</Button>
                <Button variant="outlined" color="error" size="small" onClick={onClick}>Delete</Button>
              </Stack>
            );
        },
      }
  ]

const roomRows = [
    { id: 1, no: 2, name: "room12", type: 1},
]

export default function GeneralSetting({data}) {
//   const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState("Home_Setting");
  const [addBtn, setAddBtn] = React.useState(0);
  const [houseName, setHouseName] = React.useState("");
  const [rooms, setRooms] = React.useState([]);

  React.useEffect(() => {
    setHouseName(data?.name);
    setRooms(data?.rooms);
    console.log("data:", data);
  },[data])

  const handleChangeName = (e) => {
    setHouseName(e.target.value);
  }


  const handleCancelName = () => {
    setHouseName(data?.name);
  }
  
  const handleChange = (panel) => (event, isExpanded) => {
        console.log("event:",addBtn);
      if(addBtn == 0){
        setExpanded(isExpanded ? panel : false);
      }else {
        setAddBtn(0)
      }
  };
  
  return (
    <Box sx={style} width={800}>
        <Typography variant='h6' gutterBottom sx={{ width: '33%', flexShrink: 0 }}>
            General Settings
        </Typography>
        <div>
        <Accordion expanded={expanded === 'Home_Setting'} onChange={handleChange('Home_Setting')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography variant='h6'  sx={{ width: '88%', flexShrink: 0 }}>
                Home Settings
            </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{display: "flex"}}>
                <TextField 
                id="name" 
                label="Home Name" 
                variant="outlined" 
                value={houseName}
                sx={{ width: '-webkit-fill-available', marginRight: 1}}
                onChange={handleChangeName}
                // sx={{marginTop: "15px", width: "100%"}} 
                // error={formError?.name}
                // helperText={formError?.name}
                />
                <div style={{ minWidth: '80px', display: "flex", alignItems: "center"}}>
                <IconButton color={"primary"} >
                    <Save/>
                </IconButton>
                <IconButton color={"error"} onClick={handleCancelName}>
                    <CancelIcon/>
                </IconButton>
                </div>
                
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'Room_Setting'} onChange={handleChange('Room_Setting')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            >
                <Typography variant='h6' sx={{ flexGrow: 1, display: "flex", alignItem: "center" }}>Room Setting</Typography>
                
            </AccordionSummary>
            <AccordionDetails>
                <DataTable title="Room" columns={roomCol} rows={rooms} pageSize={5}/>
            </AccordionDetails>
        </Accordion>


        <Accordion expanded={expanded === 'Device_Setting'} onChange={handleChange('Device_Setting')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            >
                <Typography variant='h6' sx={{ flexGrow: 1, display: "flex", alignItem: "center" }}>Device Setting</Typography>
                
            </AccordionSummary>
            <AccordionDetails>
                <DataTable title="Device" columns={roomCol} rows={roomRows} pageSize={5}/>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'Accessibility_Setting'} onChange={handleChange('Accessibility_Setting')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            >
                <Typography variant='h6' sx={{ flexGrow: 1, display: "flex", alignItem: "center" }}>Accessibility Setting</Typography>
            
            </AccordionSummary>
            <AccordionDetails>
                <DataTable title="Access" columns={roomCol} rows={roomRows} pageSize={5}/>
            </AccordionDetails>
        </Accordion>
        </div>
    </Box>
  );
}