import React from 'react'
import '../signUp/SignUp.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SignUp() {
  return (
    <div className='container-sign-up'>
      <div className='form-container-sign-up'>
        <form className='sign-up-form'>
          <h3 className='sign-up-title'>USER SIGN UP</h3>
          <div className='user-name'>
            <div className='name'>
              <TextField required label="First Name" variant="outlined" />
            </div>
            <div className='name'>
              <TextField required label="Last Name" variant="outlined" />
            </div>
          </div>
          <br />
          <div className='em-pswd'>
            <div>
              <TextField
                className='txt'
                id="outlined-email-input"
                label="Email Address"
                type="email"
                required
              />
            </div><br />
            <div>
              <TextField
                className='txt'
                id="outlined-password-input"
                label="Password"
                type="password"
                required
              />
            </div>
            <br />
            <Button className='sign-up-btn' type='submit' variant="contained">Sign Up</Button>
            <a className='login-link' href='/'>I have an account? LogIn</a>
          </div>
        </form>
      </div>
    </div>
  )
}
