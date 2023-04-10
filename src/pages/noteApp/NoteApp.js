import React, { useState } from 'react'
import '../noteApp/NoteApp.css'
import NoteList from '../../components/noteList/NoteList'
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddNote from '../../components/addNote/AddNote';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function NoteApp() {

  const [open, setOpen] = useState(false);
  const [newNote, setNewNote] = useState(0);

  const navigate = useNavigate();

  let userName = localStorage.getItem('userName');
  let isloggedWithRemember = JSON.parse(localStorage.getItem('loggedWithRemember'));

  const handleClose = () => {
    setOpen(!open);
  }

  const saveNew = () => {
    setNewNote(newNote + 1);
  }

  const handleExit = () => {
    if (isloggedWithRemember) {
      Swal.fire({
        title: 'Do you want to sign out?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Signed out..!',
            showConfirmButton: false,
            timer: 1500            
          })
          localStorage.setItem('loggedWithRemember',false);
          localStorage.removeItem('userName');
          localStorage.removeItem('logged');
          navigate('/');
          window.location.reload();
        }
      })
    } else {
      Swal.fire({
        title: 'Do you want to exit?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thanks for using the Note APP',
            showConfirmButton: false,
            timer: 1500            
          })
          localStorage.setItem('loggedWithRemember',false);
          localStorage.removeItem('userName');
          localStorage.removeItem('logged');
          navigate('/');
        }
      })
    }
  }

  return (
    <div>
      <div className='header'>
        <h2>NOTE APP</h2>
        <div className='signed-user-div'>
          <small className='username-txt'>Hi {userName}..!</small>
          {isloggedWithRemember ?
            <Button onClick={handleExit} className='log-out-btn'><LogoutIcon /></Button>
            : <Button onClick={handleExit} className='log-out-btn'><ArrowForwardIcon /></Button>
          }
        </div>
        <div>
          <TextField className='search' id="outlined-basic" label={<SearchIcon />} variant="outlined" placeholder='Search...' />
        </div>
        <div className='btn-contain'>
          <Button onClick={() => setOpen(true)} variant="contained"><NoteAddIcon className='note-icon' />New Note</Button>
        </div>
      </div>

      <NoteList new={newNote} />

      <AddNote open={open} handleClose={handleClose} save={saveNew} />
    </div>
  )
}
