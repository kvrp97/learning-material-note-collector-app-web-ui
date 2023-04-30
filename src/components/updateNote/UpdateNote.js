import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import '../updateNote/UpdateNote.css'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function UpdateNote(props) {

    const { id, popupTitle, popupDescription, open, handleClose, update } = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const titleCharacterLimit = 100;
    const descriptionCharacterLimit = 450;

    useEffect(() => {
        setTitle(popupTitle);
        setDescription(popupDescription);
    }, [update, popupTitle, popupDescription]);

    useEffect(() => {
        setTitle(title);
        setDescription(description);
    }, [title, description]);

    const onClose = () => {
        setTitle(popupTitle);
        setDescription(popupDescription);
        handleClose();
    }

    const handleUpdate = () => {
        if (title === popupTitle && description === popupDescription) {
            handleClose();
        } else {
            updateNote();
        }
    }

    const updateNote = () => {
        // console.log('update function is called');

        if (title.trim().length > 0 || description.trim().length > 0) {

            const date = new Date();
            const updatedDateTime = date.toLocaleString('en-US',{
                hour12:false,
            });
            
            // const updatedDateTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            // console.log(date.toLocaleString('en-US',{
            //     hour12:false,
            // }));

            axios.put('http://localhost:8090/api/v1/note/update', {
                id: id,
                title: title,
                description: description,
                dateTime: updatedDateTime,
            })
                .then(function (response) {
                    // console.log(response.data);                    
                    update();
                    Swal.fire({
                        position: 'bottom',
                        icon: 'success',
                        title: 'Note updated successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => {
                    onClose();
                });

        } else {
            Swal.fire('Please add a title or description');
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='update-note-box'>
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
                            rows={6}
                            multiline
                        />
                        <small>{descriptionCharacterLimit - description.length} / {descriptionCharacterLimit}</small>
                    </div>
                    <div className='btns'>
                        <Button onClick={handleUpdate} sx={{ m: 1, display: 'block' }} variant="contained">Update</Button>
                        <Button onClick={onClose} sx={{ m: 1, display: 'block' }} variant="outlined">Close </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
