import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Paper } from '@mui/material';
import { Formik, Form } from 'formik';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { generateProductKey } from '../../../../shared/util/common'

import { styled, createTheme, ThemeProvider } from '@mui/system';
import RoomField from './RoomField';
import DeviceField from './DeviceField';
import MemberField from './MemberField';

export default function FormDialog({
    open, 
    handleClose, 
    title, 
    type, 
    fields, 
    selected, 
    validationSchema,
    onAdd,
    onEdit
}) {
    const InputLabelStyled = styled(InputLabel)({
        // padding: 1, // means "1px", NOT "theme.spacing(1)"
        '&.MuiInputLabel-root': {
            'transform': 'translate(0, -1.5px) scale(0.75)!important'
        }
    });

    const [initVal, setInitVal] = React.useState({});


    React.useEffect(()=>{
        let temp = {};
        console.log("validationSchema", validationSchema.fields);
        validationSchema.fields && Object.keys(validationSchema?.fields)?.map((item) => {
            console.log("[Key]", validationSchema?.fields[item]['type'], item);
            temp[item] = ''
            if(type === 'edit'){
                temp[item] = selected[item]
                if(item === 'home'){
                    temp[item] = selected[item]
                }
            }else {
                if(item === 'key'){
                    temp[item] = generateUuid()
                }else if(validationSchema?.fields[item]['type'] === 'string'){
                    temp[item] = ""
                }else if(validationSchema?.fields[item]['type'] === 'array'){
                    console.log("[Array]", validationSchema?.fields[item]);
                    if(validationSchema?.fields[item]['innerType']['type'] === 'object'){
                        temp[item] = []
                        const obj = Object.keys(validationSchema?.fields[item]['innerType']['fields']).map((type) => type).reduce((accumulator, value) => {
                            return {...accumulator, [value]: value === 'type' ? 0 : ''};
                          }, {});
                          
                        console.log("[obj]",obj);
                        temp[item][0] = obj
                        
                    }else{                    
                        temp[item] = []
                    }
                    console.log("[temp]", temp);
                }
            }
        })
        setInitVal(temp)
    }, [validationSchema])

    const generateUuid = () => {
        let code = generateProductKey()
        console.log("generateProductKey", code);
        return code
    }

    return (
    <Dialog open={open} onClose={handleClose}  maxWidth="sm">
        <DialogTitle sx={{paddingBlock: 1}}>{type === "Add" && "Create New "}{type === "Edit" && "Update "}{type === "Delete" && "Delete "}{title}</DialogTitle>
            <Formik
                initialValues={type === 'Add' ? initVal : selected }
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log("values", values);
                        if(type === 'Add'){
                            onAdd(values)
                        }
                        if(type === 'Edit'){
                            onEdit(values)
                        }
                        setSubmitting(false);
                    }, 400);
                }}
                >
                {({ 
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    handleSubmit,
                    isSubmitting
                }) => 
                
                {
                    console.log("[dialog]",values);
                    return (
                        <Form>
                            <DialogContent>
                            {
                                values && [...fields]?.map((field)=> {
                                    // console.log("field",values, field.value, values[field.value].id);
                                    switch(field.fieldType){
                                        case 'text':
                                            return <TextField
                                                        margin="dense"
                                                        id={field.value}
                                                        name={field.value}
                                                        label={field.label}
                                                        type={field.type}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values[field.value]}
                                                        error={touched[field.value] && errors[field.value]}
                                                        fullWidth
                                                        variant="standard"
                                                        sx={{
                                                            marginTop: 0,
                                                            maxWidth: '100%'
                                                        }}
                                                    />
    
                                        case 'uuid':
                                            return (
                                                <FormControl 
                                                    margin="dense"
                                                    fullWidth   
                                                    sx={{
                                                        maxWidth: '100%'
                                                    }} 
                                                >
                                                    <InputLabelStyled>{field.label}</InputLabelStyled>
                                                    <Input
                                                        disabled
                                                        margin="dense"
                                                        id={field.value}
                                                        name={field.value}
                                                        label={field.label}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values[field.value]}
                                                        error={touched[field.value] && errors[field.value]}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    disabled={type === "Edit"}
                                                                    aria-label="toggle password visibility"
                                                                    edge="end"
                                                                    onClick={()=>{setFieldValue(field.value, generateUuid())}}
                                                                >
                                                                    <KeyIcon /> 
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                              </FormControl>
                                            )
                                            
                                        
                                        case 'password':
                                            return <TextField
                                                        margin="dense"
                                                        id={field.value}
                                                        name={field.value}
                                                        label={field.label}
                                                        type={"password"}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values[field.value]}
                                                        error={touched[field.value] && errors[field.value]}
                                                        fullWidth
                                                        variant="standard"
                                                        sx={{
                                                            marginTop: 0,
                                                            maxWidth: '100%'
                                                        }}
                                                    />

                                        case 'room':
                                            return <RoomField 
                                                        field={field} 
                                                        values={values }
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        touched={touched}
                                                        errors={errors}
                                                    />

                                        case 'pulldown':
                                            if(field.label === 'Channels' && values['device_type'] === 1){
                                               values['channel'] = 2;
                                            }
                                            
                                            return <TextField
                                                        select
                                                        margin="dense"
                                                        id={field.value}
                                                        name={field.value}
                                                        label={field.label}
                                                        type={field.type}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values[field.value]}
                                                        error={touched[field.value] && errors[field.value]}
                                                        fullWidth
                                                        variant="standard"
                                                        sx={{
                                                            marginTop: 0,
                                                            maxWidth: '100%',
                                                            display: field.label === 'Channels' && values['device_type'] === 1 ? 'none' : 'block'
                                                        }}
                                                    >
                                                        {
                                                            [...field.options].map((option)=>{
                                                                return <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
                                                            })
                                                        }
                                                    </TextField>

                                        
                                        case 'home':
                                            return <TextField
                                                        select
                                                        margin="dense"
                                                        id={field.value}
                                                        name={field.value}
                                                        label={field.label}
                                                        type={field.type}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={type === "Add" ? values[field.value] : values[field.value]}
                                                        error={touched[field.value] && errors[field.value]}
                                                        fullWidth
                                                        variant="standard"
                                                        sx={{
                                                            marginTop: 0,
                                                            maxWidth: '100%'
                                                        }}
                                                    >
                                                        {
                                                            [...field.options].map((option)=>{
                                                                return <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
                                                            })
                                                        }
                                                    </TextField>

                                        case 'device':
                                            return <DeviceField 
                                                        field={field} 
                                                        values={values }
                                                        handleChange={handleChange}
                                                        handleBlur={handleBlur}
                                                        touched={touched}
                                                        errors={errors}
                                                    />

                                    case 'member':
                                        return <MemberField 
                                                    field={field} 
                                                    values={values }
                                                    handleChange={handleChange}
                                                    handleBlur={handleBlur}
                                                    touched={touched}
                                                    errors={errors}
                                                />

                                        default: return <></>
                                    }
                                })
                            }
                            
                            </DialogContent>
                            
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit" variant='contained' disabled={isSubmitting} >Create</Button>
                            </DialogActions>
                        </Form>
                    )
                }}
            </Formik>
    </Dialog>
    );
}