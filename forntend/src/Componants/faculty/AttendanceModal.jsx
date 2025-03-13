import React, { useEffect, useState } from 'react'
import { addattendance } from '../Slices/AttendanceSlice';
import { useFormik } from 'formik';
import {useDispatch} from 'react-redux'

function AttendanceModal(props) {
     const dispatch=useDispatch()
     const {setValues,values,handleChange,handleSubmit}=useFormik({
        initialValues:{
          student: props.selectedid,
          startdate: '',
          enddate: '', 
          remark: '',
          status: 1
        },
        onSubmit:(values)=>{
          dispatch(addattendance(values));
        }
      });
      useEffect(() => {
        setValues((prevValues) => ({
          ...prevValues,
          student: props.selectedid 
        }));
      }, [props.selectedid]);
  return (
    <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Student Attendance
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form method="post" onSubmit={handleSubmit}>
              <label htmlFor="" className="form-label">
                Select Option
              </label>
              <select name="status" id="" className="form-control" value={values.status} onChange={handleChange}>
                <option value="0">
                  Absent
                </option>
                <option value="1">Present</option>
                <option value="2">Leave</option> 
              </select>

              <label htmlFor="" className="form-label mt-3">
                Start Date
              </label>
              <input type="date" name="startdate" className="form-control" value={values.startdate} onChange={handleChange} />
              <label htmlFor="" className="form-label mt-3">
                End Date
              </label>
              <input type="date" name="enddate" className="form-control" value={values.enddate} onChange={handleChange} min={values.startdate} max={values.startdate}/>
              <label htmlFor="" className="form-label mt-3">
                Remark
              </label>
              <textarea
                name="remark"
                id=""
                className="form-control"
                placeholder="Enter Remarks here"
                value={values.remark}
                onChange={handleChange}
              ></textarea>

              <button type="submit" className="btn_wrap mt-3 w-100">
                Submit
              </button>
              </form>
            </div>
          </div>
        </div>
  )
}

export default AttendanceModal