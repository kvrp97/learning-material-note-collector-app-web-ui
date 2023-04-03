import React from 'react'
import '../noteApp/NoteApp.css'
import NoteList from '../../components/noteList/NoteList'
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function NoteApp() {
  return (
    <div>
      <div className='header'>
        <h2>NOTE APP</h2>
        <div>
          <TextField className='search' id="outlined-basic" label={<SearchIcon />} variant="outlined" placeholder='Search...' />
        </div>
        <div className='btn-contain'>
          <Button variant="contained"><NoteAddIcon className='note-icon' />New Note</Button>
        </div>
      </div>

      <NoteList />
    </div>
  )
}
