import React, { useState } from 'react'
import '../note/Note.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'
import axios from 'axios';
import AddNote from '../../components/addNote/AddNote';

export default function Note(props) {

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
            noteId: props.id
          }
        })
          .then((response) => {
            // console.log(response.data);
            if (response.data === true) {
              props.del(response.data);
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

  // handled the edit feature
  const [open, setOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);    // to open the addNote form
  }

  const handleClose = () => {
    setOpen(!open);
  }

  return (
    <>
      <Card id={props.id} sx={{ minWidth: 350 }} className='note-item'>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleEdit} size="small">Edit</Button>
          <Button onClick={deleteNote} size="small">Delete</Button>
        </CardActions>
      </Card>

      <AddNote open={open} handleClose={handleClose}/>
    </>
  )
}
