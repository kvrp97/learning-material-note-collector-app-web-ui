import React from 'react'
import '../note/Note.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Note({ id, title, description }) { 

  return (
    <>
      <Card id={id} sx={{ maxWidth: 345, minWidth: 310 }} className='note-item'>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">                               
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </Card>
    </>
  )
}
