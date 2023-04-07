import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import '../addNote/AddNote.css'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function AddNote(props) {

  const { open, handleClose, save } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const titleCharacterLimit = 110;
  const descriptionCharacterLimit = 250;

  const saveNewNote = () => {
    console.log('save function is called');

    const date = new Date();
    const localDateTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    console.log(localDateTime);

    if (title.trim().length > 0 || description.trim().length > 0) {
      axios.post('http://localhost:8090/api/v1/note/save', {
        title: title,
        description: description,
        dateTime: localDateTime,
      })
        .then(function (response) {
          // console.log(response);
          save(response.data.id);
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
        .finally(() => {
          onClose();
          // setTimeout(() => {
          //   window.location.reload(NoteList);
          // }, 1500);       
        });

    } else {
      Swal.fire('Please add a title or description');
    }
  }

  const onClose = () => {
    setTitle('');
    setDescription('');
    handleClose();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='add-note-box'>
          <div className='new-margins'>
            <TextField
              required
              value={title}
              onChange={(e) => {
                if (titleCharacterLimit - e.target.value.length >= 0) {
                  // console.log(e.target.value.length);
                  setTitle(e.target.value);
                }
              }}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              minRows={1}
              multiline
            />
          </div>
          <div className='new-margins'>
            <TextField
              value={description}
              onChange={(e) => {
                if (descriptionCharacterLimit - e.target.value.length >= 0) {
                  // console.log(e.target.value.length);
                  setDescription(e.target.value);
                }
              }}
              sx={{ width: "100%" }}
              id="outlined-multiline-static"
              label="Description"
              placeholder="Description"
              rows={5}
              multiline
            />
          </div>
          <div className='btns'>
            <Button onClick={saveNewNote} sx={{ m: 1, display: 'block' }} variant="contained">Save</Button>
            <Button onClick={onClose} sx={{ m: 1, display: 'block' }} variant="outlined">Close </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
