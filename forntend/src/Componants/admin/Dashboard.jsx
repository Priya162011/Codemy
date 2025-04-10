import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Dashboard() {
  const [student, setstudent] = useState([])
  const [totalstud, settotalstud] = useState(0)
  const [notjoinstud, setnotjoinstud] = useState(0)
  const [dropedstud, setdropedstud] = useState(0)
  const [completedstud, setcompletedstud] = useState(0)
  const [runningstud, setrunningstud] = useState(0)
  const [jobstud, setjobstud] = useState(0)
  const [faculty, setfaculty] = useState([])
  const [totalfaculty, settotalfaculty] = useState(0)
  const [todayadmission, settodayadmission] = useState([])
  useEffect(() => {
    axios.get('/api/student').then(res => {
      setstudent(res.data.data.data)
    }).catch(err => {
      console.log(err)
    })
    axios.get('/api/faculty').then(res => {
      setfaculty(res.data.data.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    const admission = student.filter((s) => new Date(s.createdAt).toLocaleDateString('en-GB') === new Date().toLocaleDateString('en-GB'))
    settodayadmission(admission)
    settotalstud(student.length)
    settotalfaculty(faculty.length)
    const notjoin = student.filter((s) => s.status == 1)
    setnotjoinstud(notjoin.length)
    const completed = student.filter((s) => s.status == 3)
    setcompletedstud(completed.length)
    const droped = student.filter((s) => s.status == 2)
    setdropedstud(droped.length)
    const job = student.filter((s) => s.status == 4)
    setjobstud(job.length)
    const running = student.filter((s) => s.status == 0)
    setrunningstud(running.length)
  }, [student, faculty])
  return (
    <div className='container-fuild'>
      <div className='row m-1'>
        <div className='col-md-2 border p-3 m-1 bg-secondary text-light'>
          <h6>Total Student</h6>
          <strong>{totalstud}</strong>
        </div>
        <div className='col-md-2 border p-3 m-1 bg-secondary text-light'>
          <h6>Running Student</h6>
          <strong>{runningstud}</strong>
        </div>
        <div className='col-md-2 border p-3 m-1 bg-secondary text-light'>
          <h6>Droped Student</h6>
          <strong>{dropedstud}</strong>
        </div>
        <div className='col-md-2 border p-3 m-1 bg-secondary text-light'>
          <h6>Completed Student</h6>
          <strong>{completedstud}</strong>
        </div>
        <div className='col-md-2 border p-3 m-1 bg-secondary text-light'>
          <h6>Not Jioned Student</h6>
          <strong>{notjoinstud}</strong>
        </div>
        <div className='col-md-2 border p-3 m-1 bg-secondary text-light'>
          <h6>In Job Student</h6>
          <strong>{jobstud}</strong>
        </div>
        <div className='col-md-2 border p-3 m-1 bg-secondary text-light'>
          <h6>Total Faculty</h6>
          <strong>{totalfaculty}</strong>
        </div>
      </div>
      <div className='row m-1 mt-4'>
        <h4 className='text-uppercase text-decoration-underline'>Today's Admission</h4>
      </div>
      <div className='row m-1 table-responsive'>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact No.</th>
              <th scope="col">Address</th>
              <th scope="col">Profile</th>
              <th scope="col">Parent Name</th>
              <th scope="col">Parent Contactno</th>
              <th scope="col">Parent Profile</th>
              <th scope="col">Course</th>
              <th scope="col">Batch</th>
              <th scope="col">Reference</th>
              <th scope='col'>Faculty</th>
              <th scope='col'>Payable Amount</th>
            </tr>
          </thead>
          <tbody>
          {
                        todayadmission.map((item,i)=>{
                            return <tr key={i+1}>
                            <td>{i+1}</td>
                            <td><img src={`/uploads/${item.image}`} width={100} height={100}/></td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.contactno}</td>
                            <td>{item.address}</td>
                            <td>{item.profile}</td>
                            <td>{item.parentname}</td>
                            <td>{item.parentcontactno}</td>
                            <td>{item.parentprofile}</td>
                            <td>{item.course.name}</td>
                            <td>{item.batch}</td>
                            <td>{item.ref}</td>
                            <td>{item.faculty.name}</td>
                            <td>{item.installmentDetails.map((item,i)=>{
                                    return <tr key={i+1}>₹{item.amount}-{new Date(item.date).toLocaleDateString('en-GB')}</tr>
                            })}</td>
                        </tr>
                        })
                    }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard