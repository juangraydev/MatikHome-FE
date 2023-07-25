import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
	Container,
	Box,
    Button,
	Typography,
	Paper,
    Grid,
    IconButton,
    Menu,
    Stack,
    Modal,
    Icon,
    TextField,
    OutlinedInput,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from "@mui/material"

import CloseIcon from '@mui/icons-material/Close';
import { 
    selectHome,
    selectRoom
} from '../store/actionCreators'
import _ from 'lodash'
import { Settings, Troubleshoot } from "@mui/icons-material";
import LetterAvatar from '../../../../shared/components/avatar'
import Fade from '@mui/material/Fade';
import FormHelperText from '@mui/material/FormHelperText';

import KitchenIcon from '@mui/icons-material/Kitchen';
import ChairIcon from '@mui/icons-material/Chair';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import GarageIcon from '@mui/icons-material/Garage';
import BusinessIcon from '@mui/icons-material/Business';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useSelector, useDispatch } from 'react-redux'
import { space } from "postcss/lib/list";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { editHome } from '../service'
const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -10%)',
    minWidth: 292,
    width: "100%",
    maxWidth: 500,
    height: '400px',
    overFlow: "scroll",
    display: "block",
    p: 2
  };

export default function HomeSetting() {

    const [anchorElDashboardMenu, setAnchorElDashboardMenu] = React.useState(null);
    const [screenType , setScreenType] = React.useState('home-overview');

    const selectedHome = useSelector(state => state.homeData.selectedHome)

    const handleOpenHomeSetting = (event) => {
        setAnchorElDashboardMenu(Troubleshoot)
    }

    const handleCloseHomeSetting = () => {
        setAnchorElDashboardMenu(null)
    }
    

    const isSelected = (screen) => screenType == screen
    return (
    <>
        <IconButton 
            id="dashboard-button" 
            onClick={handleOpenHomeSetting} 
        >
            <Settings/>
        </IconButton>

        
        <Modal
            open={anchorElDashboardMenu}
            onClose={handleCloseHomeSetting}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{margin: 1}}
        >
            <Paper id="main" sx={style}>
                <Fade in={isSelected('home-overview')} >
                    <Box
                        id="home-overview"
                        sx={{
                            display: isSelected('home-overview') ? "block" : 'none' 
                        }}
                    >
                        <Box style={{display: "flex"}}>
                            <Typography variant="h6" sx={{ flexGrow: 1}}>Setting</Typography>
                            <IconButton onClick={handleCloseHomeSetting} sx={{float: "right", fontSize: 10}}>
                                <CloseIcon size="small"/>
                            </IconButton>
                        </Box>
                        <Box>
                            <Box
                                component={'div'}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start"
                                }}
                            >
                                <Box>
                                    <Typography 
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 20,
                                            color: "#141414"
                                        }}
                                    >
                                        {selectedHome?.name.charAt(0).toUpperCase() + selectedHome?.name.slice(1)}
                                    </Typography>
                                    <Typography 
                                        sx={{
                                            fontSize: 12,
                                            fontWeight: 600, 
                                            color: "rgb(67, 77, 91)"
                                        }}
                                    >
                                        {selectedHome?.address}
                                    </Typography>
                                </Box>
                                <IconButton sx={{backgroundColor: "#f1f6fc"}} onClick={()=>{setScreenType('home-info')}}>
                                    <KeyboardArrowRightIcon size="small" />
                                </IconButton>
                            </Box>
                        </Box>

                        {/** Start Households */}
                        <Box
                            component={"div"}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                mt: 1
                            }}
                        >
                            <Box
                                component={'div'}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography variant="button" sx={{fontWeight: 600}}>Households</Typography>
                                <IconButton sx={{backgroundColor: "#f1f6fc"}} onClick={()=>{setScreenType('home-holds')}}>
                                    <KeyboardArrowRightIcon size="small" />
                                </IconButton>
                            </Box>
                            <Stack direction="row" spacing={1}>
                                {
                                    selectedHome?.members 
                                        && selectedHome?.members?.map((member)=> {
                                            return <LetterAvatar name={member.full_name}/>
                                        })
                                }
                                <IconButton sx={{padding: 0}}>
                                    <LetterAvatar name="+" bgColor="#f1f6fc" color="#696d72"/>
                                </IconButton>
                            </Stack>
                        </Box>
                        {/** End Households */}

                        {/** Start Rooms */}
                        <Box
                            component={"div"}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                mt: 1
                            }}
                        >
                            <Box
                                component={'div'}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography variant="button" sx={{fontWeight: 600}}>Rooms</Typography>
                                <IconButton sx={{backgroundColor: "#f1f6fc"}}>
                                    <KeyboardArrowRightIcon size="small" />
                                </IconButton>
                            </Box>
                            <Stack
                                component={"Stack"}
                                direction="row" 
                                spacing={1}
                                sx={{                 
                                    height: 55,   
                                    overflowX: 'auto',
                                    scrollPaddingTop: 2
                                }}
                            >
                                {
                                    selectedHome?.rooms?.map((room) => {
                                        return(
                                            <Button 
                                                variant="contained"
                                                sx={{ 
                                                    background: "#1976d2", 
                                                    color: "#fff",
                                                    fontSize: '14px',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    minWidth: 'fit-content',
                                                    textAlign: "left",
                                                    maxHeight: 36,
                                                    '&:hover': {
                                                        color: 'white',
                                                    },
                                                }}
                                                startIcon={
                                                    {
                                                        0: (
                                                            <KitchenIcon />
                                                        ),
                                                        1: (
                                                            <ChairIcon />
                                                        ),
                                                        2: (
                                                            <SingleBedIcon/>
                                                        ),
                                                        3: (
                                                            <BusinessIcon/>
                                                        ),
                                                        4: (
                                                            <GarageIcon />
                                                        ),
                                                        default: (
                                                            <ChairIcon/>
                                                        )
                                                    }[room.type]
                                                }
                                                id={room?.id}
                                            >
                                                {room?.name}
                                            </Button>
                                        )
                                    })
                                }
                            </Stack>
                        </Box>
                        {/** End Rooms */}

                        {/** Start Devices */}
                        <Box
                            component={"div"}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                mt: 1
                            }}
                        >
                            <Box
                                component={'div'}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Typography variant="button" sx={{fontWeight: 600}}>Devices</Typography>
                                <IconButton sx={{backgroundColor: "#f1f6fc"}}>
                                    <KeyboardArrowRightIcon size="small" />
                                </IconButton>
                            </Box>
                            <Stack
                                component={"Stack"}
                                direction="row" 
                                spacing={1}
                                sx={{                 
                                    height: 55,   
                                    overflowX: 'auto',
                                    scrollPaddingTop: 2
                                }}
                            >

                            </Stack>
                        </Box>
                        {/** End Devices */}
                    </Box>
                </Fade>

                <HomeInfo
                    setScreenType={setScreenType}
                    handleCloseHomeSetting={handleCloseHomeSetting}
                    isSelected={isSelected}
                />

                <Homeholds
                    setScreenType={setScreenType}
                    handleCloseHomeSetting={handleCloseHomeSetting}
                    isSelected={isSelected}
                />
                    
                
            </Paper>
        </Modal>
    </>
  );
}

