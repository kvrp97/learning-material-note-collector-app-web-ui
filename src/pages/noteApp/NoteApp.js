import React, { useState } from 'react'
import '../noteApp/NoteApp.css'
import NoteList from '../../components/noteList/NoteList'
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import AddNote from '../../components/addNote/AddNote';

export default function NoteApp() {

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  }

  return (
    <div>
      <div className='header'>
        <h2>NOTE APP</h2>
        <div>
          <TextField className='search' id="outlined-basic" label={<SearchIcon />} variant="outlined" placeholder='Search...' />
        </div>
        <div className='btn-contain'>
          <Button onClick={() => setOpen(true)} variant="contained"><NoteAddIcon className='note-icon' />New Note</Button>
        </div>
      </div>

      <NoteList />

      <AddNote open={open}  handleClose={handleClose}/>
    </div>
  )
}
