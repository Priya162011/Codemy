import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

function Revenue() {
  const [total, settotal] = useState(0)
  const [month, setmonth] = useState(0)
  const [today, settoday] = useState(0)
  const [data, setdata] = useState([])
  const [monthlyRevenue, setMonthlyRevenue] = useState([])

  useEffect(() => {
    axios.get('/api/payment').then(res => {
      setdata(res.data.data.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    let todayTotal = 0
    let overallTotal = 0
    const monthly = Array(12).fill(0)

    data.forEach(entry => {
      const date = new Date(entry.createdAt)
      const monthIndex = date.getMonth()
      const entryDate = date.toLocaleDateString('en-GB')
      const todayDate = new Date().toLocaleDateString('en-GB')

      monthly[monthIndex] += entry.amount
      overallTotal += entry.amount
      if (entryDate === todayDate) {
        todayTotal += entry.amount
      }
    })

    settotal(overallTotal)
    settoday(todayTotal)
    setmonth(monthly[new Date().getMonth()])

    const chartData = monthly.map((amount, index) => ({
      name: new Date(0, index).toLocaleString('default', { month: 'short' }),
      revenue: amount
    }))
    setMonthlyRevenue(chartData)
  }, [data])

  return (
    <div className='container'>
      <div className='row text-center'>
        <div className='col-md-2 p-2 border m-2'>
          <h5>Total Revenue</h5>
          <p>{total}</p>
        </div>
        <div className='col-md-2 py-2 px-0 border m-2'>
          <h5>Monthly Revenue</h5>
          <p>{month}</p>
        </div>
        <div className='col-md-2 p-2 border m-2'>
          <h5>Today's Revenue</h5>
          <p>{today}</p>
        </div>
      </div>

      <div className='row mt-4'>
        {/* <div className='col-md-6'> */}
        <h5 className='text-center'>Monthly Revenue Chart</h5>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyRevenue} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        {/* </div> */}
      </div>
    </div>
  )
}

export default Revenue
