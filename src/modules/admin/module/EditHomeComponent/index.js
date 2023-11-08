import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Container,
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
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
  TableCell,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  MenuItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionDetails,
  AccordionSummary 
} from "@mui/material";

import { editHome, inviteUser, updateUser, removeMember, addDevice, deleteDevice, updateChannel } from "../../../user/dashboard/service";

import CloseIcon from "@mui/icons-material/Close";
import { selectHome, selectRoom } from "../../../user/dashboard/store/actionCreators";
import _ from "lodash";
import {
  Add,
  Cancel,
  Close,
  Delete,
  DeleteForever,
  Edit,
  EditAttributes,
  EditRounded,
  Note,
  Save,
  Settings,
  Search,
  Troubleshoot,
  Update,
} from "@mui/icons-material";
// import LetterAvatar from "../../../shared/components/avatar";
import Fade from "@mui/material/Fade";
import FormHelperText from "@mui/material/FormHelperText";

import KitchenIcon from "@mui/icons-material/Kitchen";
import ChairIcon from "@mui/icons-material/Chair";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import GarageIcon from "@mui/icons-material/Garage";
import BusinessIcon from "@mui/icons-material/Business";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useSelector, useDispatch } from "react-redux";
import { addRoom, editRoom, deleteRoom } from "../../../user/dashboard/service";
import MoreVertIcon from "@mui/icons-material/MoreVert";


const style = {
  width: "100%",
  height: "100%",
  display: "block",
  p: 2,
};

