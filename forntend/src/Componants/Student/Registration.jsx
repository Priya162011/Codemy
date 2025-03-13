import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import { addStudent } from '../Slices/StudentSlice'
import { useReactToPrint } from 'react-to-print';
import Receipt from '../admision/Receipt'
import { Modal } from "bootstrap";
import { useNavigate } from 'react-router'

function Registration() {
    const [course, setCourse] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [studentData, setStudentData] = useState(null);
    const dispatch = useDispatch();
    const navigate=useNavigate()

    useEffect(() => {
        axios.get('/api/course')
            .then(res => setCourse(res.data.data.data))
            .catch(err => console.log(err));

        axios.get('/api/faculty')
            .then(res => setFaculty(res.data.data.data))
            .catch(err => console.log(err));
    }, []);

    const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            ref:'',
            address: '',
            parentname: '',
            parentcontactno: '',
            course: '',
            batch: '0',
            profile: '',
            parentprofile: '',
            image: '',
            adharcard: '',
            faculty: '',
            totalfees: '',
            amount: '',
            type: 0,
            counselor:'',
            joindate: new Date().toISOString().split('T')[0],
            status: 1,
            month: 0,
            installmentDetails: [],
            enrno:''
        },
        onSubmit: (values) => {
            handlePayment(values);
        },
    });

    const handlePayment = async (formData) => {
        try {
            const res = await axios.post('/api/payment/order', { amount: formData.amount });
            const { id, amount, currency } = res.data;

            const options = {
                key: "YOUR_RAZORPAY_KEY", 
                amount: amount,
                currency: currency,
                name: "Codemy IT Institute",
                description: "Course Admission Payment",
                order_id: id,
                handler: async (response) => {
                    alert("Payment successful!");
                    
                    const studentData = new FormData();
                    Object.keys(formData).forEach(key => {
                        studentData.append(key, formData[key]);
                    });

                    dispatch(addStudent(studentData, navigate));
                },
                prefill: {
                    name: values.name,
                    email: values.email,
                    contact: values.contactno
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment failed", error);
        }
    };

    const handleFileChange = (e) => {
        setFieldValue(e.target.name, e.target.files[0]);
    };
    return (

        <section className='student_form'>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Student Name</label>
                                <input type="text" name="name" id="" placeholder='Enter Name' className='form-control' required onChange={handleChange} value={values.name} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Student Email</label>
                                <input type="text" name="email" id="" placeholder='Enter Email' className='form-control' required onChange={handleChange} value={values.email} />
                            </div>
                        </div>
                        
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Reference By</label>
                                <input type="text" name="ref" id="" placeholder='Enter Reference Name' className='form-control' required onChange={handleChange} value={values.ref} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Select Course</label>
                                <select name="course" id="" className='form-select' onChange={handleChange} value={values.course}>
                                    <option value="0">Select Course</option>
                                    {
                                        course.map((item,index)=>{
                                            return <option value={item._id} key={index}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label className='form-label'>Upload Student Photo</label>
                            <input type="file" name='image' className='form-control' required onChange={handleFileChange} />
                        </div>
                        <div className="col-md-4">
                            <label className='form-label'>Upload Adhar Card</label>
                            <input type="file" name='adharcard' className='form-control' required onChange={handleFileChange} />
                        </div>
                       

                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Student Mobile No</label>
                                <input type="text" name="contactno" id="" placeholder='Enter No' className='form-control' required onChange={handleChange} value={values.contactno} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Student Proffession</label>
                                <input type="text" name="profile" id="" placeholder='Enter Proffesion' className='form-control' required onChange={handleChange} value={values.profile} />
                            </div>
                        </div>
                        
                        
                        
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Student Address</label>
                                <input type="text" name="address" id="" placeholder='Enter Address' className='form-control' required onChange={handleChange} value={values.address} />
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <button className='btn_wrap w-100 mt-1'>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Registration