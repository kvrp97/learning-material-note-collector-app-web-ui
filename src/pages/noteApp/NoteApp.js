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
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  const userName = localStorage.getItem('userName');
  const loggedWithRemember = JSON.parse(localStorage.getItem('loggedWithRemember'));

  // window.addEventListener("unload", (ev) => {
  //   // ev.preventDefault();
  //   // return ev.returnValue = 'Are you sure you want to close?';
  // });

  window.addEventListener('beforeunload', () => {
    if (!loggedWithRemember) {
      localStorage.removeItem('logged');
      localStorage.removeItem('userName');
    }
  });

  const handleClose = () => {
    setOpen(!open);
  }

  const saveNew = () => {
    setNewNote(newNote + 1);
  }

  const handleExit = () => {
    if (loggedWithRemember) {
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
          localStorage.removeItem('loggedWithRemember');
          localStorage.removeItem('userName');
          localStorage.removeItem('logged');
          navigate('/login');
          // window.location.reload();
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
          localStorage.removeItem('loggedWithRemember');
          localStorage.removeItem('userName');
          localStorage.removeItem('logged');
          navigate('/login');
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
          {loggedWithRemember ?
            <Button onClick={handleExit} className='log-out-btn'><LogoutIcon /></Button>
            : <Button onClick={handleExit} className='log-out-btn'><ArrowForwardIcon /></Button>
          }
        </div>
        <div>
          <TextField
            className='search'
            id="outlined-basic"
            label={<SearchIcon />}
            variant="outlined"
            placeholder='Search...'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className='btn-contain'>
          <Button onClick={() => setOpen(true)} variant="contained"><NoteAddIcon className='note-icon' />New Note</Button>
        </div>
      </div>

      <NoteList new={newNote} searchInput={searchInput}/>

      <AddNote open={open} handleClose={handleClose} save={saveNew} />
    </div>
  )
}
