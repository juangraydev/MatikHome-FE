import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UserSettingModal from "../../../modules/auth/Settings/index"
import {
  Box,
  IconButton,
  AppBar,
  Container,
  Toolbar,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Link,
  Button,
  Divider,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import LogoutIcon from '@mui/icons-material/Logout';
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { resetUserData } from "../../../modules/auth/store/actionCreators";
import { resetHomeData } from "../../../modules/user/dashboard/store/actionCreators";
import UserMenu from "../../../modules/user/components/UserMenu"
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import RoofingOutlinedIcon from "@mui/icons-material/RoofingOutlined";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { homeInvitationList, homeInvitationUpdate } from '../../../modules/user/dashboard/service'
import { set } from "lodash";

const adminNav = [
  {
    label: "Summary",
    icon: <InventoryOutlinedIcon />,
    link: "/admin/summary",
  },
  {
    label: "User Management",
    icon: <PeopleAltOutlinedIcon />,
    link: "/admin/user",
  },
  {
    label: "Home Management",
    icon: <RoofingOutlinedIcon />,
    link: "/admin/home",
  },
  {
    label: "Device Management",
    icon: <DevicesOtherOutlinedIcon />,
    link: "/admin/device",
  },
];

export default function Sidebar(props) {
	const dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [userInfo, setUserInfo] = React.useState({})
  const [userModal, setUserModal] = React.useState(false)
  const [inviteList, setInviteList] = React.useState({})
  const navigate = useNavigate();
  const UserData = useSelector(state => state.UserData.data)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [inviteEl, setInviteEl] = React.useState(null);
  const openInvite = Boolean(inviteEl);
  
  useEffect(()=>{
    setUserInfo(jwt_decode(UserData.token))
    if(UserData){ 
      dispatch(homeInvitationList())
        .then((res)=> {
          console.log("[Invite Notification]",res);
          setInviteList(res)
        })
        .catch((err) => {
          console.log("[Invite Error]", err);
        })
    }
  }, [UserData])

  const handleListItemClick = (event, index, link) => {
    setSelectedIndex(index);
    navigate(link);
  };


  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };


  const handleInviteMenuOpen = (event) => {
    setInviteEl(event.currentTarget);
  };
  
  const handleInviteMenuClose = () => {
    setInviteEl(null);
  };
  

  const handleAcceptInvite = (invite, status) => {
    dispatch(homeInvitationUpdate(invite, status))
      .then((res)=> {
        dispatch(homeInvitationList())
          .then((res)=> {
            console.log("[Invite Notification]",res);
            setInviteList(res)
          })
          .catch((err) => {
            console.log("[Invite Error]", err);
          })
      })
      .catch((err) => {

      })
  }


  const onUserModalOpen = () => {
    setUserModal(true)
  }
  
  const onUserModalClose = () => {
    setUserModal(false)
  }

  return (
    <Box
      sx={{
        background: "#1a1c1e",
        height: "100%",
      }}
    >
      {
        userModal && <UserSettingModal handleClose={onUserModalClose}/>
      }
      <Box
        sx={{
          maxWidth: "300px",
          width: '300px'
        }}
      >
        <Box
          sx={{
            p: 3,
            height: 82,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={require("../../images/matik_upper_2.png")}
            style={{
              // margin: 10,
              height: "2.5rem",
            }}
          />
        </Box>

        <Divider color="#fdfdfd" />
        <Box
          sx={{
            height: "calc(100vh - 170px)",
            overflowY: "auto",
          }}
        >
          <List component="nav" sx={{ px: 2, color: "#2C2C2C" }}>
            {
              props.userInfo?.role === 1
                ? adminNav?.map((item, idx) => {
                    return (
                      <ListItemButton
                        selected={selectedIndex === idx}
                        onClick={(event) =>
                          handleListItemClick(event, idx, item.link)
                        }
                        sx={{
                          my: 2,
                          color: "#fdfdfd",
                        }}
                      >
                        <ListItemIcon sx={{ color: "#fdfdfd" }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    );
                  }
                )
                : (<>
                  <UserMenu userInfo={userInfo}/>
                  
                </>)
            }
          </List>
        </Box>

        <Divider color="#fdfdfd" />
        <Box
          sx={{
            height: "86px",
            p: 2,
            width: '300px',
            position: "absolute",
            bottom: "0px",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              justifyContent: 'space-between',
              color: "#fdfdfd",
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                color: "#fdfdfd",
              }}
            >
              <IconButton sx={{color: 'white'}} onClick={handleInviteMenuOpen}>
                <Badge badgeContent={inviteList?.length} color="error">
                  <Avatar alt={userInfo?.first_name}/>
                </Badge>
              </IconButton>
              {
                inviteList.length 
                  ? <Menu
                    id="invite-menu"
                    anchorEl={inviteEl}
                    open={openInvite}
                    onClose={handleInviteMenuClose}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    {
                      inviteList.length && inviteList?.map((invite) => {
                        return <MenuItem onClick={handleInviteMenuClose}>{invite?.name} <Button onClick={()=>{handleAcceptInvite(invite, "accept")}}>Accept</Button><Button color="error" onClick={()=>{handleAcceptInvite(invite, "decline")}}>Decline</Button></MenuItem>
                      })
                    }
                  </Menu>
                  : <></>
                  
              }
              
              <Stack direction="column">
                <Tooltip title={userInfo?.first_name + " " + userInfo?.last_name}>
                  <Typography 
                  variant="h6" 
                  sx={{  
                    paddingLeft: 2,
                    fontWeight: 600,
                    overflow:'hidden',
                    whiteSpace:'nowrap',
                    textOverflow:'ellipsis',
                    maxWidth: 185
                  }}
                  >{userInfo?.first_name + " " + userInfo?.last_name}</Typography>
                </Tooltip>
                <Tooltip title={`@${userInfo?.username}`}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{paddingInline: 2}}
                  >@{userInfo?.username}</Typography>
                </Tooltip>
              </Stack>
            </Stack>
            <IconButton sx={{color: 'white', marginLeft: '0px!important'}} onClick={handleUserMenuOpen}>
              <ExpandMoreIcon/>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleUserMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={()=>{handleUserMenuClose(); onUserModalOpen()}}>My account</MenuItem>
              <MenuItem onClick={()=>{
                handleUserMenuClose()
                dispatch(resetUserData());
                dispatch(resetHomeData());
                localStorage.clear()
                navigate("/")
              }}>Logout</MenuItem>
            </Menu>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
