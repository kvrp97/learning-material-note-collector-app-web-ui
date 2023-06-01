import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import '../addNote/AddNote.css'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function AddNote(props) {

  const { open, handleClose, save, userId } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const titleCharacterLimit = 100;
  const descriptionCharacterLimit = 450;
  const imagesCount = 5;

  const handleFileChange = (event) => {
    if ((event.target.files.length + selectedFiles.length) <= imagesCount) {
      const files = event.target.files;
      const previewImagesArray = [];

      for (let i = 0; i < files.length; i++) {
        previewImagesArray.push(URL.createObjectURL(files[i]));
      }

      setSelectedFiles((previousImage) => previousImage.concat([...files]));
      setPreviewImages((previousImage) => previousImage.concat(previewImagesArray));
    }
  }

  const handleRemove = (index) => {
    const newSelectedFiles = [...selectedFiles];
    const newPreviewImages = [...previewImages];

    newSelectedFiles.splice(index, 1);
    newPreviewImages.splice(index, 1);

    setSelectedFiles(newSelectedFiles);
    setPreviewImages(newPreviewImages);
  };

  const saveNewNote = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("title", title);
    formData.append("description", description);

    const date = new Date();
    const newNoteDateTime = date.toLocaleString('en-US', {
      hour12: false,
    });
    formData.append("dateTime", newNoteDateTime);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    if (title.trim().length > 0 || description.trim().length > 0) {
      axios.post('api/v1/note/save', formData)
        .then(function (response) {
          // console.log(response);
          save();
          Swal.fire({
            position: 'bottom',
            icon: 'success',
            title: 'Note saved',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        })
        .finally(() => {
          onClose();
          // setTimeout(() => {
          //   window.location.reload(NoteList);
          // }, 1500);  
          console.clear();
        });
    } else {
      Swal.fire('Please add a title or description');
    }
  }

  const onClose = () => {
    setTitle('');
    setDescription('');
    handleClose();
    setSelectedFiles([]);
    setPreviewImages([]);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='add-note-box'>
          <div className='new-margins'>
            <TextField
              required
              value={title}
              placeholder="Add title..."
              onChange={(e) => {
                if (titleCharacterLimit - e.target.value.length >= 0) {
                  // console.log(e.target.value.length);
                  setTitle(e.target.value);
                }
              }}
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              maxRows={2}

            />
            <small>{titleCharacterLimit - title.length} / {titleCharacterLimit}</small>
          </div>
          <div className='new-margins'>
            <TextField
              value={description}
              onChange={(e) => {
                if (descriptionCharacterLimit - e.target.value.length >= 0) {
                  // console.log(e.target.value.length);
                  setDescription(e.target.value);
                }
              }}
              sx={{ width: "100%" }}
              id="outlined-multiline-static"
              label="Description"
              placeholder="Add description..."
              rows={5}
              multiline
            />
            <small>{descriptionCharacterLimit - description.length} / {descriptionCharacterLimit}</small>
          </div>
          <div>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/jpeg, image/png, image/webp" type="file" multiple onChange={handleFileChange} />
              <PhotoCamera />
            </IconButton>
          </div>
          <small>Add up to 5 images</small>
          <div className='images-container'>
            {
              previewImages?.map((image, index) => (
                <div className='img' key={index}>
                  <img src={image} alt="Preview" width={80} max-height={110} />
                  <IconButton onClick={() => handleRemove(index)} aria-label="delete" size="small" >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </div>
              ))
            }
          </div>
          <div className='btns'>
            <Button onClick={saveNewNote} sx={{ m: 1, display: 'block' }} variant="contained">Save</Button>
            <Button onClick={onClose} sx={{ m: 1, display: 'block' }} variant="outlined">Close </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
