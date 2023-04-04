import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import '../addNote/AddNote.css'
import axios from 'axios';
import Swal from 'sweetalert2'

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

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const saveNewNote = () => {

    if (title.trim().length > 0 || description.trim().length > 0) {
      axios.post('http://localhost:8090/api/v1/note/save', {
        title: title,
        description: description,
      })
        .then(function (response) {
          console.log(response);
          Swal.fire({
            position: 'bottom',
            icon: 'success',
            title: 'Note saved',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          handleClose();
        });

    } else {
      Swal.fire('Please add a title or description');
    }
  }

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
            <TextField
              required
              value={title}
              onChange={(e) => { setTitle(e.target.value) }}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Title"
              variant="outlined" />
          </div>
          <div className='new-margins'>
            <TextField
              value={description}
              onChange={(e) => { setDescription(e.target.value) }}
              sx={{ width: "100%" }}
              id="outlined-textarea"
              label="Description"
              placeholder="Description"
              multiline
            />
          </div>
          <div className='btns'>
            <Button onClick={saveNewNote} sx={{ m: 1, display: 'block' }} variant="contained">Save</Button>
            <Button onClick={handleClose} sx={{ m: 1, display: 'block' }} variant="outlined">Close </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
