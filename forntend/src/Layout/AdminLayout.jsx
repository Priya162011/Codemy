import React, { useEffect, useState } from 'react'
import Top_bar from '../Componants/admin/Top_bar'
import { Outlet } from 'react-router'
import axios from 'axios'
import ErrorPage from '../Componants/ErrorPage'
function AdminLayout() {
  const [user, setuser] = useState(null)
  useEffect(() => {
    axios.get(`/api/getsession`, { withCredentials: true }).then(res => {
      setuser(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <div>
      {
        !user || user?.role !== "admin" ? <ErrorPage /> : <>
          <Top_bar />
          <Outlet /></>
      }
    </div>
  )
}

export default AdminLayout