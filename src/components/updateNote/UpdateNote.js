import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import '../updateNote/UpdateNote.css'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function UpdateNote(props) {

    const { noteId, popupTitle, popupDescription, popupImages, open, handleClose, update } = props;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewSelectedImages, setPreviewSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [ImagesToRemove, setImagesToRemove] = useState([]);

    const titleCharacterLimit = 100;
    const descriptionCharacterLimit = 450;
    const imagesCount = 5;

    useEffect(() => {
        setPreviewImages(popupImages);
        setTitle(popupTitle);
        setDescription(popupDescription);
    }, [noteId, update, popupTitle, popupDescription, popupImages]);

    useEffect(() => {
        setTitle(title);
        setDescription(description);
    }, [title, description]);

    const handleRemoveImages = (image, index) => {
        const newPreviewImages = [...previewImages];

        newPreviewImages.splice(index, 1)

        setImagesToRemove([...ImagesToRemove, image]);
        setPreviewImages(newPreviewImages);
    }

    const handleRemoveSelectedImages = (index) => {
        const newSelectedFiles = [...selectedFiles];
        const newpreviewSelectedImages = [...previewSelectedImages];

        newSelectedFiles.splice(index, 1);
        newpreviewSelectedImages.splice(index, 1);

        setSelectedFiles(newSelectedFiles);
        setPreviewSelectedImages(newpreviewSelectedImages);
    }

    const handleFileChange = (event) => {
        event.preventDefault();
        if ((event.target.files.length + previewImages.length + previewSelectedImages.length) <= imagesCount) {
            const files = event.target.files;
            const previewSelectedImagesArray = [];

            for (let i = 0; i < files.length; i++) {
                previewSelectedImagesArray.push(URL.createObjectURL(files[i]));
            }
            setSelectedFiles((previousImage) => previousImage.concat([...files]));
            setPreviewSelectedImages((previousImage) => previousImage.concat(previewSelectedImagesArray));
        }
    }

    // edit this after done processing-----------------------------------------
    const onClose = () => {
        setTitle(popupTitle);
        setDescription(popupDescription);
        setPreviewImages(popupImages);
        setSelectedFiles([]);
        setImagesToRemove([]);
        setPreviewSelectedImages([]);
        handleClose();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if ((title !== popupTitle || description !== popupDescription) && popupImages.length === previewImages.length && selectedFiles.length === 0) {
            updateNoteTitleAndDescription();
            console.log("updateNoteTitleAndDescription====1");
        } else if ((title !== popupTitle || description !== popupDescription) && popupImages.length !== previewImages.length && selectedFiles.length === 0) {
            console.log("updateNoteTitleAndDescription====2");
            console.log("removeNoteimages=======2");
            // handleClose();
        } else if ((title !== popupTitle || description !== popupDescription) && popupImages.length !== previewImages.length && selectedFiles.length !== 0) {
            console.log("updateNoteTitleAndDescription====3");
            console.log("removeNoteimages=======3");
            console.log("new images added=====3");
        } else if ((title !== popupTitle || description !== popupDescription) && popupImages.length === previewImages.length && selectedFiles.length !== 0) {
            console.log("updateNoteTitleAndDescription====4");
            console.log("new images added=====4");
        } else if ((title === popupTitle && description === popupDescription) && popupImages.length !== previewImages.length && selectedFiles.length === 0) {
            updateNoteByRemovingImage();
            console.log("only deleteimage====5");
        } else if ((title === popupTitle && description === popupDescription) && popupImages.length === previewImages.length && selectedFiles.length !== 0) {
            console.log("only added images===6");
        } else if ((title === popupTitle && description === popupDescription) && popupImages.length !== previewImages.length && selectedFiles.length !== 0) {
            console.log("only deleteimage====7");
            console.log("only added images====7");
        } else {
            console.log("not updated====8");
        }
    }

    const updateNoteTitleAndDescription = async () => {

        if (title.trim().length > 0 || description.trim().length > 0) {

            const date = new Date();
            const updatedDateTime = date.toLocaleString('en-US', {
                hour12: false,
            });

            // const updatedDateTime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            // console.log(date.toLocaleString('en-US',{
            //     hour12:false,
            // }));

            await axios.put('http://localhost:8091/api/v1/note/update-title-description', {
                noteId: noteId,
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

    const updateNoteByRemovingImage = async () => {        

        const date = new Date();
        const newNoteDateTime = date.toLocaleString('en-US', {
            hour12: false,
        });      

        const data = {
            noteId:noteId,
            dateTime: newNoteDateTime,
            noteImageList: ImagesToRemove
        }

        await axios.put('http://localhost:8091/api/v1/note/update-by-removing-image', data)
            .then(function (response) {
                console.log(response.data);
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
                                    <img src={image.imagePath} alt="Preview" width={80} max-height={110} />
                                    <IconButton onClick={() => handleRemoveImages(image, index)} aria-label="delete" size="small" >
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                            ))
                        }
                        {
                            previewSelectedImages?.map((selectedImage, index) => (
                                <div className='img' key={index}>
                                    <img src={selectedImage} alt="Preview" width={80} max-height={110} />
                                    <IconButton onClick={() => handleRemoveSelectedImages(index)} aria-label="delete" size="small" >
                                        <DeleteIcon fontSize="inherit" />
                                    </IconButton>
                                </div>
                            ))
                        }
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
