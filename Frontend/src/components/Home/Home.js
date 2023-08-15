import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'

function Home() {
    let navigate = useNavigate()
    let [open, setOpen] = useState(false)
    let [message, setMessage] = useState('')

    let token = sessionStorage.getItem('token')

    function nameValidate() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        if (name.value === '') {
            nameError.innerText = "*Required"
        }
        else if (!isNaN(name.value)) {
            nameError.innerText = "*Invalid"
        }
        else {
            nameError.innerText = ""
        }
    }

    function priceValidate() {
        const price = document.getElementById('price')
        const priceError = document.getElementById('priceError')
        if (price.value === '') {
            priceError.innerText = "*Required"
        }
        else {
            priceError.innerText = ""
        }
    }

    function descriptionValidate() {
        const description = document.getElementById('description')
        const descriptionError = document.getElementById('descriptionError')
        if (description.value === '') {
            descriptionError.innerText = "*Required"
        }
        else {
            descriptionError.innerText = ""
        }
    }

    function imageUrlValidate() {
        const imageUrl = document.getElementById('imageUrl')
        const imageUrlError = document.getElementById('imageUrlError')
        if (imageUrl.value === '') {
            imageUrlError.innerText = "*Required"
        }
        else {
            imageUrlError.innerText = ""
        }
    }

    async function addProductClick() {
        const name = document.getElementById('name')
        const nameError = document.getElementById('nameError')
        const price = document.getElementById('price')
        const priceError = document.getElementById('priceError')
        const description = document.getElementById('description')
        const descriptionError = document.getElementById('descriptionError')
        const imageUrl = document.getElementById('imageUrl')
        const imageUrlError = document.getElementById('imageUrlError')
        if (name.value === '') {
            nameError.innerText = "*Required"
        }
        else if (!isNaN(name.value)) {
            nameError.innerText = "*Invalid"
        }
        else {
            nameError.innerText = ""
        }
        if (price.value === '') {
            priceError.innerText = "*Required"
        }
        else {
            if (price.value < 1) {
                priceError.innerText = "*Invalid"
            }
            else {
                priceError.innerText = ""
            }
        }
        if (description.value === '') {
            descriptionError.innerText = "*Required"
        }
        else {
            descriptionError.innerText = ""
        }
        if (imageUrl.value === '') {
            imageUrlError.innerText = "*Required"
        }
        else {
            imageUrlError.innerText = ""
        }
        if (nameError.innerText === "" && priceError.innerText === "" && descriptionError.innerText === "") {
            let productDetails = {
                name: name.value,
                price: price.value,
                desc: description.value,
                imgUrl: imageUrl.value
            }
            let auth = {
                headers: { Authorization: `Bearer ${token}` }
            }
            if (token) {
                try {
                    let res = await axios.post(`https://test-api-m06e.onrender.com/products/addProduct`, productDetails, auth)
                    if (res.status === 201) {
                        setOpen(true)
                        setMessage('Product successfully added')
                        name.value = ""
                        price.value = ""
                        description.value = ""
                        imageUrl.value = ""
                    }
                    else {
                        setOpen(true)
                        setMessage('Session has expired. Please login again')
                        sessionStorage.clear()
                        setTimeout(() => {
                            navigate('/')
                        }, 2500);
                    }
                }
                catch (error) {
                    setOpen(true)
                    setMessage('Session has expired. Please login again')
                    sessionStorage.clear()
                    setTimeout(() => {
                        navigate('/')
                    }, 2500);
                }
            }
            else {
                setOpen(true)
                setMessage('Session has expired. Please login again')
                setTimeout(() => {
                    navigate('/')
                }, 2500);
            }
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
            <div className='text-end m-3'>
                <button type="button" className="btn btn-outline-danger" onClick={() => navigate('/')}>Logout</button>
            </div>
            <div className="shadow col-3 rounded position-absolute top-50 start-50 translate-middle p-4">
                <h4 className='text-center text-primary'>Add Product</h4>
                <div className='mt-2'>
                    <label htmlFor="name" className="form-label">Product name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onKeyUp={() => { nameValidate() }} placeholder='name' />
                    <span id='nameError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <label htmlFor="price" className="form-label">Product price</label>
                    <input type="number" className="form-control" id="price" aria-describedby="emailHelp" onKeyUp={() => { priceValidate() }} placeholder='price' />
                    <span id='priceError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" aria-describedby="emailHelp" onKeyUp={() => { descriptionValidate() }} placeholder='description' />
                    <span id='descriptionError' className='text-danger'></span>
                </div>
                <div className='mt-2'>
                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                    <input type="text" className="form-control" id="imageUrl" aria-describedby="emailHelp" onKeyUp={() => { imageUrlValidate() }} placeholder='image url' />
                    <span id='imageUrlError' className='text-danger'></span>
                </div>
                <div className='text-center mt-4'>
                    <button type="button" className="btn btn-outline-primary" onClick={() => { addProductClick() }}>Add Product</button>
                </div>
            </div>
            {
                open ? <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message} action={action} /> : ''
            }
        </>
    )
}

export default Home