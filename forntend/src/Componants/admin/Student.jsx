import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

function Student() {
    const location=useLocation()
    const stud_id=location.state?.id    
    const [student,setstudent]=useState([])
    const [filstudent,setfilstudent]=useState([])

    useEffect(()=>{
        axios.get('/api/student').then(res=>{
            // console.log(res.data.data.data)
            setstudent(res.data.data.data)
            setfilstudent(res.data.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    useEffect(()=>{
        const filterdata=student.filter((s)=>{
            return s.faculty._id === stud_id
        })
        setfilstudent(filterdata)
    },[student,stud_id])

  return (
    <div className='container'>
            <div className='row'>
                <h4>All student</h4>
            </div>
            <table class="table table-striped border mt-2">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope='col'>Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact No.</th>
                        <th scope="col">Address</th>
                        <th scope="col">Profile</th>
                        <th scope="col">Parent Name</th>
                        <th scope="col">Parent Contactno</th>
                        <th scope="col">Parent Profile</th>
                        <th scope="col">Course</th>
                        <th scope="col">Batch</th>
                        <th scope="col">Reference</th>
                        <th scope='col'>Faculty</th>
                        <th scope='col'>Payable Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    (!stud_id?student:filstudent).map((item,i)=>{
                            return <tr key={i+1}>
                            <th scope="row">{i+1}</th>
                            <td><img src={`https://api.codemy.live/uploads/${item.image}`} width={100} height={100}/></td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contactno}</td>
                            <td>{item.address}</td>
                            <td>{item.profile}</td>
                            <td>{item.parentname}</td>
                            <td>{item.parentcontactno}</td>
                            <td>{item.parentprofile}</td>
                            <td>{item.course.name}</td>
                            <td>{item.batch}</td>
                            <td>{item.ref}</td>
                            <td>{item.faculty.name}</td>
                            <td>{item.installmentDetails.map((item,i)=>{
                                    return <tr key={i+1}>₹{item.amount}-{new Date(item.date).toLocaleDateString('en-GB')}</tr>
                            })}</td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
  )
}

export default Student