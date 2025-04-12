import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function AddFaculty() {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            name: '',
            email: '',
            contactno: '',
            address: '',
            qualification: '',
            password: '',
            status: 0
        },
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                Object.keys(values).forEach(key => {
                    formData.append(key, values[key]);
                });
                if (imageFile) {
                    formData.append('image', imageFile);
                }
                await axios.post('/api/faculty', formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(res => {
                    navigate('/admin/faculty');
                }).catch(err => {
                    console.log(err)
                })
            } catch (error) {
                console.error("Error:", error.response?.data || error.message);
            }
        }
    });

    return (
        <div className='container'>
            <form className="mx-auto border rounded col-md-10 p-5 pt-3" method='post' onSubmit={handleSubmit}>
                <div className='row m-1 text-center text-decoration-underline'>
                    <h3>Add Faculty</h3>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <label className='form-label fw-bold'>Name</label>
                        <input type='text' name='name' placeholder='Enter Name' value={values.name} onChange={handleChange} required className='form-control' />
                    <br/></div>
                    <div className='col-md-6'>
                        <label className='form-label fw-bold'>Email</label>
                        <input type='email' name='email' placeholder='Enter Email' value={values.email} onChange={handleChange} required className='form-control' />
                    <br/></div>
                    <div className='col-md-6'>
                        <label className='form-label fw-bold'>Contact No.</label>
                        <input type='text' name='contactno' placeholder='Enter Contact No.' value={values.contactno} onChange={handleChange} required className='form-control' />
                    <br/></div>
                    <div className='col-md-6'>
                        <label className='form-label fw-bold'>Address</label>
                        <input type='text' name='address' placeholder='Enter Address' value={values.address} onChange={handleChange} required className='form-control' />
                    <br/></div>
                    <div className='col-md-6'>
                        <label className='form-label fw-bold'>Qualification</label>
                        <input type='text' name='qualification' placeholder='Enter Qualification' value={values.qualification} onChange={handleChange} required className='form-control' />
                    <br/></div>
                    <div className='col-md-6'>
                        <label className='form-label fw-bold'>Image</label>
                        <input type='file' name='image' onChange={(e) => setImageFile(e.target.files[0])} required className='form-control' />
                    <br/></div>
                    <div className='col-md-12 mt-2'>
                        <input type='submit' value="Submit" className='btn btn-secondary' />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddFaculty;
