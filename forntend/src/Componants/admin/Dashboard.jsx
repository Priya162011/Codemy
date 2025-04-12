import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PieChart, Pie, Cell, BarChart, CartesianGrid, XAxis, YAxis, Bar, Legend, Tooltip, ResponsiveContainer } from 'recharts'

function Dashboard() {
  const [student, setstudent] = useState([])
  const [data, setdata] = useState([])
  const[total,settotal]=useState(0)
  const [totalstud, settotalstud] = useState(0)
  const [notjoinstud, setnotjoinstud] = useState(0)
  const [dropedstud, setdropedstud] = useState(0)
  const [completedstud, setcompletedstud] = useState(0)
  const [runningstud, setrunningstud] = useState(0)
  const [jobstud, setjobstud] = useState(0)
  const [faculty, setfaculty] = useState([])
  const [totalfaculty, settotalfaculty] = useState(0)
  const [todayadmission, settodayadmission] = useState([])
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
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
    axios.get('/api/payment').then(res => {
      setdata(res.data.data.data)
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
    let paid = 0;
    let pending = 0;
    let total = 0;
    student.forEach(s => {
      total += s.totalfees
    });
    data.forEach(d => {
      paid += d.amount
    });
    pending = total - paid
    settotal(total)
    setTotalPaid(paid);
    setTotalPending(pending);
  }, [student, faculty])

  const chartData = [
    { name: 'Running', value: runningstud },
    { name: 'Dropped', value: dropedstud },
    { name: 'Completed', value: completedstud },
    { name: 'Not Joined', value: notjoinstud },
    { name: 'In Job', value: jobstud }
  ]

  const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#A28EFF']

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
        <div className='col-md-2 border p-3 m-1 bg-secondary text-light'>
          <h6>Total Amount</h6>
          <strong>{total}</strong>
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
              todayadmission.map((item, i) => {
                return <tr key={i + 1}>
                  <td>{i + 1}</td>
                  <td><img src={`/uploads/${item.image}`} width={100} height={100} /></td>
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
                  <td><table><tbody>{item.installmentDetails.map((item, i) => {
                    return <tr key={i + 1}><td>₹{item.amount}-{new Date(item.date).toLocaleDateString('en-GB')}</td></tr>
                  })}</tbody></table></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
      <div className='row m-1'>
        <div className='col-md-6 mt-2'>
          <h5 className='text-center'>Student Status Distribution</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='col-md-6 mt-2'>
          <h5 className='text-center'>Paid vs Pending Amount</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Paid', value: totalPaid },
                  { name: 'Pending', value: totalPending }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                <Cell fill="#4CAF50" /> 
                <Cell fill="#F44336" /> 
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard