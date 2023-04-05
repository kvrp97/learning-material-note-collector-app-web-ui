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

  const { id, title, description } = props;
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  // const [id, setId] = useState(props.id);
  // const [title, setTitle] = useState(props.title);
  // const [description, setDescription] = useState(props.description);



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

  const handleDelete = () => {
    setEdit(false);
    deleteNote();
  }

  // handled the edit feature--------- 
  
  // set Edit prop true for add note 
  // populate the values to add note form
  // create edit function in add note component

  const handleEdit = () => {
    setEdit(true);

    axios.get('http://localhost:8090/api/v1/note/get-by-id', {
      params: {
        noteId: id,
      }
    })
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    
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
          <Button onClick={handleDelete} size="small">Delete</Button>
        </CardActions>
      </Card>

      <AddNote open={open} edit={edit} handleClose={handleClose} />
    </>
  )
}
