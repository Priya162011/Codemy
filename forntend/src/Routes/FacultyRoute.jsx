import React from 'react'
import { Route, Routes } from 'react-router'
import FacultyLayout from '../Layout/FacultyLayout'
import Dashboard from '../Componants/faculty/Dashboard'
import Students_data from '../Componants/faculty/Students_data'
import Exam from '../Componants/faculty/Exam'
import Leave from '../Componants/faculty/Leave'

function FacultyRoute() {
  return (
    <Routes>
        <Route path='/faculty' element={<FacultyLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='/faculty/students' element={<Students_data/>}/>
            <Route path='/faculty/exam' element={<Exam/>}/>
            <Route path='/faculty/leave' element={<Leave/>}/>
        </Route>
    </Routes>
  )
}

export default FacultyRoute