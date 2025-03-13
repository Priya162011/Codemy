import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Revenue() {
    const[total,settotal]=useState(0)
    const[month,setmonth]=useState(0)
    const[today,settoday]=useState(0)
    const[data,setdata]=useState([])
    useEffect(()=>{
        axios.get('/api/payment').then(res=>{
            setdata(res.data.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    useEffect(()=>{
        const todaydata=data.filter((s)=>{return new Date(s.createdAt).toLocaleDateString('en-GB') === new Date().toLocaleDateString('en-GB')})
        let count=0;
        todaydata.forEach(element => {
            count+=element.amount
        });
        settoday(count)

        count=0
        data.forEach(element=>{
            count+=element.amount
        })
        settotal(count)

        count=0
        const monthdata=data.filter((s)=>{return new Date(s.createdAt).getMonth() === new Date().getMonth()})
        monthdata.forEach(element=>{
            count+=element.amount
        })
        setmonth(count)
    },[data])
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-2 p-2 border m-2'>
                <h5>Total Revenue</h5>
                <p>{total}</p>
            </div>
            <div className='col-md-2 p-2 border m-2'>
                <h5>Monthly Revenue</h5>
                <p>{month}</p>
            </div>
            <div className='col-md-2 p-2 border m-2'>
                <h5>Today's Revenue</h5>
                <p>{today}</p>
            </div>
        </div>
    </div>
  )
}

export default Revenue