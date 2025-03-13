import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { FaUserTie } from "react-icons/fa6";
import axios from "axios"
import { useDispatch } from "react-redux"
import logout from "../Slices/LoginSlice"

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
                <div className="container-fluid">
                    <div className="w_100">
                        <div className="w_20">
                            <h5 className='text-white mb-0'>Welcome {user?.name}..!</h5>
                        </div>
                        <div className="w_80">
                            <ul>
                                <li>
                                    <NavLink to="/faculty" className={({ isActive }) => (isActive ? 'active' : '')}> Dashboard</NavLink >
                                </li>
                                <li>
                                    <NavLink to="/faculty/students" className={({ isActive }) => (isActive ? 'active' : '')}> All Students </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/faculty/exam" className={({ isActive }) => (isActive ? 'active' : '')}> Exam </NavLink >
                                </li>
                                <li>
                                    <NavLink to="/faculty/leave" className={({ isActive }) => (isActive ? 'active' : '')}> Leave </NavLink >
                                </li>
                                <li>

                                    <h6 className='faculty_name' data-bs-toggle="dropdown" aria-expanded="false"><span> <FaUserTie /></span> {user?.name}</h6>

                                    <div className="dropdown-menu">
                                        <NavLink to="/" onClick={handlelogout}>Logout</NavLink>
                                    </div>

                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Top_navigation