function HomeInfo({
    setScreenType,
    handleCloseHomeSetting,
    isSelected
}) {
    const dispatch = useDispatch()
    const [homeInfo, setHomeInfo] = React.useState(null)

    const [edit, setEdit] = React.useState(null)

    const selectedHome = useSelector(state => state.homeData.selectedHome)

    useEffect(()=>{
        setHomeInfo(selectedHome);
    }, [selectedHome])

    const homeInfoSchema = Yup.object().shape({
        name: Yup.string()
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
        address: Yup.string()
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
    });

    const handlEditField = (field) => {
        setEdit(field)
    }

    const editHomeAPI = (data) => {
        dispatch(editHome(data))
    }

    return (
    <Fade in={isSelected('home-info')}>
        <Box
            id="home-info"
            sx={{display: isSelected('home-info') ? "block" : "none"}}
        >
            <Box style={{display: "flex", alignItems: "center"}}>
                <IconButton onClick={()=>{setScreenType('home-overview')}}>
                    <ArrowBackIcon sx={{fontSize: 20}}/> 
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1}}>Home Information</Typography>
                <IconButton onClick={handleCloseHomeSetting} sx={{float: "right"}}>
                    <CloseIcon sx={{fontSize: 20}}/>
                </IconButton>
            </Box>
            <Box
                sx={{mt:1.5, gap: 2, display: 'flex', flexDirection: 'column'}}
            >

            <Formik
                initialValues={homeInfo}
                enableReinitialize={true}
                validationSchema={homeInfoSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setEdit(null)
                    setTimeout(() => {
                        let temp_data = {
                            id: values?.id,
                            name: values?.name,
                            address: values?.address
                        }
                        if(!_.isEqual(values, homeInfo)) editHomeAPI(temp_data)
                        
                        setSubmitting(false);
                    }, 400);
                    resetForm()
                }}
                >
                {({ 
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                }) => (
                    <Form>
                        <Box 
                            component={"div"}
                            onClick={()=>handlEditField('nickname')}
                        >
                            <Typography 
                                gutterBottom 
                                sx={{
                                    fontFamily: "inherit",
                                    fontSize: '12px', 
                                    color: "rgba(0, 0, 0, 0.6)", 
                                    textAlign: "left", 
                                    fontWeight: 600
                                }}
                            >
                                Home Nickname
                            </Typography>
                            {
                                edit != 'nickname' 
                                    ?   <Typography  
                                            sx={{
                                                fontFamily: "inherit",
                                                fontSize: '16px', 
                                                color: "rgba(0, 0, 0, 0.6)", 
                                                textAlign: "left", 
                                                fontWeight: 600, 
                                            }}
                                        >
                                            {values?.name}
                                        </Typography>
                                    :   <>
                                            <OutlinedInput 
                                                    id="name" 
                                                    placeholder="Home Nickname" 
                                                    sx={{width: "-webkit-fill-available"}}
                                                    size="small"
                                                    autoFocus
                                                    onBlur={handleSubmit}
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    error={touched?.name && errors?.name}
                                                />
                                            <FormHelperText error={touched?.name && errors?.name}>{touched?.name && errors?.name}</FormHelperText>
                                         </>
                            }
                        </Box>
                        
                        <Box 
                            component={"div"}
                            onClick={()=>handlEditField('address')}
                        >
                            <Typography 
                                gutterBottom 
                                sx={{
                                    fontFamily: "inherit",
                                    fontSize: '12px', 
                                    color: "rgba(0, 0, 0, 0.6)", 
                                    textAlign: "left", 
                                    fontWeight: 600, 
                                }}
                            >
                                Home Address
                            </Typography>
                            {
                                edit != 'address' 
                                    ?   <Typography  
                                            sx={{
                                                fontFamily: "inherit",
                                                fontSize: '16px', 
                                                color: "rgba(0, 0, 0, 0.6)", 
                                                textAlign: "left", 
                                                fontWeight: 600, 
                                            }}
                                        >
                                            {homeInfo?.address}
                                        </Typography>
                                    :   <>
                                            <OutlinedInput 
                                                id="address" 
                                                placeholder="Home Address" 
                                                sx={{width: "-webkit-fill-available"}}
                                                size="small"
                                                autoFocus
                                                onBlur={handleSubmit}
                                                onChange={handleChange}
                                                value={values.address}
                                                error={touched?.address && errors?.address}
                                            />
                                            <FormHelperText error={touched?.address && errors?.address}>{touched?.address && errors?.address}</FormHelperText>
                                        </>
                            }
                        </Box>
                    </Form>
                )}
                </Formik>
            </Box>
        </Box>
    </Fade>
    )
}

