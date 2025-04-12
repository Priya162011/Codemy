import React, { useEffect, useState } from "react";
import axios from "axios";

function Report() {
  const [syllabus, setSyllabus] = useState([]);
  const [completeTopics, setCompleteTopics] = useState([]);
  const [pendingTopics, setPendingTopics] = useState([]);
  const [runningTopics, setRunningTopics] = useState([]);
  const [user, setuser] = useState(null)

  useEffect(() => {
    axios.get(`/api/getsession`, { withCredentials: true }).then(res => {
      setuser(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    if (!user || !user.course) return;
    axios
      .get(`/api/topic/${user.course}`)
      .then((res) => {
        setSyllabus(res.data.data.data);
      })
      .catch((err) => console.log(err));

  }, [user]);

  useEffect(() => {
    if (!user || !user.id) return;
    axios
      .get(`/api/student_topic/${user.id}`)
      .then((res) => {
        const studentTopics = res.data.data.data;
        const completed = studentTopics.filter((topic) => topic.status === 1);
        const running = studentTopics.filter((topic) => topic.status === 0);
        const completedIds = completed.map((topic) => topic.name._id);
        const runningIds = running.map((topic) => topic.name._id);

        const pending = syllabus.filter(
          (topic) => !completedIds.includes(topic._id) && !runningIds.includes(topic._id)
        );
        setCompleteTopics(completed);
        setRunningTopics(running);
        setPendingTopics(pending);
      })
      .catch((err) => console.log(err));
  }, [syllabus, user])
  return (
    <section className="progress_report">
      <div className="container">
        <h3 className="main_title mt-2">Course Progress</h3>
        <div className="row mb-2">
          <div className="col-md-3 mb-2">
            <div className="card shadow-sm">
              <div className="card-header bg-warning">
                <h5>Syllabus</h5>
              </div>
              <ul className="list-group list-group-flush">
                {syllabus.map((item, i) => (
                  <li className="list-group-item" key={i}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-3 mb-2">
            <div className="card shadow-sm">
              <div className="card-header bg-success">
                <h5>Completed Topics</h5>
              </div>
              <ul className="list-group list-group-flush">
                {completeTopics.map((item, i) => (
                  <li className="list-group-item" key={i}>{item.name.name}</li>
                ))}
              </ul>
            </div>
          </div>

          
          <div className="col-md-3 mb-2">
            <div className="card shadow-sm">
              <div className="card-header bg-primary">
                <h5>Running Topics</h5>
              </div>
              <ul className="list-group list-group-flush">
                {runningTopics.map((item, i) => (
                  <li className="list-group-item" key={i}>{item.name.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-md-3 mb-2">
            <div className="card shadow-sm">
              <div className="card-header bg-danger">
                <h5>Pending Topics</h5>
              </div>
              <ul className="list-group list-group-flush">
                {pendingTopics.map((item, i) => (
                  <li className="list-group-item" key={i}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Report;
