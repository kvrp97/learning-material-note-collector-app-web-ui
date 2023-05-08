import React, { useEffect, useState, useCallback } from 'react'
import '../note/Note.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import axios from 'axios';
import UpdateNote from '../../components/updateNote/UpdateNote';
import ImageViewer from 'react-simple-image-viewer';

export default function Note(props) {

  const { noteId, title, description, dateTime, noteImages, update } = props;
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    setImages(noteImages);
  }, [noteImages])

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const imagesArray = images?.map(({imagePath}, index)=>{
    return imagePath;
  })

  // delete feature
  const deleteNote = () => {
    console.log(images);
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
        axios.delete(`api/v1/note/delete-note/${noteId}`)
          .then((response) => {
            console.log(response.data);
            props.del(response.data.data);   // del props' state changed for load all the notes
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your note has been deleted',
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
          .finally(function () {
          });
      }
    })
  }

  // handled the edit feature--------- 
  const handleEdit = () => {
    setOpen(true);    // to open the addNote form
  }

  const handleClose = () => {
    setOpen(!open);
  }

  return (
    <>
      <div id={noteId} className='note-item'>
        <div className='note-content'>
          <div className='title'>
            {title}
          </div>
          <div className='description'>
            {description}
          </div>
        </div>
        <div className='note-images-container'>
          {
            images?.map(({ noteImageId, imagePath, imageName }, index) => {
              return (
                <div key={noteImageId} className='img-item-container'>
                  <img className='image' src={imagePath} alt={imageName} key={index} onClick={()=> openImageViewer(index)} />
                </div>
              )
            })
          }

          {isViewerOpen && (
            <ImageViewer
              src={imagesArray}
              currentIndex={currentImage}
              disableScroll={false}
              closeOnClickOutside={true}
              onClose={closeImageViewer}
            />
          )}
        </div>
        <div className='footer-container'>
          <div>
            <small>{dateTime}</small>
          </div>
          <div className='icon-container'>
            <EditIcon className='icon' onClick={handleEdit} />
            <DeleteForeverIcon className='icon' onClick={deleteNote} />
          </div>
        </div>
      </div>

      <UpdateNote update={update} noteId={noteId} popupTitle={title} popupDescription={description} popupImages={noteImages} open={open} handleClose={handleClose} />
    </>
  )
}
