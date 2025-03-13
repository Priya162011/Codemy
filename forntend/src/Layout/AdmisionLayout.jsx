import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Top_bar from '../Componants/admision/Top_bar'
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
      !user || user?.role !== "adminstar"?<ErrorPage/>:<>
        <Top_bar/>
        <Outlet/></>
    }
    </>
  )
}

export default FacultyLayout