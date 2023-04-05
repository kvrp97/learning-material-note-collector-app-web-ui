import React, { useEffect, useState } from 'react'
import Note from '../note/Note'
import '../noteList/NoteList.css'
import axios from 'axios';

export default function NoteList(props) {

  const [notes, setNotes] = useState([{}]);  
  const [del, setDel] = useState(false);  

  const isdelete = ()=>{
    setDel(!del);
  }

  //initial reloading
  useEffect(() => {
    loadAllNotes();
  }, [])

  // adding a note - reloading
  useEffect(() => {
    loadAllNotes();
  }, [props.new])

  // deleting a note - reloading
  useEffect(() => {
    loadAllNotes();
  }, [del])

  const loadAllNotes = () => {
    axios.get('http://localhost:8090/api/v1/note/get-all-notes')
      .then(function (response) {
        // handle success
        // console.log(response.data);
        setNotes(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  return (
    <>
      <div className='note-container'>
        {notes.map((note, index) => {
          return <Note del={isdelete} id={note.id} title={note.title} description={note.description} key={index} />
        }
        )}       
      </div>
    </>
  )
}
