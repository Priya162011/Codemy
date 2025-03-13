import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Marks() {
  const [marks, setmarks] = useState([])
  const [userid, setuserid] = useState(null)

  useEffect(() => {
    axios.get(`/api/getsession`, { withCredentials: true }).then(res => {
      setuserid(res.data.data.id)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  useEffect(() => {
    if (!userid) return;
    axios.get(`/api/marks?userid=${userid}`).then(res => {
      setmarks(res.data.data.data)
    }).catch(err => {
      console.log(err)
    })
  }, [userid])
  return (
    <section className="Marks_report">
      <div className="container-fluid">
        <h3 className="main_title">Exam Report</h3>
        <table className="table table-bordered">
          <thead>
            <tr className="bg-light">
              <th>No</th>
              <th>Exam Date</th>
              <th>Exam Topics</th>
              <th>Total Marks</th>
              <th>Obtain marks</th>
              <th>Faculty Name</th>
            </tr>
          </thead>
          <tbody>
            {
              marks.map((item, index) => {
                const formatter = new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit", month: "2-digit", year: "numeric"
                });
                return <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{formatter.format(new Date(item.exam.date))}</td>
                  <td>{item.exam.name}</td>
                  <td>{item.exam.totalmarks}</td>
                  <td>{item.marks}</td>
                  <td> <span className="bg-success bg-gradient p-2 badge">{item.exam.faculty.name}</span> </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Marks