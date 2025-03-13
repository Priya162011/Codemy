import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ViewDetailModal(props) {
    const id=props.selectedid
   
    const[student,setstudent]=useState(null)
   
    useEffect(()=>{
        if(id!=null){
        axios.get(`/api/one_student/${id}`).then(res=>{
            setstudent(res.data.data.data[0])
        }).catch(err=>{
            console.log(err)
        })
    }
    
    },[id])
    

   
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
        
            <div className="modal-body">
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{student?.name}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{student?.email}</td>
                    </tr>
                    <tr>
                        <td>Course</td>
                        <td>{student?.course.name}</td>
                    </tr>
                    <tr>
                        <td>Batch</td>
                        <td>{student?.batch}</td>
                    </tr>
                    <tr>
                        <td>Join Date</td>
                        <td>{new Date(student?.joindate).toLocaleDateString('en-GB')}</td>
                    </tr>
                    <tr>
                        <td>Profile</td>
                        <td>{student?.profile}</td>
                    </tr>
                    <tr>
                        <td>Mobile No.</td>
                        <td>{student?.contactno}</td>
                    </tr>
                    <tr>
                        <td>Parent Name</td>
                        <td>{student?.parentname}</td>
                    </tr>
                    <tr>
                        <td>Parent Profile</td>
                        <td>{student?.parentprofile}</td>
                    </tr>
                    <tr>
                        <td>Parent Mobile No.</td>
                        <td>{student?.parentcontactno}</td>
                    </tr>
                    
                    </tbody>
             </table>
            </div>
          </div>
        </div>
  )
}

export default ViewDetailModal