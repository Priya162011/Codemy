import React, { useEffect, useState } from 'react'
import Top_navigation from '../Componants/faculty/Top_navigation'
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
      !user || user?.role !== "faculty"?<ErrorPage/>:<>
        <Top_navigation/>
        <Outlet/></>
    }
    </>
  )
}

export default FacultyLayout