import React, { useState } from 'react'
import '../signUp/SignUp.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import axios from 'axios';

export default function SignUp() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    const firstNameRegex = /^[A-Za-z]{2,}$/;
    setErrors((prevErrors) => ({
      ...prevErrors,
      firstName: firstNameRegex.test(event.target.value)
        ? ''
        : 'Please enter a valid first name',
    }));
  };


  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    const lastNameRegex = /^[A-Za-z]{2,}$/;
    setErrors((prevErrors) => ({
      ...prevErrors,
      lastName: lastNameRegex.test(event.target.value)
        ? ''
        : 'Please enter a valid last name',
    }));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: emailRegex.test(event.target.value)
        ? ''
        : 'Please enter a valid email address',
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: passwordRegex.test(event.target.value)
        ? ''
        : 'Password must contain at least 8 characters including 1 uppercase letter, 1 lowercase letter, and 1 number',
    }));
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword:
        event.target.value === password ? '' : 'Passwords do not match',
    }));

    // const confirmPassword = event.target.value;
    // setConfirmPassword(confirmPassword);
    // if(confirmPassword === password) {
    //   setErrors((prevErrors) => ({...prevErrors, confirmPassword:''}));
    // } else {
    //   setErrors((prevErrors) => ({...prevErrors, confirmPassword:'Passwords do not match'}));
    // }    
  };

  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).some(err => err !== '')) {
      Swal.fire('Please fill the form properly..!');
    } else {
      console.log("success!");
      axios.post('http://localhost:8091/api/v1/user/save', {
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        password: confirmPassword,
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
    }
  }

  return (
    <div className='container-sign-up'>
      <div className='form-container-sign-up'>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <h3 className='sign-up-title'>NOTE APP - SIGN UP</h3>
          <div className='user-name'>
            <div className='name'>
              <TextField
                value={firstName}
                onChange={handleFirstNameChange}
                label="First Name"
                variant="outlined"
                helperText={errors.firstName}
                error={Boolean(errors.firstName)}
              // required
              />
            </div>
            <div className='name'>
              <TextField
                value={lastName}
                onChange={handleLastNameChange}
                label="Last Name"
                variant="outlined"
                helperText={errors.lastName}
                error={Boolean(errors.lastName)}
              // required
              />
            </div>
          </div>
          <br />
          <div className='em-pswd'>
            <div>
              <TextField
                value={email}
                onChange={handleEmailChange}
                className='txt'
                label="Email Address"
                type="email"
                helperText={errors.email}
                error={Boolean(errors.email)}
              // required
              />
            </div><br />
            <div>
              <TextField
                value={password}
                onChange={handlePasswordChange}
                className='txt'
                label="Password"
                type="password"
                helperText={errors.password}
                error={Boolean(errors.password)}
              // required
              />
            </div><br />
            <div>
              <TextField
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className='txt'
                label="Confirm Password"
                type="password"
                helperText={errors.confirmPassword}
                error={Boolean(errors.confirmPassword)}
              // required
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
