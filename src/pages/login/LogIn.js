import '../login/LogIn.css';
import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.trim().length > 0 && password.trim().length > 0) {
            axios.get('http://localhost:8090/api/v1/user/get-user',
                {
                    params: {
                        email: email,
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
        <div className='container-login'>
            <div className='form-container-login'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <h3 className='login-title'>Note APP</h3>
                    <div>
                        <TextField
                            className='txt'
                            id="outlined-email-input"
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
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
                    <div className='login-btn-container'>
                        <Button className='login-btn' type='submit' variant="contained">LogIn</Button>
                    </div>
                    <a className='sign-up-link' href='/sign-up'>I don't have an account? Sign Up</a>
                </form>
            </div>
        </div>
    )
}