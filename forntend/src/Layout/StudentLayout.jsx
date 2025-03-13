import React, { useEffect, useState } from 'react'
import Topbar from '../Componants/Student/Topbar'
import { Outlet } from 'react-router'
import axios from 'axios'
import ErrorPage from '../Componants/ErrorPage'

function FacultyLayout() {
  const [user, setuser] = useState(null)
  useEffect(() => {
    axios.get(`/api/getsession`, { withCredentials: true }).then(res => {
        setuser(res.data.data)
    }).catch(err => {
        console.log(err)
    })
    
}, [])
  return (
    <>
    {
      !user || user?.role !== "student"?<ErrorPage/>:<><Topbar/>
      <Outlet/></>
    }
        
    </>
  )
}

export default FacultyLayout