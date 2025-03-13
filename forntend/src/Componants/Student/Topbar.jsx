import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { FaUserGraduate } from "react-icons/fa";
import { useDispatch } from "react-redux";
import axios from "axios";
import logout from "../Slices/LoginSlice"

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

        <div className="container-fluid">
          <div className="w_100">
            <div className="w_20">
              <h5 className="mb-0 text-white">Welcome {user?.name}</h5>
            </div>
            <div className="w_60">
              <ul>
                <li>

                  <NavLink to="/student" className={({ isActive }) => (isActive ? 'active' : '')}> Dashboard</NavLink >
                </li>
                <li>
                  <NavLink to="/student/attendance" className={({ isActive }) => (isActive ? 'active' : '')}>Attendance</NavLink >
                </li>
                <li>
                  <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/student/marks">Exam Reports</NavLink >
                </li>
                <li>
                  <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/student/leave">Leaves</NavLink >
                </li>
                <li>
                  <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="/student/report">Course Progress</NavLink >
                </li>
              </ul>
            </div>
            <div className="w_20">
              <div className="username_login_wrap">
                <ul>
                  
                  <li className="user_icon_name">
                    <h6 data-bs-toggle="dropdown" aria-expanded="false"><FaUserGraduate />{user?.name}</h6>

                    <div className="dropdown-menu">
                      <NavLink to="/" onClick={handlelogout}>Logout</NavLink>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>

        </div>

      </section>
    </>
  );
}

export default Topbar;
