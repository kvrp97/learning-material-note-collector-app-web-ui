import React, { useState } from 'react'
import '../signUp/SignUp.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export default function SignUp() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const navigate = useNavigate();

  const isNotEmpty = () => {
    if (email.trim().length > 0 && password.trim().length > 0 && firstName.trim().length > 0 && lastName.trim().length > 0) {
      return true;
    } else {
      return false;
    }
  }

  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNotEmpty()) {
      axios.post('http://localhost:8091/api/v1/user/save', {
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        password: password
      })
        .then(response => {
          clearFields();
          Swal.fire({
            icon: 'success',
            title: 'User saved successfully',
            footer: '<a href="/">Log In</a>'
          })
        })
        .catch(error => {
          // console.error(error.response);
          if (error.response.data.statusCode === 409) {
            Swal.fire({
              icon: 'info',
              title: 'Email address already in use',
              text: 'Use a different email address',
            })
          } else {
            alert('Internal error');
          }
        })
        .finally(() => {
          console.clear();
        });
    } else {
      Swal.fire('Please complete all the fields');
    }
  }

  return (
    <div className='container-sign-up'>
      <div className='form-container-sign-up'>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <h3 className='sign-up-title'>NOTE APP - SIGN UP</h3>
          <div className='user-name'>
            <div className='name'>
              <TextField value={firstName} onChange={(e) => { setFirstName(e.target.value) }} label="First Name" variant="outlined" required />
            </div>
            <div className='name'>
              <TextField value={lastName} onChange={(e) => { setLastName(e.target.value) }} label="Last Name" variant="outlined" required />
            </div>
          </div>
          <br />
          <div className='em-pswd'>
            <div>
              <TextField
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                className='txt'
                id="outlined-email-input"
                label="Email Address"
                type="email"
                required
              />
            </div><br />
            <div>
              <TextField
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                className='txt'
                id="outlined-password-input"
                label="Password"
                type="password"
                required
              />
            </div>
            <br />
            <div className='sign-up-btn-container'>
              <Button className='sign-up-btn' type='submit' variant="contained">Sign Up</Button>
            </div>
            <div className='login-link-container'>
              <a className='login-link' href='/'>I have an account? LogIn</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
