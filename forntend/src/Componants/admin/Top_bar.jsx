import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../Slices/LoginSlice'
import logo from "./logo.png"
function Top_bar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlelogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-2">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/admin"><img src={logo} height={50} width={150} /></NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/admin">Dashboard</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/course">Course</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/topic">Topic</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/faculty">Faculty</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/student">Student</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/payment">Payment</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/revenue">Revenue</NavLink>
                        </li>
                    </ul>
                    <div>
                        <button className='btn btn-outline-secondary' onClick={handlelogout}>LogOut</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Top_bar