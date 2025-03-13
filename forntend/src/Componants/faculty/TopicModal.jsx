import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addtopic } from '../Slices/TopicSlice';
import axios from 'axios'
function TopicModal(props) {
    const { selectedid } = props; 
    const dispatch = useDispatch();
    const[topic,settopic]=useState([])
    useEffect(()=>{
        axios.get('/api/topic').then(res=>{
            settopic(res.data.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
        enableReinitialize: true,
        initialValues: {
            student:selectedid,
            status:0,
            name:''
        },
        onSubmit: (values) => {
            dispatch(addtopic(values))
        }
    });

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">Student Details</h1>
                    <button 
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Close">
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <label className="form-label mt-3">
                            Add Topics
                        </label><br/>
                        <select name='name' value={values.name} className='form-control' onChange={handleChange} required>
                            <option value=''>Select Topic</option>
                            {
                                topic.map((item,i)=>{
                                    return <option value={item._id} key={i+1}>{item.name}</option>
                                })
                            }
                        </select>
                        <br></br>
                        <label className="form-label mt-3">
                            Select Status
                        </label><br/>
                        <select name='status' value={values.status} className='form-control' onChange={handleChange}>
                            <option value="0">Running</option>
                            <option value="1">Completed</option>
                        </select>

                        <button type="submit" className="btn_wrap mt-3 w-100">
                            Submit
                        </button>

                        <hr />

                       
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TopicModal;
