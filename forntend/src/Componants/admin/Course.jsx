import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from 'react-router'
function Course() {
    const navigate=useNavigate()
    const [course,setcourse]=useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
   const values={
    name:""
   }
    useEffect(()=>{
        axios.get('/api/course').then(res=>{
            setcourse(res.data.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    const handledelete=(id)=>{
        console.log(id)
        axios.delete(`/api/course/${id}`).then(res=>{
            alert(res.data.data.message)
            setcourse(course => course.filter(c => c._id !== id));
        }).catch(err=>{
            console.log(err)
        })
    }
    const handleEditClick = (course) => {
        setSelectedCourse(course);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCourse(null);
    }

    const handleupdate = (id) => {
        axios.put(`/api/course/${id}`, selectedCourse)
            .then(res => {
                alert(res.data.data.message || 'Updated successfully');
                setShowModal(false);
                window.location.reload()
            }).catch(err => {
                console.log(err);
            });
    };

    const handlechngeup = (e) => {
        const { name, value } = e.target;
        setSelectedCourse(prev => ({
            ...prev,
            [name]: value
        }));
    };
    return (
        <div className='container'>
            <div className='row'>
                <h4>All Course</h4>
            </div>
            <div className='row'>
                <NavLink to="/admin/addcourse">+NEW</NavLink>
            </div>
            <table className="table table-striped border mt-2">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        course.map((item,i)=>{
                            return <tr key={i+1}>
                            <th scope="row">{i+1}</th>
                            <td>{item.name}</td>
                            <td>
                                <NavLink onClick={() => handleEditClick(item)}><FaEdit className="edit_icon"  data-bs-toggle="tooltip" data-bs-placement="top" title="Edit"/></NavLink>
                                <NavLink onClick={()=>{handledelete(item._id)}}><MdDelete className="delete_icon"  data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" /> </NavLink>
                            </td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
            {showModal && selectedCourse && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Course</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="courseName" className="form-label">Course Name</label>
                                        <input type="text" className="form-control" name="name" defaultValue={selectedCourse.name} onChange={handlechngeup} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={()=>handleupdate(selectedCourse._id)}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Course