export default function HomeSetting({ open, handleCloseHomeSetting }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [anchorElDashboardMenu, setAnchorElDashboardMenu] = React.useState(null);
  const [genInfoEdit, setGenInfoEdit] = React.useState(null);
  const [home, setHome] = React.useState({});
  const [roomModal, setRoomModal] = React.useState(null); //Add and edit room modal
  const [roomDeleteModal, setRoomDeleteModal] = React.useState(null); //Delete Room Modal
  const [memberModal, setInviteModal] = React.useState(null);
  const [roomMenuEl, setRoomMenuEl] = React.useState(null);
  const [roomModalType, setRoomModalType] = React.useState("add");
  const [roomModalData, setRoomModalData] = React.useState({});
  const [memberModalData, setMemberModalData] = React.useState({});

  
  const [deviceModal, setDeviceModal] = React.useState(null);
  const [deviceModalData, setDeviceModalData] = React.useState({});

  
  const [deviceList, setDeviceList] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const roomMenuOpen = Boolean(roomMenuEl);

  const homeData = useSelector((state) => state.homeData.data);
  const selectedHome = useSelector((state) => state.homeData.selectedHome);

  React.useEffect(() => {
    if(homeData){
      let tempHome = homeData.filter((home) => {
        return home?.id === selectedHome?.id;
      });
      if(tempHome[0]?.devices){
          let tempData = Object.groupBy(tempHome[0]?.devices, channel => {
            return channel.key;
          })
          setDeviceList(tempData)
      }
      dispatch(selectHome(tempHome[0]));
    }
    
  }, [homeData]);

  React.useEffect(() => {
    setHome(selectedHome);
  }, [selectedHome]);

  const homeInfoSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, "Exceed from max 50 characters.")
      .required("This Field is Required!"),
    address: Yup.string()
      .max(50, "Exceed from max 50 characters.")
      .required("This Field is Required!"),
  });


  const handleAddDevice = () => {
    setDeviceModal('add')
  }
  
  const handleDeleteDevice = (data) => {
    setDeviceModal('delete');
    setDeviceModalData(data)
  }

  const handleEditDevice = (data) => {
    setDeviceModal('edit')
    data['room'] = data['room'] ? data['room']['id'] : null;
    setDeviceModalData(data)
  }

  const handleCloseDevice = () => {
    setDeviceModal()
  }

  const handleChangeDeviceCollapse = (panel) => (event, isExpanded) => {
    console.log("[event]", event.target);
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenRoomMenu = (event, data) => {
    console.log("[room menu]", data);
    setRoomMenuEl(event.currentTarget);
    setRoomModalData(data);
  };
  const handleCloseRoomMenu = () => {
    setRoomMenuEl(null);
  };

  const editHomeAPI = (data) => {
    dispatch(editHome(data));
  };

  const handleOpenAddRoom = (type) => {
    console.log("[type]", type);
    setRoomModal(true);
    setRoomModalType(type);
  };

  const handleOpenDeleteRoom = () => {
    handleCloseRoomMenu();
    setRoomDeleteModal(true);
  };

  const handleCloseAddRoom = () => {
    setRoomModal();
  };

  const handleCloseDeleteRoom = () => {
    setRoomDeleteModal();
  };

  const handleInviteUser = () => {
    setInviteModal('invite');
  };

  const handleCloseInvite = () => {
    setInviteModal();
  };

  const handleEditHomeMember = (data) => {
    setInviteModal('edit');
    setMemberModalData(data)
  };

  const handleDeleteHomeMember = (data) => {
    setInviteModal('delete');
    setMemberModalData(data)
  };

  return (
    <Box id="main" sx={style}>
      <Box id="wrapper">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box id="gen_info" sx={{ minHeight: 250 }}>
              <Formik
                initialValues={home}
                enableReinitialize={true}
                validationSchema={homeInfoSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setGenInfoEdit(null);
                  setTimeout(() => {
                    let temp_data = {
                      id: values?.id,
                      name: values?.name,
                      address: values?.address,
                    };
                    if (!_.isEqual(values, home)) editHomeAPI(temp_data);

                    setSubmitting(false);
                  }, 400);
                  resetForm();
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                }) => (
                  <Form>
                    <List component={Paper}>
                      <ListItem>
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          Home General Information
                        </Typography>
                        <ListItemSecondaryAction>
                          {genInfoEdit ? (
                            <>
                              <IconButton onClick={handleSubmit}>
                                <Save />
                              </IconButton>
                              <IconButton
                                onClick={() => {
                                  setGenInfoEdit(null);
                                }}
                              >
                                <Cancel />
                              </IconButton>
                            </>
                          ) : (
                            <IconButton
                              onClick={() => {
                                setGenInfoEdit(true);
                              }}
                            >
                              <EditRounded />
                            </IconButton>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem sx={{ display: "block" }}>
                        <Typography
                          gutterBottom
                          sx={{
                            fontFamily: "inherit",
                            fontSize: "12px",
                            color: "rgba(0, 0, 0, 0.6)",
                            textAlign: "left",
                            fontWeight: 600,
                          }}
                        >
                          Home Nickname
                        </Typography>
                        <OutlinedInput
                          id="name"
                          name="name"
                          placeholder="Home Nickname"
                          disabled={!genInfoEdit}
                          sx={{
                            width: "-webkit-fill-available",
                          }}
                          size="small"
                          autoFocus
                          // onBlur={handleSubmit}
                          onChange={handleChange}
                          value={values.name}
                          error={touched?.name && errors?.name}
                        />
                        <FormHelperText error={touched?.name && errors?.name}>
                          {touched?.name && errors?.name}
                        </FormHelperText>
                      </ListItem>
                      <ListItem sx={{ display: "block" }}>
                        <Typography
                          gutterBottom
                          sx={{
                            fontFamily: "inherit",
                            fontSize: "12px",
                            color: "rgba(0, 0, 0, 0.6)",
                            textAlign: "left",
                            fontWeight: 600,
                          }}
                        >
                          Home Address
                        </Typography>
                        <OutlinedInput
                          id="address"
                          name="address"
                          placeholder="Home Address"
                          sx={{
                            width: "-webkit-fill-available",
                          }}
                          disabled={!genInfoEdit}
                          size="small"
                          autoFocus
                          // onBlur={handleSubmit}
                          onChange={handleChange}
                          value={values.address}
                          error={touched?.address && errors?.address}
                        />
                        <FormHelperText
                          error={touched?.address && errors?.address}
                        >
                          {touched?.address && errors?.address}
                        </FormHelperText>
                      </ListItem>
                    </List>
                  </Form>
                )}
              </Formik>
            </Box>
            <Box id="room_list" sx={{ minHeight: "calc(100vh - 350px)" }}>
              <List component={Paper} sx={{ minHeight: "calc(100vh - 362px)" }}>
                <ListItem>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Rooms List
                  </Typography>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        handleOpenAddRoom("add");
                      }}
                    >
                      <Add />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {home &&
                  home?.rooms?.map((room) => {
                    return (
                      <ListItem>
                        <ListItemIcon sx={{ minWidth: 24, marginRight: 1 }}>
                          {
                            {
                              0: <KitchenIcon />,
                              1: <ChairIcon />,
                              2: <SingleBedIcon />,
                              3: <BusinessIcon />,
                              4: <GarageIcon />,
                              default: <ChairIcon />,
                            }[room.type]
                          }
                        </ListItemIcon>
                        <ListItemText
                          primary={room?.name}
                          sx={{ textTransform: "capitalize" }}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={(e) => handleOpenRoomMenu(e, room)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}

                <Menu
                  id="basic-menu"
                  anchorEl={roomMenuEl}
                  open={roomMenuOpen}
                  onClose={handleCloseRoomMenu}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={(e) => handleOpenAddRoom("edit")}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleOpenDeleteRoom}>Delete</MenuItem>
                </Menu>
              </List>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box id="member_list" sx={{ height: "calc(50vh - 64px)" }}>
              <List component={Paper} sx={{ height: "calc(50vh - 64px)" }}>
                <ListItem divider>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Home Members
                  </Typography>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        handleInviteUser();
                      }}
                    >
                      <Add />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {home &&
                  home?.members?.map((user) => {
                    console.log("[U]", user);
                    return (
                      <ListItem divider>
                        <ListItemText
                          primary={user?.full_name}
                          secondary={
                            user?.role
                              ? "Owner" + (user?.status ? "" : "(Pending)")
                              : "Member" + (user?.status ? "" : "(Pending)")
                          }
                          sx={{ textTransform: "capitalize" }}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={() => {
                              handleEditHomeMember(user);
                            }}
                          >
                            <Edit color="primary" />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              handleDeleteHomeMember(user);
                            }}
                          >
                            <Delete color="error" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
              </List>
            </Box>
            <Box id="device_list" sx={{ height: "calc(50vh - 64px)" }}>
              <List component={Paper} sx={{ height: "calc(50vh - 64px)", maxHeight: "calc(50vh - 64px)"}}>
                <ListItem divider>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Device List
                  </Typography>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        handleAddDevice();
                      }}
                    >
                      <Add />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Box sx={{overflowY: 'auto', height: '100%', maxHeight: 'calc(50vh - 128px)'}}>
                  {deviceList &&
                    Object.keys(deviceList)?.map((device, idx) => {
                      console.log("[devices]", device);
                      return (
                        <>
                          <Accordion expanded={expanded === idx} onChange={handleChangeDeviceCollapse(idx)} >
                            <AccordionSummary
                              expandIcon={
                                <ExpandMoreIcon
                                  sx={{
                                    pointerEvents: "auto"
                                  }}
                                />
                              }
                              aria-controls="panel1bh-content"
                              id="panel1bh-header"
                              sx={{
                                
                                '& .MuiAccordionSummary-content': {
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center'
                                },
                              }}
                            >
                              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {device}
                              </Typography>
                              <Typography sx={{ color: 'text.secondary' }}>{deviceList[device]?.length} channels</Typography>
                              
                              <IconButton
                                id="delete"
                                key="delete"
                                onClick={()=>{handleDeleteDevice(deviceList[device])}}
                              >
                                <Delete key="delete" color="error" />
                              </IconButton>
                            </AccordionSummary>
                            <AccordionDetails>
                              {
                                deviceList[device]?.map((channels) => {
                                  return (
                                    <ListItem divider>
                                      <ListItemText
                                        primary={channels?.name}
                                        secondary={channels?.room?.name || 'Not assigned to any room'}
                                        sx={{ textTransform: "capitalize" }}
                                      />
                                      <ListItemSecondaryAction>
                                        <IconButton
                                          onClick={() => {
                                            handleEditDevice(channels);
                                          }}
                                        >
                                          <Edit color="primary" />
                                        </IconButton>
                                      </ListItemSecondaryAction>
                                    </ListItem>
                                  )
                                })
                              }
                            </AccordionDetails>
                          </Accordion>


                          
                        </>
                        
                      );
                  })}
                </Box>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {roomModal && (
        <RoomModal
          handleClose={handleCloseAddRoom}
          type={roomModalType}
          data={roomModalData}
        />
      )}
      {roomDeleteModal && (
        <RoomModalDelete
          handleClose={handleCloseDeleteRoom}
          data={roomModalData}
        />
      )}

      {memberModal === 'invite' && <InviteModal handleClose={handleCloseInvite} />}
      
      {memberModal === 'edit' && (
        <MemberModal
          handleClose={handleCloseInvite}
          data={memberModalData}
        />
      )}
      {memberModal === 'delete' && (
        <MemberModalDelete
          handleClose={handleCloseInvite}
          data={memberModalData}
        />
      )}
      {deviceModal === 'add' && (
        <DeviceModal
          handleClose={handleCloseDevice}
        />
      )}
      {deviceModal === 'edit' && (
        <ChannelModal
          handleClose={handleCloseDevice}
          data={deviceModalData}
        />
      )}
      {deviceModal === 'delete' && (
        <DeviceModalDelete
          handleClose={handleCloseDevice}
          data={deviceModalData}
        />
      )}
    </Box>
  );
}

