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
import { Close, Delete, Edit, Note, Settings, Troubleshoot, Update } from "@mui/icons-material";
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
    height: 400,
    overflowY: "auto",
    display: "block",
    p: 2,
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
        <Modal
            open={anchorElDashboardMenu}
            onClose={handleCloseHomeSetting}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{margin: 1}}
        >
            
        </Modal>
    );
}

// function HomeInfo({
//     setScreenType,
//     handleCloseHomeSetting,
//     isSelected
// }) {
//     const dispatch = useDispatch()
//     const [homeInfo, setHomeInfo] = React.useState(null)

//     const [edit, setEdit] = React.useState(null)

//     const selectedHome = useSelector(state => state.homeData.selectedHome)

//     useEffect(()=>{
//         setHomeInfo(selectedHome);
//     }, [selectedHome])

//     const homeInfoSchema = Yup.object().shape({
//         name: Yup.string()
//             .max(50, 'Exceed from max 50 characters.')
//             .required('This Field is Required!'),
//         address: Yup.string()
//             .max(50, 'Exceed from max 50 characters.')
//             .required('This Field is Required!'),
//     });

//     const handlEditField = (field) => {
//         setEdit(field)
//     }

//     const editHomeAPI = (data) => {
//         dispatch(editHome(data))
//     }

//     return (
//     <Fade in={isSelected('home-info')}>
//         <Box
//             id="home-info"
//             sx={{display: isSelected('home-info') ? "block" : "none"}}
//         >
//             <Box style={{display: "flex", alignItems: "center"}}>
//                 <IconButton onClick={()=>{setScreenType('home-overview')}}>
//                     <ArrowBackIcon sx={{fontSize: 20}}/> 
//                 </IconButton>
//                 <Typography variant="h6" sx={{ flexGrow: 1}}>Home Information</Typography>
//                 <IconButton onClick={handleCloseHomeSetting} sx={{float: "right"}}>
//                     <CloseIcon sx={{fontSize: 20}}/>
//                 </IconButton>
//             </Box>
//             <Box
//                 sx={{mt:1.5, gap: 2, display: 'flex', flexDirection: 'column'}}
//             >

//                 <Formik
//                     initialValues={homeInfo}
//                     enableReinitialize={true}
//                     validationSchema={homeInfoSchema}
//                     onSubmit={(values, { setSubmitting, resetForm }) => {
//                         setEdit(null)
//                         setTimeout(() => {
//                             let temp_data = {
//                                 id: values?.id,
//                                 name: values?.name,
//                                 address: values?.address
//                             }
//                             if(!_.isEqual(values, homeInfo)) editHomeAPI(temp_data)
                            
//                             setSubmitting(false);
//                         }, 400);
//                         resetForm()
//                     }}
//                 >
//                 {({ 
//                     values,
//                     errors,
//                     touched,
//                     handleChange,
//                     handleSubmit,
//                 }) => (
//                     <Form>
//                         <Box 
//                             component={"div"}
//                             onClick={()=>handlEditField('nickname')}
//                         >
//                             <Typography 
//                                 gutterBottom 
//                                 sx={{
//                                     fontFamily: "inherit",
//                                     fontSize: '12px', 
//                                     color: "rgba(0, 0, 0, 0.6)", 
//                                     textAlign: "left", 
//                                     fontWeight: 600
//                                 }}
//                             >
//                                 Home Nickname
//                             </Typography>
//                             {
//                                 edit != 'nickname' 
//                                     ?   <Typography  
//                                             sx={{
//                                                 fontFamily: "inherit",
//                                                 fontSize: '16px', 
//                                                 color: "rgba(0, 0, 0, 0.6)", 
//                                                 textAlign: "left", 
//                                                 fontWeight: 600, 
//                                             }}
//                                         >
//                                             {values?.name}
//                                         </Typography>
//                                     :   <>
//                                             <OutlinedInput 
//                                                     id="name" 
//                                                     placeholder="Home Nickname" 
//                                                     sx={{width: "-webkit-fill-available"}}
//                                                     size="small"
//                                                     autoFocus
//                                                     onBlur={handleSubmit}
//                                                     onChange={handleChange}
//                                                     value={values.name}
//                                                     error={touched?.name && errors?.name}
//                                                 />
//                                             <FormHelperText error={touched?.name && errors?.name}>{touched?.name && errors?.name}</FormHelperText>
//                                          </>
//                             }
//                         </Box>
                        
//                         <Box 
//                             component={"div"}
//                             onClick={()=>handlEditField('address')}
//                         >
//                             <Typography 
//                                 gutterBottom 
//                                 sx={{
//                                     fontFamily: "inherit",
//                                     fontSize: '12px', 
//                                     color: "rgba(0, 0, 0, 0.6)", 
//                                     textAlign: "left", 
//                                     fontWeight: 600, 
//                                 }}
//                             >
//                                 Home Address
//                             </Typography>
//                             {
//                                 edit != 'address' 
//                                     ?   <Typography  
//                                             sx={{
//                                                 fontFamily: "inherit",
//                                                 fontSize: '16px', 
//                                                 color: "rgba(0, 0, 0, 0.6)", 
//                                                 textAlign: "left", 
//                                                 fontWeight: 600, 
//                                             }}
//                                         >
//                                             {homeInfo?.address}
//                                         </Typography>
//                                     :   <>
//                                             <OutlinedInput 
//                                                 id="address" 
//                                                 placeholder="Home Address" 
//                                                 sx={{width: "-webkit-fill-available"}}
//                                                 size="small"
//                                                 autoFocus
//                                                 onBlur={handleSubmit}
//                                                 onChange={handleChange}
//                                                 value={values.address}
//                                                 error={touched?.address && errors?.address}
//                                             />
//                                             <FormHelperText error={touched?.address && errors?.address}>{touched?.address && errors?.address}</FormHelperText>
//                                         </>
//                             }
//                         </Box>
//                     </Form>
//                 )}
//                 </Formik>
//             </Box>
//         </Box>
//     </Fade>
//     )
// }