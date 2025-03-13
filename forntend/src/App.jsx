import React from 'react'
import './App.css'
import Login from './Componants/Login'
import Dashboard from './Componants/admin/Dashboard'
import FacultyRoute from './Routes/FacultyRoute'
import StudentRoute from './Routes/StudentRoute'
import AdmisionRoute from './Routes/AdmisionRoute'
import { Route, Routes } from 'react-router'
import ForgetPassword from './Componants/ForgetPassword'
import AdminRoute from './Routes/AdminRoute'
import Registration from './Componants/Student/Registration'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/forget-password' element={<ForgetPassword/>}></Route>        
        <Route path='/register' element={<Registration/>}/>
      </Routes>
      <FacultyRoute/>
      <StudentRoute/>
      <AdmisionRoute/>
      <AdminRoute/>
    </>
  )
}

export default App
