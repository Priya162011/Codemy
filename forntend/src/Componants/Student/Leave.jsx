import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { addleave } from '../Slices/LeaveSlice'
import axios from 'axios'

function Leave() {
  const [userid, setuserid] = useState(null)

  useEffect(() => {
    axios.get(`/api/getsession`, { withCredentials: true }).then(res => {
      setuserid(res.data.data.id)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  const dispatch = useDispatch()
  const { values, setFieldValue, handleSubmit, handleChange } = useFormik({
    initialValues: {
      studentid: '',
      startdate: '',
      enddate: '',
      reason: '',
      remark: '',
      status: 2
    },
    onSubmit: (values) => {
      dispatch(addleave(values))
    }
  })
  useEffect(() => {
    if (userid) {
      setFieldValue('studentid', userid);
    }
  }, [userid, setFieldValue]);
  return (

    <section className='leave_report'>
      <div className="container">
        <h3 className="main_title mt-2">Take leave</h3>
        <form onSubmit={handleSubmit} className='border rounded p-5'>
          <div className="row align-items-center form_box">
            <div className="col-md-6">
              <div className='mb-3'>
                <label htmlFor="" className='form-label'>Start Date</label>
                <input type="date" name='startdate' className='form-control' onChange={handleChange} value={values.startdate} min={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
            <div className="col-md-6">
              <div className='mb-3'>
                <label htmlFor="" className='form-label'>End Date</label>
                <input type="date" className='form-control' name='enddate' onChange={handleChange} value={values.enddate} min={values.startdate} />
              </div>
            </div>
            <div className="col-md-12">
              <div className='mb-3'>
                <label htmlFor="" className='form-label'>Reason</label>
                <textarea name="reason" id="" className='form-control' onChange={handleChange} value={values.reason} required></textarea>

              </div>
            </div>
            <div className="col-md-2">
              <button type='submit' className='btn btn-secondary'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </section>

  )
}

export default Leave