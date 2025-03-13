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
            <div className='row m-1'>
                <h4>Add Course</h4>
            </div>
            <form className="m-2 " method='post' onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-4'>
                        <label className='form-label'>
                            Course Name
                        </label>
                        <input type='text' name='name' placeholder='Enter Course Name' value={values.name} onChange={handleChange} required className='form-control' />
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