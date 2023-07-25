import React from 'react'
import jwt_decode from "jwt-decode"
import AdminMenu from "../adminMenu"
import UserMenu from "../userMenu"
import { useSelector } from 'react-redux'
import {
	Toolbar,
	Divider
} from "@mui/material"

export default function Drawer (props) {
    const UserData = useSelector(state => state.UserData.data)
    return (
        <div key={"drawer"}>
            <Toolbar sx={{background: "#00062A"}}>
                <img 
                    src={require("../../images/matik_upper_2.png")} 
                    width={200} 
                    style={{ display: "block" } }
                />
            </Toolbar>
            <Divider />
            {
                jwt_decode(UserData?.token)?.role
                    ? <AdminMenu/>
                    : <UserMenu/>
            }
        </div>
    );
}