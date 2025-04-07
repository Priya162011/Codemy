import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router'

function Course() {
    const [course,setcourse]=useState([])
    useEffect(()=>{
        axios.get('/api/course').then(res=>{
            setcourse(res.data.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <div className='container'>
            <div className='row'>
                <h4>All Course</h4>
            </div>
            <div className='row'>
                <NavLink to="/admin/addcourse">+NEW</NavLink>
            </div>
            <table class="table table-striped border mt-2">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        course.map((item,i)=>{
                            return <tr key={i+1}>
                            <th scope="row">{i+1}</th>
                            <td>{item.name}</td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Course