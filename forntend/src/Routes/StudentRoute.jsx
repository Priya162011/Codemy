import React from 'react'
import { Route, Routes } from 'react-router'
import StudentLayout from '../Layout/StudentLayout'
import Dashboard from '../Componants/Student/Dashboard'
import Attendace from '../Componants/Student/Attendace'
import Marks from '../Componants/Student/Marks'
import Leave from '../Componants/Student/Leave'
import Report from '../Componants/Student/Report'

function FacultyRoute() {
  return (
    <Routes>
        <Route path='/student' element={<StudentLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='/student/attendance' element={<Attendace/>}/>
            <Route path='/student/marks' element={<Marks/>}/>
            <Route path='/student/leave' element={<Leave/>}/>
            <Route path='/student/report' element={<Report/>}/>
        </Route>
    </Routes>
  )
}

export default FacultyRoute