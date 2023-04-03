import '../login/LogIn.css';
import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LogIn() {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

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
                    navigate('/note');
                } else {
                    return alert('Please enter your valid email address and password');
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

    }

    return (
        <div className='container'>
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
                        />
                    </div>
                    <br />
                    <Button type='submit' variant="contained">LogIn</Button>
                </form>
            </div>
        </div>
    )
}
