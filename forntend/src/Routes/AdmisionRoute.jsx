import React from 'react'
import { Routes,Route } from 'react-router'
import AdmisionLayout from '../Layout/AdmisionLayout'
import Students_data from '../Componants/admision/Students_data'
import Student_registration from '../Componants/admision/Student_registration'

function AdmisionRoute() {
  return (
    <Routes>
        <Route path='/admision' element={<AdmisionLayout/>}>
            <Route index element={<Students_data/>}/>
            <Route path='/admision/addstudent' element={<Student_registration/>}/>
        </Route>
    </Routes>
  )
}

export default AdmisionRoute