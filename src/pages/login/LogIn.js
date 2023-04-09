import '../login/LogIn.css';
import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
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
                    // console.log(response.data);
                    if (response.data.password === password) {
                        localStorage.setItem('userName', response.data.firstName);
                        localStorage.setItem('isloggedWithRemember', rememberMe);

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
                            icon: 'warning',
                            title: 'Invalid login details',
                            text: 'Please enter a valid email address & password'
                        })
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    navigate('/');
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
                    <div className='switch-container'>
                        <Switch
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            name="remember-me"
                            color="primary"
                        />
                        <span className='remember-txt-span'><small>Remember Me</small></span>
                    </div>
                    <div className='login-btn-container'>
                        <Button className='login-btn' type='submit' variant="contained">LogIn</Button>
                    </div>
                    <div className='sign-up-link-container'>
                        <a className='sign-up-link' href='/sign-up'>I don't have an account? Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    )
}