function RoomModal({ handleClose, type, data }) {
  const dispatch = useDispatch();
  const selectedHome = useSelector((state) => state.homeData.selectedHome);
  const [init, setInit] = useState({
    type: 0,
    name: "",
  });

  useEffect(() => {
    console.log("[room modal data]", data, type);
    if (type === "edit") setInit(data);
  }, []);

  const roomType = [
    {
      value: 0,
      icon: <KitchenIcon />,
      label: "Kitchen",
    },
    {
      value: 1,
      icon: <ChairIcon />,
      label: "Living Room",
    },
    {
      value: 2,
      icon: <SingleBedIcon />,
      label: "Bed Room",
    },
    {
      value: 3,
      icon: <BusinessIcon />,
      label: "Office",
    },
    {
      value: 4,
      icon: <GarageIcon />,
      label: "Garage",
    },
  ];

  const room_schema = Yup.object().shape({
    type: Yup.string().required("This Field is Required!"),
    name: Yup.string()
      .max(20, "Exceed from max 50 characters.")
      .required("This Field is Required!"),
  });

  return (
    <Dialog open={true} onClose={handleClose}>
      <Formik
        initialValues={init}
        enableReinitialize={true}
        validationSchema={room_schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            if (type === "add") dispatch(addRoom(selectedHome, values));
            else dispatch(editRoom(values));
            setSubmitting(false);
            handleClose();
          }, 400);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <Form>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: 400,
              }}
            >
              <Typography>
                {type === "edit" ? "Edit" : "Create"} Room
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="type"
                  name="type"
                  select
                  label="Room Type"
                  value={values?.type}
                  onChange={handleChange}
                  error={touched?.type && errors?.type}
                  sx={{
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    },
                    mb: 1,
                  }}
                >
                  {roomType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.icon}
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  // {...field}
                  id="name"
                  type="text"
                  label="Room Name"
                  value={values?.name}
                  onChange={handleChange}
                  error={touched?.name && errors?.name}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button type="submit">
                {type === "edit" ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

function RoomModalDelete({ handleClose, data }) {
  const dispatch = useDispatch();
  const selectedHome = useSelector((state) => state.homeData.selectedHome);

  const handleRemove = () => {
    dispatch(deleteRoom(data?.id));
    handleClose();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: 400,
        }}
      >
        <Typography>Remove Room</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ maxWidth: 400, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Are you sure to Remove "{data.name}" room in "{selectedHome?.name}"
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleRemove}>
          Remove
        </Button>
        <Button color="inherit" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function InviteModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const selectedHome = useSelector((state) => state.homeData.selectedHome);

  const invite_schema = Yup.object().shape({
    username: Yup.string().required("This Field is Required!"),
  });

  return (
    <Dialog open={true} onClose={handleClose} sx={{}}>
      <Formik
        initialValues={{
          username: "",
        }}
        enableReinitialize={true}
        validationSchema={invite_schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            dispatch(inviteUser(selectedHome, values)).then((res) => {
              console.log("[invite user]", res);
            });
            console.log("[Invite]", selectedHome, values);
            setSubmitting(false);
            // handleClose();
          }, 400);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <Form>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: 400,
              }}
            >
              <Typography>Invite Member</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TextField
                  label="Search User"
                  id="username"
                  name="username"
                  placeholder="@username"
                  error={errors?.username}
                  value={values?.username}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  helperText={errors?.username}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button type="submit">Search</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