function Homeholds({
    setScreenType,
    handleCloseHomeSetting,
    isSelected
}) {
    const dispatch = useDispatch()
    const [homeInfo, setHomeInfo] = React.useState(null)

    const [edit, setEdit] = React.useState(null)

    const selectedHome = useSelector(state => state.homeData.selectedHome)

    useEffect(()=>{
        setHomeInfo(selectedHome);
    }, [selectedHome])

    const homeInfoSchema = Yup.object().shape({
        name: Yup.string()
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
        address: Yup.string()
            .max(50, 'Exceed from max 50 characters.')
            .required('This Field is Required!'),
    });

    const handlEditField = (field) => {
        setEdit(field)
    }

    const editHomeAPI = (data) => {
        dispatch(editHome(data))
    }

    return (
    <Fade in={isSelected('home-holds')}>
        <Box
            id="home-holds"
            sx={{display: isSelected('home-holds') ? "block" : "none"}}
        >
            <Box style={{display: "flex", alignItems: "center"}}>
                <IconButton onClick={()=>{setScreenType('home-overview')}}>
                    <ArrowBackIcon sx={{fontSize: 20}}/> 
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1}}>Households</Typography>
                <IconButton onClick={handleCloseHomeSetting} sx={{float: "right"}}>
                    <CloseIcon sx={{fontSize: 20}}/>
                </IconButton>
            </Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    </Fade>
    )
}