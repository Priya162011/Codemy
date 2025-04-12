import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Payment() {
    const [payment,setpayment]=useState([])
    useEffect(()=>{
        axios.get('/api/payment').then(res=>{
            setpayment(res.data.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    return (
        <div className='container'>
            <div className='row m-1 text-decoration-underline'>
                <h3>All payment</h3>
            </div>
            <div className='table-responsive'>
            <table className="table  table-striped border mt-2">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student Name</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        payment.map((item,i)=>{
                            return <tr key={i+1}>
                            <th scope="row">{i+1}</th>
                            <td>{item.student.name}</td>
                            <td>{item.amount}</td>
                            <td>{new Date(item.createdAt).toLocaleDateString('en-GB')}</td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Payment