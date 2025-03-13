import React, { useEffect, useState } from 'react'
import axios from 'axios'


function Dashboard() {
  const[upcomingexam,setupcomingexam]=useState([])
  const [user, setuser] = useState(null)
  const [remark,setremark]=useState([])
  const [student,setstudent]=useState([])
  const[stud,setstudentfil]=useState([])
  const [installmentDetails,setinstallmentDetails]=useState([])
  const [payment,setpayment]=useState([])
    useEffect(() => {
        axios.get(`/api/getsession`, { withCredentials: true }).then(res => {
            setuser(res.data.data)
        }).catch(err => {
            console.log(err)
        })
        
    }, [])
  
  useEffect(()=>{
    if(!user) return;
    axios.get(`/api/remark/${user.id}`).then(res=>{
      setremark(res.data.data.data)
    }).catch(err=>{
      console.log(err)
    });
    axios.get(`/api/getStudentPayments`).then(res=>{
      const allStudents = res.data.data.data; 
      setstudent(allStudents); 
      setstudentfil(allStudents.filter((s) => s._id === user.id));
    }).catch(err=>{
      console.log(err)
    })
    axios.get(`/api/examstud/${user.id}`).then(res=>{
      const currentDate = new Date();
      const upcomingExams = res.data.data.exams.filter(exam => {
          const examDate = new Date(exam.date);
          return examDate >= currentDate; 
      });
      setupcomingexam(upcomingExams)
    }).catch(err=>{
      setupcomingexam([])
      console.log(err)
    })
  },[user]) 
  useEffect(()=>{
    if (!stud.length) return;
     setinstallmentDetails(stud[0].installmentDetails)
     setpayment(stud[0].payments)
  },[stud])
  useEffect(() => {
    let updatedInstallments = installmentDetails.map(installment => {
      const isPaid = payment.filter(payment => payment.id === installment._id);
      return {
          ...installment,
          status: isPaid ? "Paid" : "Pending" 
      };
  });
  
  if(updatedInstallments.length>0)
  {
  updatedInstallments = updatedInstallments.filter(installment => installment.status !== "Paid");
  setinstallmentDetails(updatedInstallments);
  }
}, [stud]);

  return (
    <section className='dashboard_wrap'>
      
        <div className="container-fluid">
        <div className="row">
          {
            remark.map((item,index)=>{
              return <div className="col-md-2 border border-2 rounded p-3 m-2" key={index+1}>
              <div className="progress_box">
                <h5>{item.status===0?"Monthly Remark":"Weekly Remark"}</h5>
                <span>{item.remark}-{new Date(item.date).toLocaleDateString('en-GB')}</span>
              </div>
            </div>               
            })
          }
          </div>
          <div className='row mt-2'> 
          <div className='col-md-6'>
          <h5>Upcoming Exam</h5>
            <table className='table table-hover mt-2' border={2}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Total Marks</th>
                </tr>
              </thead>
              <tbody>
                {
                  upcomingexam.map((item,i)=>{
                    return <tr key={i+1}>
                      <td>{i+1}</td>
                      <td>{item.name}</td>
                      <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
                      <td>{item.totalmarks}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>

          <div className='col-md-6'>
          <h5>Fee Installment</h5>
            <table className='table table table-hover mt-2' border={2}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
              
                {
                  payment.map((payment,i)=>{
                    return <tr key={payment._id}>
                    <td>{i+1}</td>
                    <td>{payment.amount}</td>
                    <td>{new Date(payment.createdAt).toLocaleDateString('en-GB')}</td>
                    <td>Paid</td>
                  </tr>
                  })
                }
                {
                  installmentDetails.map((item,i)=>{
                    return <tr key={i+1}>
                      <td>{i+1}</td>
                      <td>{item.amount}</td>
                      <td>{new Date(item.date).toLocaleDateString('en-GB')}</td>
                      <td>Pending</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        </div>
    </section>
  )
}

export default Dashboard