import * as React from 'react';
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
    TableCell,
    Divider
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

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

export default function ModalCard({open, handleClose, title, children}) {


  return (
    <div>
      <Modal
        open={open}
        onClose={()=>handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          sx={style}
        >
          <Box style={{display: "flex"}}>
            <Typography variant="h6" sx={{ flexGrow: 1}}>{title}</Typography>
            <IconButton onClick={handleClose} sx={{float: "right", fontSize: 10}}>
                <CloseIcon size="small"/>
            </IconButton>
          </Box>
          <Divider sx={{marginInline: -2}}/>
          <Box>
            {children}
          </Box>
        </Paper>

      </Modal>
    </div>
  );
}