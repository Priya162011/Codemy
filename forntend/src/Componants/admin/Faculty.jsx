import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router'

function Faculty() {
    const [faculty,setfaculty]=useState([])
    useEffect(()=>{
        axios.get('/api/faculty').then(res=>{
            setfaculty(res.data.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
  return (
    <div className='container'>
            <div className='row'>
                <h4>All Faculty</h4>
            </div>
            <div className='row'>
                <NavLink to="/admin/addfaculty">+NEW</NavLink>
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
                        <th scope="col">Qualification</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        faculty.map((item,i)=>{
                            return <tr key={i+1}>
                            <th scope="row">{i+1}</th>
                            <td><img src={`/uploads/${item.image}`} height={100} width={100}/></td>
                            <td><NavLink to="/admin/student/" state={{id:item._id}}>{item.name}</NavLink></td>
                            <td>{item.email}</td>
                            <td>{item.contactno}</td>
                            <td>{item.address}</td>
                            <td>{item.qualification}</td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
  )
}

export default Faculty