function MemberModal({ handleClose, data }) {
  const dispatch = useDispatch();
  const selectedHome = useSelector((state) => state.homeData.selectedHome);
  const [init, setInit] = useState({
    full_name: "",
    role: 0,
  });

  useEffect(() => {
    console.log("[member modal data]", data);
    setInit(data)
  }, []);

  const schema = Yup.object().shape({
    full_name: Yup.string().required("This Field is Required!"),
    role: Yup.boolean()
      .required("This Field is Required!"),
  });

  console.log("[init]", init);

  return (
    <Dialog open={true} onClose={handleClose}>
      <Formik
        initialValues={init}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log("[member modal]", values);
            dispatch(updateUser(selectedHome, values)).then((res) => {
              console.log("[update user]", res);
            });
            setSubmitting(false);
            handleClose();
          }, 400);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <Form>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: 400,
              }}
            >
              <Typography>
                Edit Member Information
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  // {...field}
                  id="full_name"
                  type="text"
                  label="Member Name"
                  value={values?.full_name}
                  onChange={handleChange}
                  error={touched?.full_name && errors?.full_name}
                  sx={{
                    mb: 1,
                  }}
                />
                <TextField
                  id="role"
                  name="role"
                  select
                  label="Member Role"
                  value={values?.role}
                  onChange={handleChange}
                  error={touched?.type && errors?.type}
                  sx={{
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    },
                    mb: 1,
                  }}
                >
                  <MenuItem key={0} value={false}>
                    Member
                  </MenuItem>
                  <MenuItem key={1} value={true}>
                    Owner
                  </MenuItem>
                </TextField>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button type="submit">
                Update
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

