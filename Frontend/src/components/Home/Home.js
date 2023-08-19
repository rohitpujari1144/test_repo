import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    let navigate = useNavigate()

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
            if (validator.isURL(imageUrl.value)) {
                imageUrlError.innerText = ""
            }
            else {
                imageUrlError.innerText = "*Invalid image url"
            }
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
                    await axios.post(`https://test-api-m06e.onrender.com/products/addProduct`, productDetails, auth)
                    toast.success('Product successfully added', {
                        position: "bottom-left",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    name.value = ""
                    price.value = ""
                    description.value = ""
                    imageUrl.value = ""
                }
                catch (error) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            toast.error('Session expired. Please login again !', {
                                position: "bottom-left",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                            sessionStorage.clear()
                            setTimeout(() => {
                                navigate('/')
                            }, 2500);
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
            else {

                setTimeout(() => {
                    navigate('/')
                }, 2500);
            }
        }
    }
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
            <ToastContainer />
        </>
    )
}

export default Home