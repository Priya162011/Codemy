import React, { useEffect, useState } from 'react'
import axios from "axios"


function Attendace() {
  const [attendance, setattendance] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 7;
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
    axios.get(`/api/attendance?page=${currentPage}&limit=${limit}&userid=${userid}`)
      .then(res => {
        setattendance(res.data.data.data);
        setTotalPages(res.data.data.pagination.totalPages);
      })
      .catch(err => {
        console.log(err);
      });
  }, [currentPage, userid])

  return (
    <section className="attendace_report">
      <div className="container-fluid">
        <h3 className="main_title mt-2">Attendance Report</h3>
        <div className="table-responsive">

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Attendance</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {
                attendance.map((item, index) => {
                  const formatter = new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit", month: "2-digit", year: "numeric"
                  });
                  const formattedStartDate = formatter.format(new Date(item.startdate));
                  const formattedEndDate = item.enddate ? formatter.format(new Date(item.enddate)) : null;

                  return (
                    <tr key={index + 1}>
                      <td>{index + 1 + (currentPage - 1) * limit}</td>
                      <td>
                        {formattedEndDate && formattedStartDate !== formattedEndDate
                          ? `${formattedStartDate} - ${formattedEndDate}`
                          : formattedStartDate}
                      </td>
                      <td>
                        <span className="bg-success bg-gradient p-2 badge">
                          {item.status === 0 ? "A" : item.status === 1 ? "P" : "L"}
                        </span>
                      </td>
                      <td>{item.status === 2 ? item.remark : item.status === 0 ? !item.remark ? "No Reason provided" : item.remark : ""}</td>
                    </tr>
                  );
                })
              }

            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a className="page-link">Previous</a>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>

    </section>
  )
}

export default Attendace