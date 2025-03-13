import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from '../Componants/admin/Dashboard'
import AdminLayout from '../Layout/AdminLayout'
import AddTopic from '../Componants/admin/AddTopic'
import Course from '../Componants/admin/Course'
import Topic from '../Componants/admin/Topic'
import AddCourse from '../Componants/admin/AddCourse'
import Faculty from '../Componants/admin/Faculty'
import AddFaculty from '../Componants/admin/AddFaculty'
import Student from '../Componants/admin/Student'
import Payment from '../Componants/admin/Payment'
import Revenue from '../Componants/admin/Revenue'

function AdminRoute() {
  return (
    <Routes>
        <Route path='/admin' element={<AdminLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='/admin/course' element={<Course/>}/>
            <Route path='/admin/addtopic' element={<AddTopic/>}/>
            <Route path='/admin/topic' element={<Topic/>}/>
            <Route path='/admin/addcourse' element={<AddCourse/>}/>
            <Route path='/admin/faculty' element={<Faculty/>} />
            <Route path='/admin/addfaculty' element={<AddFaculty/>}/>
            <Route path='/admin/student' element={<Student/>}/>
            <Route path='/admin/payment' element={<Payment/>}/>
            <Route path='/admin/revenue' element={<Revenue/>}/>
        </Route>
    </Routes>
  )
}

export default AdminRoute