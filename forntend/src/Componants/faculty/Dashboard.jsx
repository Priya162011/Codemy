import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

function Dashboard() {
  const [user, setuser] = useState(null)
  const [students, setStudents] = useState([]);
  const [notfilstud, setNotfilstud] = useState([]);
  const [total, setTotal] = useState(0);
  const [runningCount, setRunningCount] = useState(0);
  const [notJoinedCount, setNotJoinedCount] = useState(0);
  const [droppedCount, setDroppedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const[injobCount,setinjobCount]=useState(0);
  useEffect(() => {
    setTotal(notfilstud.filter((s) => s.faculty._id === user.id).length);
    setRunningCount(notfilstud.filter((s) => s.status === 0 && s.faculty._id === user.id).length);
    setNotJoinedCount(notfilstud.filter((s) => s.status === 1 && s.faculty._id === user.id).length);
    setDroppedCount(notfilstud.filter((s) => s.status === 2 && s.faculty._id === user.id).length);
    setCompletedCount(notfilstud.filter((s) => s.status === 3 && s.faculty._id === user.id).length);
    setinjobCount(notfilstud.filter((s)=>s.status===4 && s.faculty._id === user.id).length);
  }, [notfilstud]);


  useEffect(() => {
    axios.get(`/api/getsession`, { withCredentials: true }).then(res => {
      setuser(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  useEffect(() => {
    if (!user) {
      return;
    }

    const facultyId = user.id;
    if (!facultyId) {
      console.error("Faculty ID not found");
      return;
    }
    axios.get(`/api/student`)
      .then(res => {
        const fetchedStudents = res.data.data.data;
        setNotfilstud(fetchedStudents);
        const facultyStudents = fetchedStudents.filter(student =>
          student.faculty?._id === facultyId && student.status === 1
        );
        setStudents(facultyStudents);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
      });
    const socket = io("http://localhost:5000");
    socket.emit("registerFaculty", facultyId);
    socket.on("leave-notification", (data) => {
      setTimeout(() => {
        alert(`📢 Notification: ${data.message}`);
      }, 100);
    });
    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <section className='Faculty_dashboard_wrap'>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-md-2 col">
            <div className="box_wrap">
              <h6>Total Students</h6>
              <h3>{total}</h3>
            </div>
          </div>
          <div className="col-md-2 col">
            <div className="box_wrap running_wrap">
              <h6>Running Students</h6>
              <h3>{runningCount}</h3>
            </div>
          </div>
          <div className="col-md-2 col">
            <div className="box_wrap drop_wrap">
              <h6>Dropped Students</h6>
              <h3>{droppedCount}</h3>
            </div>
          </div>
          <div className="col-md-2 col">
            <div className="box_wrap complete_wrap">
              <h6>Completed Students</h6>
              <h3>{completedCount}</h3>
            </div>
          </div>
          <div className="col-md-2 col">
            <div className="box_wrap not_join_wrap">
              <h6>Not Joined Students</h6>
              <h3>{notJoinedCount}</h3>
            </div>
          </div>
          <div className="col-md-2 col">
            <div className="box_wrap in_job_wrap">
              <h6>In-Job Students</h6>
              <h3>{injobCount}</h3>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className='d-flex justify-content-between'>
              <h4 className='mb-3'>Upcoming Joining Students</h4>
              <div className='filter_wrap'></div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Student Name</th>
                    <th>Student Photo</th>
                    <th>Batch Time</th>
                    <th>Course Name</th>
                    <th>Status</th>
                    <th>Joining Date</th>
                    <th>Student Profession</th>
                    <th>Faculty Name</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td><img src={`http://localhost:5000/uploads/${item.image}`} alt="" /></td>
                      <td>{item.batch}</td>
                      <td>{item.course.name}</td>
                      <td>
                        {item.status === 0 ? 'Running' :
                          item.status === 1 ? 'Not Joined' :
                            item.status === 2 ? 'Dropped' :
                              'Completed'}
                      </td>
                      <td>{new Date(item.joindate).toLocaleDateString("en-GB")}</td>
                      <td>{item.profile}</td>
                      <td>{item.faculty.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
