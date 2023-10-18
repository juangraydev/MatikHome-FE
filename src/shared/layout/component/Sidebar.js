import React from "react";
import jwt_decode from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  IconButton,
  AppBar,
  Container,
  Toolbar,
  Menu,
  MenuItem,
  Typography,
  Link,
  Button,
  Divider,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { resetUserData } from "../../../modules/auth/store/actionCreators";
import { resetHomeData } from "../../../modules/user/dashboard/store/actionCreators";
import UserMenu from "../../../modules/user/components/UserMenu"
import {
  selectHome,
  selectRoom,
} from "../../../modules/user/dashboard/store/actionCreators";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import RoofingOutlinedIcon from "@mui/icons-material/RoofingOutlined";
import DevicesOtherOutlinedIcon from "@mui/icons-material/DevicesOtherOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";

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
  const navigate = useNavigate();
  const homes = useSelector(state => state.homeData.data)

  const handleListItemClick = (event, index, link) => {
    setSelectedIndex(index);
    navigate(link);
  };

  console.log('[homes]', homes);

  return (
    <Box
      sx={{
        background: "#1a1c1e",
        height: "100%",
      }}
    >
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
                  <UserMenu/>
                  
                </>)
            }
          </List>
        </Box>

        <Divider color="#fdfdfd" />
        <Box
          sx={{
            height: "86px",
            p: 2,
            width: 250,
            position: "absolute",
            bottom: "0px",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "center",
              color: "#fdfdfd",
            }}
          >
            <Avatar>{"Jhun Wulf Sabala"[0]}</Avatar>
            <Stack direction="column">
              <Typography variant="h6">Jhun Wulf Sabala</Typography>
              <Typography 
                variant="subtitle2" 
                onClick={()=>{
                  dispatch(resetUserData());
                  dispatch(resetHomeData());
                  localStorage.clear()
                  navigate("/")
                }}
              >Manager</Typography>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
