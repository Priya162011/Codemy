import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router'

function Topic() {
    const [topic,settopic]=useState([])
    useEffect(()=>{
        axios.get('/api/topic').then(res=>{
            settopic(res.data.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
  return (
    <div className='container'>
            <div className='row'>
                <h4>All Topic</h4>
            </div>
            <div className='row'>
                <NavLink to="/admin/addtopic">+NEW</NavLink>
            </div>
            <div className='table-responsive'>
            <table className="table table-striped border mt-2">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope='col'>Course</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topic.map((item,i)=>{
                            return <tr key={i+1}>
                            <th scope="row">{i+1}</th>
                            <td>{item.name}</td>
                            <td>{item.course.name}</td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>
  )
}

export default Topic