import * as React from 'react';
import { Formik, Form, Field, FieldArray } from "formik";
// import { Switch } from "material-ui-formik-components/Switch";
// import { ChipInput } from "material-ui-formik-components";
// import { ChipInput as Chip } from "material-ui-chip-input";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from "react-router-dom";
import _without from "lodash/without";
import _ from 'lodash'
import {
	Container,
	Box,
	Link,
	Typography,
	Paper,
    Select,
	TableRow,
	TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Stack,
    Modal,
    Table,
    Button,
    ListItem,
    Chip,
    Menu,
    MenuItem
} from "@mui/material"
import {
    AddCircleOutlineOutlined as AddCircleOutlineOutlinedIcon
} from '@mui/icons-material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import CancelIcon from '@mui/icons-material/Cancel';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAdminDeviceAPI} from '../DeviceManagement/store/sevice'


const initialSelected = ["April Tucker", "Ralph Hubbard"];

export default function RoomField({field, values, handleBlur, handleChange, errors, touched}) {
    console.log("values array",values[field.value], field);
	const [rows, setRows] = React.useState([])

    React.useEffect(()=>{
        getAdminDeviceAPI()
			.then((res) => {
				setRows(res);
			})
			.catch(() => {
				setRows([])
			})
    }, [])
    const [personName, setPersonName] = React.useState(initialSelected);

    const handleChangeChips = (event) => {
        setPersonName(event.target.value );
    };

    const handleDelete = (e, value) => {
        e.preventDefault();
        console.log("clicked delete");
        setPersonName((current) => _without(current, value));
    };

    const names = [
        "Oliver Hansen",
        "Van Henry",
        "April Tucker",
        "Ralph Hubbard",
        "Omar Alexander",
        "Carlos Abbott",
        "Miriam Wagner",
        "Bradley Wilkerson",
        "Virginia Andrews",
        "Kelly Snyder"
      ];
    console.log("[rows]",values[field.value] );

    return (
        <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel id="demo-mutiple-chip-checkbox-label">
                Devices
            </InputLabel>
            {
                _.isArray(values[field.value]) &&
                <Select
                    labelId="demo-mutiple-chip-checkbox-label"
                    // id="demo-mutiple-chip-checkbox"
                    id={field.value}
                    name={field.value}
                    label={field.label}
                    multiple
                    value={values[field.value] }
                    onChange={handleChange}
                    onOpen={() => console.log("select opened")}
                    variant='standard'
                    IconComponent={KeyboardArrowDownIcon}
                    renderValue={(selected) => (
                        <div >
                        {(selected).map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                clickable
                                deleteIcon={
                                    <CancelIcon
                                        onMouseDown={(event) => event.stopPropagation()}
                                    />
                                }
                                onDelete={(e) => handleDelete(e, value)}
                                onClick={(e) => console.log("clicked chip", e.target)}
                            />
                        ))}
                        </div>
                    )}
                >
                {rows.map((option) => (
                    <MenuItem key={option.id} value={option.key} sx={{ paddingBottom: 0}}>
                        <ListItemText primary={option.key} />
                    </MenuItem>
                ))}
                </Select>
            }
            
        </FormControl>
    )

    return (
        <FieldArray
        id={'devices'}
        name={'devices'}
        render={({ insert, remove, push }) => (
            <Box
                component={"div"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    mt: 2,
                    width: '100%'
                }}
            >
                <Box
                    component={'div'}
                    sx={{
                        display: "flex",
                        // flexDirection: 'column',
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: '100%'
                    }}
                >
                    <Typography variant="button" sx={{fontWeight: 600}}>Devices</Typography>
                    <IconButton sx={{backgroundColor: "#f1f6fc", marginInline: 1}} onClick={() => push('')}>
                        <AddCircleOutlineOutlinedIcon size="small" />
                    </IconButton>
                </Box>
                    <FormControl>
                        <InputLabel id="demo-mutiple-chip-checkbox-label">
                            Devices
                        </InputLabel>
                        <Select
                            labelId="demo-mutiple-chip-checkbox-label"
                            id="demo-mutiple-chip-checkbox"
                            multiple
                            value={values[field.value] }
                            onChange={handleChange}
                            onOpen={() => console.log("select opened")}
                            variant='standard'
                            IconComponent={KeyboardArrowDownIcon}
                            renderValue={(selected) => (
                                <div >
                                {(selected).map((value) => (
                                    <Chip
                                        key={value}
                                        label={value}
                                        clickable
                                        deleteIcon={
                                            <CancelIcon
                                                onMouseDown={(event) => event.stopPropagation()}
                                            />
                                        }
                                        onDelete={(e) => handleDelete(e, value)}
                                        onClick={(e) => console.log("clicked chip", e.target)}
                                    />
                                ))}
                                </div>
                            )}
                        >
                        {rows.map((option) => (
                            <MenuItem key={option.id} value={option.key} sx={{ paddingBottom: 0}}>
                                <ListItemText primary={option.key} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                {/* <Stack
                    component={"Stack"}
                    direction="column" 
                    spacing={1}
                    sx={{                 
                        // maxHeight: '180px',   
                        overflowX: 'auto'
                        // scrollPaddingTop: 2
                    }}
                >

                    
                    {
                        values[field.value]?.length > 0 &&
                        values[field.value]?.map((item, idx) => {
                            console.log("[item]",values, field.value, values[field.value][idx]);
                            return(
                                <div 
                                    key={idx} 
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 10
                                    }}
                                >
                                    
                                    <TextField 
                                        {...field} 
                                        select 
                                        type="text" 
                                        label="Type" 
                                        variant="standard"
                                        fullWidth
                                        sx={{
                                            paddingBottom: 0,
                                            '.MuiSelect-outlined': {
                                                padding: '13px'
                                            }
                                        }}
                                        error={touched[field.value] && errors[field.value]}
                                    >
                                        {rows.map((option) => (
                                            <MenuItem key={option.id} value={option.key} sx={{ paddingBottom: 0}}>
                                                {option.key}
                                            </MenuItem>
                                        ))}
                                    </TextField> 
                                    <IconButton  onClick={() => remove(idx)}>
                                        <DeleteForeverRoundedIcon/>
                                    </IconButton>
                                </div>
                            )
                        })
                    }
                </Stack> */}
            </Box>
            
        )}
      />
  );
}