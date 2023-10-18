import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, Typography } from '@mui/material';

import { styled } from '@mui/material/styles';

const CustomDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      maxWidth: 380
    },
  }));



export default function ConfirmModal({open, handleClose, title, type, handleOk}) {

    return (
    <CustomDialog open={open} onClose={handleClose} maxWidth={300}>
        <DialogTitle sx={{paddingBlock: 1}}>{type == "Add" && "Create New "}{type == "Edit" && "Update "}{type == "Delete" && "Delete "}{title}</DialogTitle>
            
        <DialogContent>
            <Typography textAlign={"center"}>
                {
                    type === "Delete" && "Do you really want to delete these record? This process can't be undone."
                }
            </Typography>
        </DialogContent>
        
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleOk} variant='contained' color={(type == "Delete" && "error")}>{type == "Delete" && "Delete"}</Button>
        </DialogActions>
    </CustomDialog>
    );
}