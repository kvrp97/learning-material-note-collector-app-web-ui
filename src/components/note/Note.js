import React, { useState } from 'react'
import '../note/Note.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import axios from 'axios';
import UpdateNote from '../../components/updateNote/UpdateNote';

export default function Note(props) {

  const { id, title, description, dateTime, update } = props;
  const [open, setOpen] = useState(false);

  // delete feature
  const deleteNote = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:8090/api/v1/note/delete', {
          params: {
            noteId: id
          }
        })
          .then((response) => {
            // console.log(response.data);
            if (response.data === true) {
              props.del(response.data);   // del props' state changed for load all the notes
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your note has been deleted',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
          .catch(function (error) {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          })
          .finally(function () {
          });
      }
    })
  }

  // handled the edit feature--------- 
  const handleEdit = () => {
    setOpen(true);    // to open the addNote form
  }

  const handleClose = () => {
    setOpen(!open);
  }

  return (
    <>
      <div id={id} className='note-item'>
        <div className='note-content'>
          <div className='title'>
            {title}
          </div>
          <div className='description'>
            {description}
          </div>
        </div>
        <div className='footer-container'>
          <div>
            <small>{dateTime}</small>
          </div>
          <div className='icon-container'>
            <EditIcon className='icon' onClick={handleEdit} />
            <DeleteForeverIcon className='icon' onClick={deleteNote} />
          </div>
        </div>
      </div>

      <UpdateNote update={update} id={id} popupTitle={title} popupDescription={description} open={open} handleClose={handleClose} />
    </>
  )
}
