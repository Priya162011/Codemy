import React from 'react'
import { NavLink } from 'react-router'
import { useDispatch } from "react-redux"
import logout from "../Slices/LoginSlice"
import logo from "./logo.png"

function Top_bar() {
  const dispatch = useDispatch()
  const handlelogout = () => {
    dispatch(logout())
  }
  return (
    <section className='addmission_top_penel'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/admision"><img src={logo} height={50} width={150} /></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <span className="navbar-text">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">
                <li className="nav-item">
                  <NavLink to="/admision/addstudent" className="nav-link active">+NEW STUDENT</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/" className="nav-link active" onClick={handlelogout}>Logout</NavLink>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </nav>
    </section>
  )
}

export default Top_bar