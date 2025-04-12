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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/student"><img src={logo} height={50} width={150} /></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to="/student" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}> Dashboard</NavLink >
                </li>
                <li className="nav-item">
                  <NavLink to="/student/attendance" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Attendance</NavLink >
                </li>
                <li >
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/student/marks">Exam Reports</NavLink >
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/student/leave">Leaves</NavLink >
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/student/report">Course Progress</NavLink >
                </li>

              </ul>
              <ul className="navbar-nav mb-2 mb-lg-0  d-flex justify-content-end">
                <li className="nav-item dropdown">
                  <h6 className='faculty_name btn btn-outline-secondary' data-bs-toggle="dropdown" aria-expanded="false"><span> <FaUserGraduate /></span>{user?.name}</h6>
                  <div className="dropdown-menu">
                    <NavLink className="btn" to="/" onClick={handlelogout}>Logout</NavLink>
                  </div>
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
