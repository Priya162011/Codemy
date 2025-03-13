import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import {useDispatch} from 'react-redux'
import { addremark } from '../Slices/RemarkSlice';

function RemarkModal(props) {
    const dispatch=useDispatch()
     const {setValues,values,handleChange,handleSubmit}=useFormik({
        initialValues:{
          student: props.selectedid,
          date: '', 
          remark: '',
          status: 1
        },
        onSubmit:(values)=>{
          dispatch(addremark(values));
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
                Student Remark
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
                <option value="0">Monthly</option>
                <option value="1">Weekly</option>
              </select>

              <label htmlFor="" className="form-label mt-3">
                 Date
              </label>
              <input type="date" name="date" className="form-control" value={values.date} onChange={handleChange}/>
              
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

export default RemarkModal