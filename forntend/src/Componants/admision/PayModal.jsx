import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { addPayment } from '../Slices/PaymentSlice';
import Receipt from './Receipt';

function PayModal(props) {
  const id = props.selectedid;
  const installmentDetails = props.installmentDetails;
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  const { values, handleChange, handleSubmit } = useFormik({
    enableReinitialize: true,
    initialValues: {
      student: id,
      amount: installmentDetails?.amount,
      type: '0',
      date: installmentDetails?.date,
      id: installmentDetails?._id,
      status: 0,
      name: installmentDetails?.name,
      enrno:installmentDetails?.enrno,
      course: installmentDetails?.course
    },
    onSubmit: (values) => {
      setData(values);
      dispatch(addPayment(values));
    }
  });

  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5">Pay Installment</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form method="post" onSubmit={handleSubmit}>
            <input type="text" name="id" className="form-control" hidden value={values.id} onChange={handleChange} />
            <input type="text" name="student" className="form-control" hidden value={values.student} onChange={handleChange} />
            
            <label className="form-label mt-3">Student</label>
            <input type="text" className="form-control" placeholder="Enter name" value={values.name} disabled />
            
            <label className="form-label mt-3">Amount</label>
            <input type="text" name="amount" className="form-control" placeholder="Enter amount" onChange={handleChange} value={values.amount} />
            
            <label className="form-label mt-3">Select Payment Type</label>
            <select name="type" className="form-select" onChange={handleChange} value={values.type}>
              <option value="0">Select payment Type</option>
              <option value="1">Cash</option>
              <option value="2">UPI</option>
              <option value="3">Check</option>
            </select>
            
            <button type="submit" className="btn btn-dark mt-2">
              Pay
            </button>
          </form>

         
          {data && (
            <div className="modal fade show d-block" tabIndex="-1">
              <Receipt studentData={data} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PayModal;
