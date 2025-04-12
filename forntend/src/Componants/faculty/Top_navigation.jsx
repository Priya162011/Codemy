import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { FaUserTie } from "react-icons/fa6";
import axios from "axios"
import { useDispatch } from "react-redux"
import logout from "../Slices/LoginSlice"
import logo from "./logo.png"

function Top_navigation() {
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
            <section className='top_navigation_wrap'>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                                  <NavLink className="navbar-brand" to="/admision"><img src={logo} height={50} width={150} /></NavLink>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <NavLink to="/faculty" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}> Dashboard</NavLink >
                                </li>
                                <li class="nav-item">
                                    <NavLink to="/faculty/students" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}> All Students </NavLink >
                                </li>
                                <li class="nav-item">
                                    <NavLink to="/faculty/exam" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}> Exam </NavLink >
                                </li>
                                <li class="nav-item">
                                    <NavLink to="/faculty/leave" className={({ isActive }) => (isActive ? 'active nav-link' : 'nav-link')}> Leave </NavLink >
                                </li>

                            </ul>
                            <ul class="navbar-nav mb-2 mb-lg-0  d-flex justify-content-end">
                                <li class="nav-item dropdown">
                                    <h6 className='faculty_name btn btn-outline-secondary' data-bs-toggle="dropdown" aria-expanded="false"><span> <FaUserTie /></span> {user?.name}</h6>
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
    )
}

export default Top_navigation