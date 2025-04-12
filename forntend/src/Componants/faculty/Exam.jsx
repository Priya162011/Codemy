import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addexam } from '../Slices/ExamSlice';
import axios from 'axios';
import Select from 'react-select';

function Exam() {
    const [exams, setExams] = useState([]);
    const [user, setUser] = useState(null);
    const [students, setStudents] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        axios.get(`/api/getsession`, { withCredentials: true })
            .then(res => setUser(res.data.data))
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        axios.get('/api/exam')
            .then(res => setExams(res.data.data.data))
            .catch(error => console.log(error));
    }, [user]);


    useEffect(() => {
        axios.get(`/api/student/${user?.id}`)
            .then(res => {

                setStudents(res.data.data.data)

            })
            .catch(error => console.log(error));
    }, [user]);

    const { setFieldValue, values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            date: '',
            totalmarks: 0,
            faculty: '',
            students: [],
            status: 1
        },
        onSubmit: (values) => {
            dispatch(addexam(values));
        }
    });

    useEffect(() => {
        if (user) {
            setFieldValue('faculty', user.id);
        }
    }, [user, setFieldValue]);

    const handleStudentChange = (selectedOptions) => {
        setFieldValue("students", selectedOptions.map(option => option.value));
    };

    return (
        <section className='student_form mt-3'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>New Exam</h3>
                        <form onSubmit={handleSubmit} className='mt-3 border rounded-1 p-3'>
                            <div className="mb-2">
                                <label className='form-label'>Exam Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder='Enter Exam Name'
                                    className='form-control'
                                    onChange={handleChange}
                                    value={values.name}
                                />
                            </div>
                            <div className="mb-2">
                                <label className='form-label'>Exam Date</label>
                                <input
                                    type="date"
                                    name='date'
                                    className='form-control'
                                    onChange={handleChange}
                                    value={values.date}
                                />
                            </div>
                            <div className="mb-2">
                                <label className='form-label'>Total Marks</label>
                                <input
                                    type="text"
                                    name="totalmarks"
                                    placeholder='Enter No'
                                    className='form-control'
                                    onChange={handleChange}
                                    value={values.totalmarks}
                                />
                            </div>
                            <div className="mb-2">
                                <label className='form-label'>Select Students</label>
                                <Select
                                    options={students.map(student => ({ value: student._id, label: student.name }))}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    value={students
                                        .filter(student => values.students.includes(student._id))
                                        .map(student => ({ value: student._id, label: student.name }))
                                    }
                                    onChange={handleStudentChange}
                                />
                            </div>
                            <input type='submit' className='btn btn-secondary mt-2' value="Submit" />
                        </form>
                    </div>

                    <div className="col-md-6">
                        <h3>All Exams</h3>
                        <ul className="list-group mt-3">
                            {exams.length > 0 ? exams.map((exam) => (
                                <li key={exam._id} className="list-group-item">
                                    <strong>{exam.name}</strong> - {new Date(exam.date).toLocaleDateString('en-GB')} - Total Marks: {exam.totalmarks}
                                </li>
                            )) : <p>No exams available.</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Exam;
