import React, { useEffect, useState } from 'react'
import Note from '../note/Note'
import '../noteList/NoteList.css'
import axios from 'axios';

export default function NoteList(props) {

  const [notes, setNotes] = useState([{}]);
  const [del, setDel] = useState(false);
  const [update, setUpdate] = useState(0);

  const deleteToggle = () => {
    setDel(!del);
  }

  const handleUpdate = () => {
    setUpdate(update + 1);
  }

  //initial reloading
  useEffect(() => {
    loadAllNotes();
  }, [])

  // adding a note - reloading
  useEffect(() => {
    loadAllNotes();
    loadAllNotes();
  }, [props.new])

  // deleting a note - reloading
  useEffect(() => {
    loadAllNotes();
  }, [del])

  // reloading on update
  useEffect(() => {
    loadAllNotes();
  }, [update])

  // search for notes
  useEffect(() => {
    if (props.searchInput.length > 0) {
      axios.get('http://localhost:8091/api/v1/note/search', {
        params: {
          searchKeyword: props.searchInput,
        }
      })
        .then((response) => {
          // console.log(response.data.data);
          setNotes(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });

      // const searchFields = ["title", "description"]

      // axios.get('http://localhost:8090/api/v1/note/get-all-notes')
      //   .then(function (response) {
      //     setNotes(response.data.filter((noteItem) => searchFields.some(searchField => noteItem[searchField].toLowerCase().includes(props.searchInput))));
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    } else {
      loadAllNotes();
    }
  }, [props.searchInput])

  const loadAllNotes = () => {
    axios.get('http://localhost:8091/api/v1/note/get-all-notes')
      .then(function (response) {
        // handle success
        // console.log(response.data);
        setNotes(response.data.data);
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
    <div className='note-container'>
      {notes.map((note, index) => {              
        return <Note update={handleUpdate} del={deleteToggle} noteId={note.noteId} title={note.title} description={note.description} dateTime={note.dateTime} noteImages={note.noteImages} key={index} />
      }
      )}
    </div>
  )
}
