import React from 'react'
import { NavLink } from 'react-router'
import {useDispatch} from "react-redux"
import logout from "../Slices/LoginSlice"

function Top_bar() {
  const dispatch=useDispatch()
  const handlelogout=()=>{
    dispatch(logout())
}
  return (
    <section className='addmission_top_penel'>
        <div className="container">

            <div className="row align-items-center">
              <div className='col-md-6'>
              <h5 className='mb-0'>Welcome to addmission penel.!</h5>
              </div>
            <div className='col-md-6'>
              <div className='d-flex justify-content-end'>
              <NavLink to="/admision/addstudent" className='btn_wrap me-1'>+NEW STUDENT</NavLink>
              <NavLink to="/" className='btn_wrap' onClick={handlelogout}>Logout</NavLink>
              </div>
              
            </div>
            </div>
        </div>

    </section>
  )
}

export default Top_bar