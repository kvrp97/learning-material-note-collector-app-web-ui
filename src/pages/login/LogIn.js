import '../login/LogIn.css';
import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

export default function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        setErrors(emailRegex.test(event.target.value) ? '' : 'Please enter a valid email address');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.trim().length > 0 && password.trim().length > 0) {
            if (errors === '') {                
                axios.post('api/v1/user/login',
                    {
                        emailAddress: email,
                        password: password
                    }
                )
                    .then(function (response) {
                        localStorage.setItem('user', JSON.stringify(response.data.data));
                        localStorage.setItem('loggedWithRemember', rememberMe);
                        localStorage.setItem('logged', true);

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: "'You've been logged in successfully'",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/note');
                    })
                    .catch(function (error) {
                        Swal.fire({
                            position: 'top',
                            icon: 'warning',
                            title: 'Invalid login details',
                            text: 'Please enter a valid email address & password'
                        })
                    })
                    .finally(() => {
                        console.clear();
                    });
            } else {
                Swal.fire('Please enter a valid email');
            }

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
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            helperText={errors}
                            error={Boolean(errors)}
                            required
                        />
                    </div><br />
                    <div>
                        <TextField
                            className='txt'
                            id="outlined-password-input"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              }}
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