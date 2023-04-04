import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';

import '../addNote/AddNote.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #7d80a6',
  boxShadow: 24,
  p: 4,
};

export default function AddNote() {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='new-margins'>
            <TextField sx={{ width: "100%" }} id="outlined-basic" label="Title" variant="outlined" />
          </div>
          <div className='new-margins'>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-textarea"
              label="Description"
              placeholder="Description"
              multiline
            />
          </div>
          <div className='btns'>
            <Button sx={{ m: 1, display: 'block' }} variant="contained">Save</Button>
            <Button sx={{ m: 1, display: 'block' }} variant="outlined">Close </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
