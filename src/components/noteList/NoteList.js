import React, { useEffect, useState } from 'react'
import Note from '../note/Note'
import '../noteList/NoteList.css'
import axios from 'axios';

export default function NoteList() {

  const [notes, setNotes] = useState([{}]);

  useEffect(() => {
    loadAllNotes();
  }, [])

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
      {/* <button onClick={loadAllNotes}>loadAllNotes</button> */}
      <div className='note-container'>

        {notes.map((note, index) => {
          return <Note id={note.id} title={note.title} description={note.description} key={index}/>
        }
        )}

        {/* <AddNote /> */}
      </div>
    </>
  )
}
