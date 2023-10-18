import * as React from 'react';
import { Formik, Form, Field, FieldArray } from "formik";
// import { Switch } from "material-ui-formik-components/Switch";
// import { ChipInput } from "material-ui-formik-components";
// import { ChipInput as Chip } from "material-ui-chip-input";
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
    Button,
    IconButton,
    ListItem,
    Chip,
    TextField,
    Menu,
    MenuItem
} from "@mui/material"
import {
    AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon
} from '@mui/icons-material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function RoomField({field, values, handleBlur, handleChange, errors, touched, isHomeSetting=false}) {
    console.log("values array",values, values[field.value], field);
    const roomIcons = [
        {value: 0, label: <KitchenIcon sx={{height: 28}}/>},
        {value: 1, label: <ChairIcon sx={{height: 28}}/>},
        {value: 2, label: <SingleBedIcon sx={{height: 28}}/>},
        {value: 3, label: <BusinessIcon sx={{height: 28}}/>},
        {value: 4, label: <GarageIcon sx={{height: 28}}/>},
    ]


    console.log("touched", touched, errors);
    return (
        <FieldArray
        id={'rooms'}
        name={'rooms'}
        render={({ insert, remove, push }) => (
            <Box
                component={"div"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    mt: 1,
                    width: '100%',
                    height: 'calc(100vh - 300px)'
                }}
            >
                <Box
                    component={'div'}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: '100%'
                    }}
                >
                    <Typography variant="button" sx={{fontWeight: 600}}>Rooms</Typography>
                    <IconButton sx={{backgroundColor: "#f1f6fc"}} onClick={() => push({ type: 0, name: "" })}>
                        <AddCircleOutlineOutlinedIcon size="small" />
                    </IconButton>
                </Box>
                <Stack
                    component={"Stack"}
                    direction="column" 
                    spacing={1}
                    sx={{                 
                        maxHeight: isHomeSetting ? '100%' : '180px',   
                        overflowX: 'auto'
                        // scrollPaddingTop: 2
                    }}
                >
                    {
                        values[field.value]?.length > 0 &&
                        values[field.value]?.map((item, idx) => {
                            console.log("[item]",values[field.value][idx]['type']);
                            return(
                                <div 
                                    key={idx} 
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10
                                    }}
                                >
                                    
                                    <Field
                                        name={`rooms.${idx}.type`}
                                        render={({ field /* { name, value, onChange, onBlur } */ }) => (
                                            <TextField 
                                                {...field} 
                                                select 
                                                type="text" 
                                                label="Type" 
                                                variant="standard"
                                                sx={{
                                                    '.MuiSelect-outlined': {
                                                        padding: '13px'
                                                    },
                                                    '.MuiSelect-select': {
                                                        height: '0px!important'
                                                    }
                                                }}
                                                error={touched[field.value] && errors[field.value]}
                                            >
                                                {roomIcons.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField> 
                                        )}
                                    />
                                    <Field
                                        name={`rooms.${idx}.name`}
                                        render={({ field /* { name, value, onChange, onBlur } */ }) => (
                                            <TextField 
                                                {...field} 
                                                type="text" 
                                                label="Rooms" 
                                                variant="standard"  
                                                error={touched?.rooms?.idx?.name ?? errors?.rooms?.idx?.name}
                                                sx={{
                                                    width: 'calc(100% - 110px)'
                                                }}
                                            />
                                        )}
                                    />
                                    <IconButton  onClick={() => remove(idx)}>
                                        <DeleteForeverRoundedIcon/>
                                    </IconButton>
                                    
                                </div>
                            )
                        })
                    }
                    
                </Stack>
            </Box>
        )}
      />
  );
}