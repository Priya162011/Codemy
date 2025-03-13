import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import { addStudent } from '../Slices/StudentSlice'
import { useReactToPrint } from 'react-to-print';
import Receipt from './Receipt'
import { Modal } from "bootstrap";
import { useNavigate } from 'react-router'

function Student_registration() {
    const [course, setCourse] = useState([]);
    const [faculty, setFaculty] = useState([]);
    const [studentData, setStudentData] = useState(null);
    const [installments, setInstallments] = useState([]);
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
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (key === "image" || key === "adharcard") {
                    formData.append(key, values[key]);
                } else if (key === "installmentDetails") {
                    formData.append(key, JSON.stringify(values[key]));
                } else {
                    formData.append(key, values[key]);
                }
            });
            formData.append("installmentdetails", JSON.stringify(values.installmentdetails));
            setStudentData(values);
            dispatch(addStudent(formData,navigate));
        },
    });

    const handleMonthChange = (e) => {
        const selectedMonth = parseInt(e.target.value, 10);
        setFieldValue("month", selectedMonth);

        const newInstallments = Array.from({ length: selectedMonth }, () => ({ amount: "", date: "" }));
        setInstallments(newInstallments);
        setFieldValue("installmentDetails", newInstallments);
    };

    const handleInstallmentChange = (index, field, value) => {
        const updatedInstallments = [...installments];
        
        if (!updatedInstallments[index]) {
            updatedInstallments[index] = { amount: "", date: "" };
        }
        updatedInstallments[index][field] = value;

        setInstallments(updatedInstallments);
        setFieldValue("installmentDetails", updatedInstallments);
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
                                <label htmlFor="" className='form-label'>Counselor</label>
                                <select name="counselor" id="" className='form-select' onChange={handleChange} value={values.counselor}>
                                    <option value="0">Select counselor</option>
                                    <option value="Ravi Prajapati">Ravi Prajapati</option>
                                </select>
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
                                <label htmlFor="" className='form-label'>Select Faculty</label>
                                <select name="faculty" id="" className='form-select' onChange={handleChange} value={values.faculty}>
                                    <option value="0">Select Faculty</option>
                                    {
                                        faculty.map((item,index)=>{
                                            return <option value={item._id} key={index+1}>{item.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Select Batch Time</label>
                                <select name="batch" id="" className='form-select' onChange={handleChange} value={values.batch}>
                                    <option value="0">Select Batch</option>
                                    <option value="8to10">8 to 10</option>
                                    <option value="10to12">10 to 12</option>
                                    <option value="12to2">12 to 2</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <label htmlFor="" className='form-label'>Select Joining Date</label>

                            <input type="date" name='joindate' className='form-control' required onChange={handleChange} value={values.joindate ? values.joindate.split('T')[0] : ''} />
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
                                <label htmlFor="" className='form-label'>Parent Name</label>
                                <input type="text" name="parentname" id="" placeholder='Parent Name' className='form-control' required onChange={handleChange} value={values.parentname} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Parent Proffession</label>
                                <input type="text" name="parentprofile" id="" placeholder='Enter Proffesion' className='form-control' required onChange={handleChange} value={values.parentprofile} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Parent Mobile No</label>
                                <input type="text" name="parentcontactno" id="" placeholder='Enter Parent No' className='form-control' required onChange={handleChange} value={values.parentcontactno} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Total Fees</label>
                                <input type="text" name="totalfees" id="" placeholder='Enter Amount' className='form-control' required onChange={handleChange} value={values.totalfees} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Payable Fees</label>
                                <input type="text" name="amount" id="" placeholder='Enter Amount' className='form-control' required onChange={handleChange} value={values.amount} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className='mb-2'>
                                <label htmlFor="" className='form-label'>Select Payment Type</label>
                                <select name="type" id="" className='form-select' onChange={handleChange} value={values.type}>
                                    <option value="0">Select payment Type</option>
                                    <option value="1">Cash</option>
                                    <option value="2">UPI</option>
                                    <option value="3">Check</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <label className='form-label'>Select Payment Installment Month</label>
                            <select name="month" className='form-select' onChange={handleMonthChange} value={values.month}>
                                <option value="0">Select payment installment month</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        {installments.map((installment, index) => (
                            <div className="col-md-4" key={index}>
                                <label className='form-label'>Installment {index + 1} Amount</label>
                                <input 
                                    type="text" 
                                    className='form-control' required 
                                    placeholder='Enter Amount' 
                                    value={installment.amount}
                                    onChange={(e) => handleInstallmentChange(index, "amount", e.target.value)}
                                />
                                <label className='form-label'>Installment {index + 1} Date</label>
                                <input 
                                    type="date" 
                                    className='form-control' required 
                                    value={installment.date}
                                    onChange={(e) => handleInstallmentChange(index, "date", e.target.value)}
                                />
                            </div>
                        ))}
                        
                        <div className="col-md-12">
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

export default Student_registration