import './signup.css'
import axios from 'axios'
import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

function Signup() {
    var count = 0
    let navigate = useNavigate()
    let [open, setOpen] = useState(false)

    function nameValidate() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        if (name.value === '') {
            nameError.innerText = "*Required"
        }
        else {
            nameError.innerText = ''
        }
    }

    function emailValidate() {
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        if (email.value === '') {
            emailError.innerText = "*Required"
        }
        else {
            emailError.innerText = ''
        }
    }

    function passwordValidate() {
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        if (password.value === '') {
            passwordError.innerText = "*Required"
        }
        else {
            passwordError.innerText = ''
        }
    }

    async function registerClick() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/

        if (name.value === '') {
            nameError.innerText = "*Required"
        }
        else {
            if (!isNaN(name.value)) {
                nameError.innerText = "*Invalid"
            }
            else {
                nameError.innerText = ''
            }
        }
        if (email.value === '') {
            emailError.innerText = "*Required"
        }
        else {
            if (email.value.match(emailPattern)) {
                emailError.innerText = ''
            }
            else {
                emailError.innerText = '*Invalid'
            }
        }
        if (password.value === '') {
            passwordError.innerText = "*Required"
        }
        else {
            if (password.value.length < 5 || password.value.length > 15) {
                passwordError.innerText = '*Password length should be between 5 to 15'
            }
            else {
                passwordError.innerText = ''
            }
        }
        if (nameError.innerText === '' && emailError.innerText === '' && passwordError.innerText === '') {
            const userDetails = {
                name: name.value,
                email: email.value,
                password: password.value,
            }
            try {
                let res = await axios.post(`https://test-api-m06e.onrender.com/users/signup`, userDetails)
                if (res.status === 201) {
                    setOpen(true)
                    setTimeout(() => {
                        navigate('/')
                    }, 2500)
                }
                else {
                    emailError.innerText = '*Email address already exist'
                    setTimeout(() => {
                        emailError.innerText = ''
                    }, 3000);
                }
            }
            catch (error) {
                emailError.innerText = '*Email address already exist'
                setTimeout(() => {
                    emailError.innerText = ''
                }, 3000);
            }
        }
    }

    function showPasswordClick() {
        const password = document.getElementById('password')
        count++
        if (count % 2 === 0) {
            password.setAttribute('type', 'password')
        }
        else {
            password.removeAttribute('type')
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )
    return (
        <>
            <div className="shadow col-3 rounded position-absolute top-50 start-50 translate-middle p-4">
                <div>
                    <h4 className='text-center'>Signup</h4>
                    <div>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onKeyUp={() => { nameValidate() }} placeholder='name' />
                        <span id='nameError' className='text-danger'></span>
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onKeyUp={() => { emailValidate() }} placeholder='abc@gmail.com' />
                        <span id='emailError' className='text-danger'></span>
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" aria-describedby="emailHelp" onKeyUp={() => { passwordValidate() }} placeholder='password' />
                        <span id='passwordError' className='text-danger'></span>
                    </div>
                    <div className='text-center mt-2'>
                        <span id='emailSecurityCodeError' className='text-danger'></span>
                    </div>
                    <div className='mt-2'>
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => { showPasswordClick() }} /> Show password & security code
                    </div>
                    <div className='text-center mt-4'>
                        <button type="button" className="btn btn-outline-primary" onClick={() => { registerClick() }}>Register</button>
                        <h6 className='mt-2 mb-0 text-primary hoverText' onClick={() => { navigate('/') }}>back to login</h6>
                    </div>
                </div>
            </div>
            {
                open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message="Registration successful" action={action} /> : ''
            }
        </>
    )
}

export default Signup