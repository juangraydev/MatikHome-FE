import React from 'react'
import {
    Container,
    Grid,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material"

function UserSettings() {

    return (
        <Box>
            <Grid container>
                <Grid item xs={4}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                            {/* <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon> */}
                            <ListItemText primary="Inbox" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                            {/* <ListItemIcon>
                                <DraftsIcon />
                            </ListItemIcon> */}
                            <ListItemText primary="Drafts" />
                            </ListItemButton>
                        </ListItem>
                    </List>

                </Grid>
                <Grid item xs={8}>2</Grid>
            </Grid>
        </Box>
    )   
}

export default UserSettings