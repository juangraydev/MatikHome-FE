import * as React from 'react';
import Modal from '@mui/material/Modal' 

export default function ModalCard({open, handleClose, children}) {


  return (
    <div>
      <Modal
        open={open}
        onClose={()=>handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          {children}
        </div>

      </Modal>
    </div>
  );
}