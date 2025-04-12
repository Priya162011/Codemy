import React, { useEffect, useState } from "react";
import { IoEyeSharp, IoTime } from "react-icons/io5";
import { FaRegEdit, FaBookOpen } from "react-icons/fa";
import axios from "axios";
import AttendanceModal from "./AttendanceModal";
import MarksModal from "./MarksModal";
import EditModal from "./EditModal";
import TopicModal from "./TopicModal";
import ViewDetailModal from "./ViewDetailModal";
import RemarkModal from "./RemarkModal";
import { useFormik } from "formik";

function Students_data() {
  const [students, setstudents] = useState([])
  const [topics, setTopics] = useState({});
  const [selectedid, setSelectedStudentId] = useState(null)
  const [user, setuser] = useState(null)
  const [id, setid] = useState(null)

  const [filterstudent, setfilterstudent] = useState([])
  const [name, setname] = useState('')
  const [batch, setbatch] = useState('')
  const [status, setstatus] = useState(5)

  useEffect(() => {
    axios.get(`/api/getsession`, { withCredentials: true }).then(res => {
      setuser(res.data.data)
      setid(res.data.data.id)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  useEffect(() => {
    axios.get(`/api/student/${id}`).then(res => {
      setstudents(res.data.data.data)
      setfilterstudent(res.data.data.data)
    }).catch(err => {
      console.log(err)
    })
  }, [user])
  useEffect(() => {
    const fetchTopics = async () => {
      let topicsData = {};
      for (const student of students) {
        const courseId = student.course._id;
        if (!topicsData[courseId]) {
          try {
            const res = await axios.get(`/api/topic/${courseId}`);
            topicsData[courseId] = res.data.data.data;
          } catch (err) {
            console.log(err);
            topicsData[courseId] = [];
          }
        }
      }
      setTopics(topicsData);
    };

    if (students.length > 0) {
      fetchTopics();
    }
  }, [students]);

  const { values, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      status: 5,
      batch: ''
    },
    onSubmit: (values) => {
      setname(values.name)
      setstatus(values.status)
      setbatch(values.batch)
    }
  })

  useEffect(() => {
    const filter = students.filter((s) => s.name === name)
    setfilterstudent(filter)
  }, [name])

  useEffect(() => {
    const filter = students.filter((s) => s.status === Number(status))
    setfilterstudent(filter)
  }, [status])

  useEffect(() => {
    const filter = students.filter((s) => s.batch === batch)
    setfilterstudent(filter)
  }, [batch])

  const handleclear = () => {
    values.name = ''
    values.status = 5
    values.batch = ''
    setfilterstudent(students)
  }
  return (
    <section className="student_data_wrap">
      <div className="container-fluid">
        <h4 className="mb-3">All Students</h4>
        <form method="post" onSubmit={handleSubmit}>
          <div className="mb-2 row">

            <div className="col-md-2">
              <input type="text" name="name" placeholder="Enter Name" value={values.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="col-md-2">
              <select className="form-select" name="status" value={values.status} onChange={handleChange}>
                <option value={5}>Select Status</option>
                <option value={1}>Not Join</option>
                <option value={0}>Running</option>
                <option value={2}>Droped</option>
                <option value={3}>Completed</option>
                <option value={4}>In Job</option>

              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select" name="batch" value={values.batch} onChange={handleChange}>
                <option value=''>Select batch</option>
                <option value='8to10'>8to10</option>
                <option value='10to12'>10to12</option>
                <option value='12to2'>12to2</option>
                <option value='2to4'>2to4</option>

              </select>
            </div>
            <div className="col-md-1">
              <button type="submit" className="btn btn-secondary mb-2 w-100" >Search </button>
            </div>
            <div className="col-md-1">
              <button className="btn btn-secondary w-100" onClick={handleclear}>Clear</button>
            </div>

          </div>
        </form>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Student Photo</th>
                <th>Batch Time</th>
                <th>Course Name</th>
                <th>Topics Covers</th>
                <th>Status</th>
                <th>Joining Date</th>
                <th>Student mobile no</th>
                <th>Student Proffesion</th>
                <th>Parent Name</th>
                <th>Parent mobile no</th>
                <th>Parent Proffesion</th>
                {/* <th>Student password</th> */}
                <th>Faculty Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                filterstudent.map((item, index) => {
                  return <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <img
                        src={`https://api.codemy.live/uploads/${item.image}`}
                        className="student_img"
                        height={100}
                        width={100}
                      />
                    </td>
                    <td>{item.batch}</td>
                    <td>{item.course.name}</td>
                    <td>{topics[item.course._id]?.length > 0 ? (
                      <ul>
                        {topics[item.course._id].map((topic, i) => (
                          <li key={i}>{topic.name}</li>
                        ))}
                      </ul>
                    ) : (
                      "No Topics Found"
                    )}</td>
                    <td>{item.status == 0 ? 'Running' : item.status == 1 ? 'Not Join' : item.status == 2 ? 'Droped' : item.status == 3 ? 'Completed':'In Job'}</td>
                    <td>{new Date(item.joindate).toLocaleDateString('en-GB')}</td>
                    <td>{item.contactno}</td>
                    <td>{item.profile}</td>
                    <td>{item.parentname}</td>
                    <td>{item.parentcontactno}</td>
                    <td>{item.parentprofile}</td>

                    {/* <td>{item.password}</td> */}
                    <td>{item.faculty.name}</td>
                    <td>
                      <ul className="actions_wrap">
                        <li onClick={() => setSelectedStudentId(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal4">
                          <IoEyeSharp /> View Detail
                        </li>
                        <li onClick={() => setSelectedStudentId(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal2">
                          <FaRegEdit /> Edit Detail
                        </li>
                        {
                          item.status == 0 ? <><li onClick={() => setSelectedStudentId(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <IoTime /> Attendance
                          </li>
                            <li onClick={() => setSelectedStudentId(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal1">
                              <FaBookOpen /> Exam
                            </li>
                            <li onClick={() => setSelectedStudentId(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal3">
                              <FaRegEdit /> Topic
                            </li>
                            <li onClick={() => setSelectedStudentId(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal5">
                              <FaRegEdit /> Remark
                            </li></> : ''
                        }

                      </ul>
                    </td>
                  </tr>
                })
              }

            </tbody>
          </table>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <AttendanceModal selectedid={selectedid} />
      </div>
      <div
        className="modal fade"
        id="exampleModal1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <MarksModal selectedid={selectedid} />
      </div>
      <div
        className="modal fade"
        id="exampleModal2"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <EditModal selectedid={selectedid} />
      </div>
      <div
        className="modal fade"
        id="exampleModal3"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <TopicModal selectedid={selectedid} />
      </div>
      <div
        className="modal fade"
        id="exampleModal4"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <ViewDetailModal selectedid={selectedid} />
      </div>
      <div
        className="modal fade"
        id="exampleModal5"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <RemarkModal selectedid={selectedid} />
      </div>
    </section>
  );
}

export default Students_data;