function MemberModalDelete({ handleClose, data }) {
  const dispatch = useDispatch();
  const selectedHome = useSelector((state) => state.homeData.selectedHome);

  const handleRemove = () => {
    dispatch(removeMember(selectedHome?.id, data?.id));
    handleClose();
  };

  console.log("[delete]", data);

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: 400,
        }}
      >
        <Typography>Remove Member</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ maxWidth: 400, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Are you sure to Remove "{data.full_name}({data.role ? "Owner" : "Member"})" in "{selectedHome?.name}"
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleRemove}>
          Remove
        </Button>
        <Button color="inherit" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}


function DeviceModal({ handleClose }) {
  const dispatch = useDispatch();
  const selectedHome = useSelector((state) => state.homeData.selectedHome);
  const [init, setInit] = useState({
    key: "",
  });

  const schema = Yup.object().shape({
    key: Yup.string().required("This Field is Required!")
  });

  console.log("[init]", init);

  return (
    <Dialog open={true} onClose={handleClose}>
      <Formik
        initialValues={init}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log("[Device modal]", values);
            dispatch(addDevice(selectedHome?.id, values))
            .then((res) => {
              console.log("[Add Device]", res);
            })
            .catch((err) => {
              console.log("[Add Device error]", err);
            })
            setSubmitting(false);
            handleClose();
          }, 400);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <Form>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: 400,
              }}
            >
              <Typography>
                Add Device
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  // {...field}
                  id="key"
                  type="text"
                  label="Device Key"
                  value={values?.key}
                  onChange={handleChange}
                  error={touched?.key && errors?.key}
                  sx={{
                    mb: 1,
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button type="submit">
                Add
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

function DeviceModalDelete({ handleClose, data }) {
  const dispatch = useDispatch();
  const selectedHome = useSelector((state) => state.homeData.selectedHome);

  const handleRemove = () => {
    dispatch(deleteDevice(selectedHome?.id, data[0]?.key));
    handleClose();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: 400,
        }}
      >
        <Typography>Remove Device</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ maxWidth: 400, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Are you sure to Remove "{data[0]['key']}" Device with {data?.length} channels in "{selectedHome?.name}"?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleRemove}>
          Remove
        </Button>
        <Button color="inherit" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ChannelModal({ handleClose, data }) {
  const dispatch = useDispatch();
  const selectedHome = useSelector((state) => state.homeData.selectedHome);
  const [init, setInit] = useState({
    name: "",
    room: "",
  });
  const [rooms, setRooms] = useState(selectedHome['rooms'])

  useEffect(() => {
    setInit(data)
    console.log("[init]", data);
  }, []);

  const schema = Yup.object().shape({
    name: Yup.string().required("This Field is Required!"),
    room: Yup.string(),
  });


  return (
    <Dialog open={true} onClose={handleClose}>
      <Formik
        initialValues={init}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            console.log("[channel modal]", values);
            dispatch(updateChannel(data?.id, values))
            setSubmitting(false);
            handleClose();
          }, 400);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <Form>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: 400,
              }}
            >
              <Typography>
                Device Channel
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  // {...field}
                  id="name"
                  type="text"
                  label="Channel Name"
                  value={values?.name}
                  onChange={handleChange}
                  error={touched?.name && errors?.name}
                  sx={{
                    mb: 1,
                  }}
                />
                <TextField
                  id="room"
                  name="room"
                  select
                  label="Channel Room"
                  value={values?.room}
                  onChange={handleChange}
                  error={touched?.room && errors?.room}
                  sx={{
                    "& .MuiSelect-select": {
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    },
                    mb: 1,
                  }}
                >
                  
                  <MenuItem value={null}>
                    Do not assign
                  </MenuItem>
                  {
                    rooms && rooms?.map((room, idx) => {
                      console.log("[room]", room, idx);
                      return (
                        <MenuItem key={idx} value={room?.id}>
                          {room?.name}
                        </MenuItem>
                      )
                    })
                  }
                </TextField>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button type="submit">
                Update
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}