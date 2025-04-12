import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { editStudent } from '../Slices/StudentSlice'
import { useDispatch } from 'react-redux'

function EditModal(props) {
    const id=props.selectedid
    const dispatch=useDispatch()
    const[student,setstudent]=useState(null)
    const [faculty, setFaculty] = useState([]);
    useEffect(()=>{
        if(id!=null){
        axios.get(`/api/one_student/${id}`).then(res=>{
            setstudent(res.data.data.data[0])
        }).catch(err=>{
            console.log(err)
        })
        axios.get('/api/faculty')
            .then(res => setFaculty(res.data.data.data))
            .catch(err => console.log(err));
    }
    
    },[id])
    

    const {values,handleChange,handleSubmit,errors,touched,handleBlur}=useFormik({
        enableReinitialize: true,
        initialValues:{
            _id:student?._id||'',
          name: student?.name || '',
          email: student?.email || '',
          password: student?.password || '', 
          contactno: student?.contactno || '',
          address: student?.address || '',
          parentname: student?.parentname || '',
          parentcontactno:student?.parentcontactno || '',
          course:student?.course || '', 
          batch:student?.batch || '',
          profile:student?.profile || '',
          parentprofile:student?.parentprofile || '',
          image:student?.image || '',
          adharcard:student?.adharcard || '',
          faculty:student?.faculty || '',
          status: student?.status||0
        },
        onSubmit:(values)=>{
          dispatch(editStudent(values));
        }
      })
    return (
    <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Student Details 
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="modal-body">
              
              <div className="row">
                <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                            Student Name
                        </label>
                        <input type="text" disabled name='name' value={values.name} className="form-control" onChange={handleChange}/>
                </div>

                <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                            Assign to Faculty name
                        </label>
                        <select name="faculty" id="" className="form-select" value={values.faculty} onChange={handleChange} >
                            
                            {
                                faculty.map((item,index)=>{
                                    return <option value={item._id} key={index}>{item.name}</option>
                                })
                            }
                        </select>
                </div>
                <div className="col-md-6">
                <label htmlFor="" className="form-label mt-3">
                Select batch Time
              </label>
              <select name="batch" id="" className="form-select" value={values.batch} onChange={handleChange}>
                <option value="8to10">8 TO 10</option>
                <option value="10to12">10 TO 12</option>
                <option value="12to2">12 TO 2</option>
              </select>
                </div>

                <div className="col-md-6">
                <label htmlFor="" className="form-label mt-3">
                Select Status
              </label>

              <select name="status" id="" className="form-select" value={values.status} onChange={handleChange}>
                <option value="1">Not Join</option>
                <option value="3">Completed</option>
                <option value="0">Running</option>
                <option value="2">Drop</option>
                <option value="4">In Job</option>
              </select>
             
                </div>
              </div>

              <button type="submit" className="btn btn-secondary mt-2">
                Submit
              </button>
            </div>
            </form>
          </div>
        </div>
  )
}

export default EditModal