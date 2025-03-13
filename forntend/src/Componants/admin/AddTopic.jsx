import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router'
function AddCourse() {
    const [courses, setcourse] = useState([])
    const navigate=useNavigate()
    useEffect(() => {
        axios.get('/api/course').then(res => {
            setcourse(res.data.data.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            course: '',
            status: 1
        },
        onSubmit: (values) => {
            axios.post('/api/topic', values).then(res => {
                navigate('/admin/topic')
            }).catch(err => {
                console.log(err)
            })
        }
    })

    return (
        <div className='conatainer'>
            <div className='row m-1'>
                <h4>Add Topic</h4>
            </div>
            <form className="m-2 " method='post' onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-4'>
                        <label className='form-label'>
                            Topic Name
                        </label>
                        <input type='text' name='name' placeholder='Enter Course Name' value={values.name} onChange={handleChange} required className='form-control' />
                    </div>
                    <div className='col-md-4'>
                        <label className='form-label'>
                            Course Name
                        </label>
                        <select name='course' value={values.course} onChange={handleChange} required className='form-select'>
                            <option>Select Course</option>
                            {courses ?
                                courses.map((item, i) => {
                                    return <option key={i + 1} value={item._id}>{item.name}</option>
                                }) : ''
                            }
                        </select>
                    </div>
                    <div className='col-md-12 mt-2'>
                    <input type='submit' value="Submit" className='btn btn-secondary'/>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default AddCourse