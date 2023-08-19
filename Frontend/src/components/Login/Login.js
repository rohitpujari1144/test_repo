import './login.css'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    var count = 0
    let navigate = useNavigate()

    function emailValidate() {
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        if (email.value === '') {
            emailError.innerText = '*Required'
        }
        else {
            emailError.innerText = ''
        }
    }

    function passwordValidate() {
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        if (password.value === '') {
            passwordError.innerText = '*Required'
        }
        else {
            passwordError.innerText = ''
        }
    }

    async function loginClick() {
        const email = document.getElementById('email')
        const emailError = document.getElementById('emailError')
        const password = document.getElementById('password')
        const passwordError = document.getElementById('passwordError')
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
        if (email.value === '') {
            emailError.innerText = '*Required'
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
            passwordError.innerText = '*Required'
        }
        else {
            passwordError.innerText = ''
        }
        if (emailError.innerText === '' && passwordError.innerText === '') {
            try {
                let res = await axios.get(`https://test-api-m06e.onrender.com/users/login?email=${email.value}&password=${password.value}`)
                toast.success('Login successful', {
                    position: "bottom-left",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                sessionStorage.setItem('token', res.data.tokenData)
                setTimeout(() => {
                    navigate('/home')
                }, 3500);
            }
            catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        toast.error('Invalid login credentials !', {
                            position: "bottom-left",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                }
                else {
                    toast.error('Something went wrong. Please try again !', {
                        position: "bottom-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
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
    return (
        <>
            {/* <Navbar /> */}
            <div className="position-absolute top-50 start-50 translate-middle rounded shadow p-4 col-3" >
                <h4 className='text-center'>Login</h4>
                <div>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { emailValidate() }} placeholder='abc@gmail.com' />
                    <span id='emailError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" aria-describedby="emailHelp" autoComplete='off' onKeyUp={() => { passwordValidate() }} placeholder='password' />
                    <span id='passwordError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => { showPasswordClick() }} /> Show password
                </div>
                <div className='text-center mt-2'>
                    <button type="button" className="btn btn-outline-primary" onClick={() => { loginClick() }}>Login</button>
                    <h6 className='mt-3 hoverText'>new user? <span className='text-primary' onClick={() => { navigate('/signup') }}>create account</span></h6>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login