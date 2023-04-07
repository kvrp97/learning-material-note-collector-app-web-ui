import '../login/LogIn.css';
import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function LogIn() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userName.trim().length > 0 && password.trim().length > 0) {
            axios.get('http://localhost:8090/api/v1/user/get-user',
                {
                    params: {
                        userName: userName,
                    }
                }
            )
                .then(function (response) {
                    // handle success
                    console.log(response);
                    if (response.data.password === password) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: "'You've been logged in successfully'",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/note');
                    } else {
                        // return alert('Please enter your valid email address and password');
                        Swal.fire({
                            position: 'top',
                            title: 'Please enter a valid email address and password',
                        })
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
        } else {
            Swal.fire('Please complete the login details');
        }

    }

    return (
        <div className='container-sign-in'>
            <div className='form-container'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <h3>Note APP</h3>
                    <div>
                        <TextField
                            className='txt'
                            id="outlined-email-input"
                            label="Email Address"
                            type="email"
                            value={userName}
                            onChange={(e) => { setUserName(e.target.value) }}
                            required
                        />
                    </div><br />
                    <div>
                        <TextField
                            className='txt'
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                        />
                    </div>
                    <br />
                    <Button className='login-btn' type='submit' variant="contained">LogIn</Button>
                    <a className='sign-up-link' href='/sign-up'>I don't have an account? Sign Up</a>
                </form>
            </div>
        </div>
    )
}