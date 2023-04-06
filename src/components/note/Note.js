import React, { useState } from 'react'
import '../note/Note.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import axios from 'axios';
import UpdateNote from '../../components/updateNote/UpdateNote';

export default function Note(props) {

  const { id, title, description, update } = props;
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

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
    setEdit(true);
    setOpen(true);    // to open the addNote form
  }

  const handleClose = () => {
    setOpen(!open);
  }

  return (
    <>
      <Card id={id} sx={{ minWidth: 350 }} className='note-item'>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleEdit} size="small">Edit</Button>
          <Button onClick={deleteNote} size="small">Delete</Button>
        </CardActions>
      </Card>

      <UpdateNote update={update} id={id} popupTitle={title} popupDescription={description} open={open} edit={edit} handleClose={handleClose} />
    </>
  )
}
