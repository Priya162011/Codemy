import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMarks } from '../Slices/MarksSlice';
import { MarksSchema } from '../schema';

function MarksModal(props) {
  const dispatch = useDispatch();
  const [exam, setExam] = useState([]);

  useEffect(() => {
    if (props.selectedid) {
      console.log(props.selectedid)
      axios.get(`/api/examstud/${props.selectedid}`)
        .then(res => {
          setExam(res.data.data.exams);
        })
        .catch(err => {
          setExam([])
          console.error("Error fetching exams:", err);
        });
    }
  }, [props.selectedid]);

  const { setValues, values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: {
      exam: '',
      marks: '',
      student: props.selectedid || '',
      status: 1
    },
    enableReinitialize: true,
    validationSchema: MarksSchema,
    onSubmit: (values) => {
      alert("submit")
      dispatch(addMarks(values))
    }
  });

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Student Marks
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <label htmlFor="marks" className="form-label mt-3">
              Obtain Marks
            </label>
            <input
              type="number"
              name="marks"
              className="form-control"
              placeholder="Enter Obtain Marks"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.marks}
            />
            {touched.marks && errors.marks ? (
              <div className="text-danger">{errors.marks}</div>
            ) : null}

            <label htmlFor="exam" className="form-label mt-3">
              Select Exam Name
            </label>
            <select
              name="exam"
              className="form-select"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.exam}
            >
              <option value="">Select Exam</option>
              {exam?.length > 0 ? (
                exam.map((item, index) => (
                  new Date(item.date).toLocaleDateString() < new Date().toLocaleDateString() ?
                    <option key={index} value={item._id}>
                      {item.name}-{item.totalmarks}
                    </option> : ''
                ))
              ) : (
                <option disabled>Loading exams...</option>
              )}
            </select>
            {touched.exam && errors.exam ? (
              <div className="text-danger">{errors.exam}</div>
            ) : null}

            <input type="submit" className="btn_wrap mt-3 w-100" value="Submit" />

          </form>
        </div>
      </div>
    </div>
  );
}

export default MarksModal;
