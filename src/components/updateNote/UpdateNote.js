import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import '../updateNote/UpdateNote.css'
import axios from 'axios';
import Swal from 'sweetalert2'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '65vw',
    height: '60vh',
    bgcolor: 'background.paper',
    border: '2px solid #7d80a6',
    boxShadow: 24,
    p: 4,
};

export default function UpdateNote(props) {

    const { id, popupTitle, popupDescription, open, handleClose, update } = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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

    const updateNote = () => {
        console.log('update function is called');

        const date = new Date();
        const localDateTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        console.log(localDateTime);

        if (title.trim().length > 0 || description.trim().length > 0) {
            axios.put('http://localhost:8090/api/v1/note/update', {
                id: id,
                title: title,
                description: description,
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
                <Box sx={style}>
                    <div className='new-margins'>
                        <TextField
                            required
                            value={title}
                            onChange={(e) => { setTitle(e.target.value) }}
                            sx={{ width: "100%" }}
                            id="outlined-basic"
                            label="Title"
                            variant="outlined" />
                    </div>
                    <div className='new-margins'>
                        <TextField
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            sx={{ width: "100%" }}
                            id="outlined-textarea"
                            label="Description"
                            placeholder="Description"
                            multiline
                        />
                    </div>
                    <div className='btns'>
                        <Button onClick={updateNote} sx={{ m: 1, display: 'block' }} variant="contained">Update</Button>
                        <Button onClick={onClose} sx={{ m: 1, display: 'block' }} variant="outlined">Close </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
