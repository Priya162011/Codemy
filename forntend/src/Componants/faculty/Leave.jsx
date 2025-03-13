import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { editleave } from '../Slices/LeaveSlice'

function Leave() {
    const[leaves,setleaves]=useState([])
    const dispatch=useDispatch()
    const handlenotapprove=(id)=>{
      dispatch(editleave({_id:id,status:0}))
    }
    const handleapprove=(id)=>{
      dispatch(editleave({_id:id,status:1}))
    }
    useEffect(()=>{
        axios.get('/api/leave').then(res=>{
            setleaves(res.data.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
  return (
    <section className="student_data_wrap">
      <div className="container-fluid">
        <h4 className="mb-3">Leaves</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Student Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                leaves.map((item,index)=>{
                  return <tr key={index+1}>
                  <td>{index+1}</td>
                  <td>{item.studentid.name}</td>
                  <td>{new Date(item.startdate).toLocaleDateString('en-GB')}</td>
                  <td>{new Date(item.enddate).toLocaleDateString('en-GB')}</td>
                  <td>{item.reason}</td>
                  {
                    item.status==1?<td>Apporve</td>:item.status==0?<td>Not Approve</td>:<><td><button onClick={()=>handleapprove(item._id)}>Approve</button></td>
                  <td><button onClick={()=>handlenotapprove(item._id)}>Not Approve</button></td></>
                  }
                  
                </tr>
                })
              }
              
            </tbody>
          </table>
        </div>
      </div>
     
    </section>
  )
}

export default Leave