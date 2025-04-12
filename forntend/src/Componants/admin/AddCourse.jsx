import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router'

function AddCourse() {
    const navigate=useNavigate()
    const {values,handleChange,handleSubmit}=useFormik({
        initialValues:{
            name:''
        },
        onSubmit:(values)=>{
            axios.post('/api/course',values).then(res=>{
                navigate('/admin/course')
            }).catch(err=>{
                console.log(err)
            })
        }
    })

  return (
    <div className='conatainer'>
            <div className='mx-auto col-md-5'>
            <form className="p-5 pt-3 border rounded" method='post' onSubmit={handleSubmit}>
            <div className='row m-1 text-center text-decoration-underline'>
                <h2>Add Course</h2>
            </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <label className='form-label fw-bold'>
                            Course Name
                        </label>
                        <input type='text' name='name' placeholder='Enter Course Name' value={values.name} onChange={handleChange} required className='form-control' />
                    </div>
                    <div className='col-md-12 mt-2'>
                    <br/><input type='submit' value="Submit" className='btn btn-secondary'/>
                    </div>
                </div>

            </form>
            </div>
        </div>
  )
}

export default AddCourse