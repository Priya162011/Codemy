import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";
import { useDispatch } from "react-redux";
import axios from "axios";
import logout from "../Slices/LoginSlice"
import logo from "./logo.png"

function Topbar() {
  const [user, setuser] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(`/api/getsession`, { withCredentials: true }).then(res => {
      setuser(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  const handlelogout = () => {
    dispatch(logout())
  }
  return (
    <>
      <section className="top_nav">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid  align-items-center">
          <ul className="navbar-nav col-md-2">
          <li className="nav-item">
            <img src={logo} height={80} />
            </li>
            </ul>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-md-8">
                <li >
                  <NavLink to="/student" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}> Dashboard</NavLink >
                </li>
                <li >
                  <NavLink to="/student/attendance" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Attendance</NavLink >
                </li>
                <li >
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/student/marks">Exam Reports</NavLink >
                </li>
                <li >
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/student/leave">Leaves</NavLink >
                </li>
                <li >
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/student/report">Course Progress</NavLink >
                </li>
              </ul>
              <ul className="navbar-nav col-md-2  justify-content-end">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUserGraduate />{user?.name}
                  </a>
                  <ul className="dropdown-menu mt-0 top-100" aria-labelledby="navbarDropdown">
                    <li><NavLink to="/" className='dropdown-item' onClick={handlelogout}>Logout</NavLink></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
}

export default Topbar;
