import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdOutlineClear } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import axios from "axios"
import EditModal from "../admision/EditModal";
import PayModal from "./PayModal";
import { useFormik } from "formik";

function Students_data() {
    const [students, setstudents] = useState([]);
    const [selectedid, setSelectedStudentId] = useState(null);
    const [selectedinstallment, setSelectedinstallment] = useState(null);
    const [filterstud, setfilterstud] = useState([]);
    const [searchdate, setsearchdate] = useState(null);
    const [searchname, setsearchname] = useState(null);

    useEffect(() => {
        axios.get('/api/getStudentPayments')
            .then(res => {
                setstudents(res.data.data.data);
                setfilterstud(res.data.data.data);
            })
            .catch(err => console.log(err));
    }, []);

    const { values, handleChange, handleSubmit } = useFormik({
        enableReinitialize: true,
        initialValues: {
            date: '',
            name: ''
        },
        onSubmit: (values) => {
            setsearchdate(values.date);
            setsearchname(values.name)
        }
    });

    useEffect(() => {
        if (!searchdate) return;

        const formattedDate = new Date(searchdate).getMonth();
        const filtered = students.filter(s =>
            s.installmentDetails.length > 0 &&
            new Date(s.installmentDetails[0].date).getMonth() == formattedDate
        );
        setfilterstud(filtered);
    }, [searchdate, students]);
    useEffect(() => {
        if (!searchname) return;
        const filtered = students.filter(s =>
            s.name == searchname
        );
        setfilterstud(filtered);
    }, [searchname, students]);

    const handleclear = () => {
        setfilterstud(students)
        values.name = ''
        values.date = ''
    }

    return (
        <>
            <section className="students_data_wrap">
                <div className="mt-2 mb-2 container-fluid">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-3 col-sm-4 mt-1">
                                <input type="date" name="date" className="form-control" onChange={handleChange} value={values.date} />
                            </div>
                            <div className="col-md-3 col-sm-4 mt-1">
                                <input type="text" name="name" placeholder="Enter Name" className="form-control" onChange={handleChange} value={values.name} />
                            </div>
                            <div className="col-md-2 mt-1">
                                <button type="submit" className="btn btn-secondary">
                                    <IoMdSearch />Search
                                </button>
                                </div>
                            <div className="col-md-2 mt-1">
                                <button className="btn btn-secondary" onClick={() => handleclear()}><MdOutlineClear />Clear</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Roll No</th>
                                <th>Course Name</th>
                                <th>Student Name</th>
                                <th>Student Photo</th>
                                <th>Batch Time</th>
                                <th>Status</th>
                                <th>Joining Date</th>
                                <th>Student mobile no</th>
                                <th>Student Proffesion</th>
                                <th>Parent Name</th>
                                <th>Parent mobile no</th>
                                <th>Parent Proffesion</th>
                                <th>Reference</th>
                                <th>Total Fees Amount</th>
                                <th className="custom-width">Paid Amount</th>
                                <th>Pending Amount</th>
                                <th>Payable Amount</th>
                                <th>Address</th>
                                {/* <th>Payment Type</th> */}
                                {/* <th>Student password</th> */}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterstud.map((item, index) => {
                                let amt = 0;
                                return <tr key={index + 1}>
                                    <td>{item.enrno}</td>
                                    <td>{item.courseDetails.name}</td>
                                    <td>{item.name}</td>
                                    <td><img src={`/uploads/${item.image}`} className="img-responsive" height="100px" width="100px" /></td>
                                    <td>{item.batch}</td>
                                    <td>{item.status == 0 ? 'Running' : item.status == 1 ? 'Not join' : item.status == 2 ? 'Droped' : 'Completed'}</td>
                                    <td>{new Date(item.joindate).toLocaleDateString("en-GB")}</td>
                                    <td>{item.contactno}</td>
                                    <td>{item.profile}</td>
                                    <td>{item.parentname}</td>
                                    <td>{item.parentcontactno}</td>
                                    <td>{item.parentprofile}</td>
                                    <td>{item.ref}</td>
                                    <td>₹{item.totalfees}</td>
                                    <td><ul>{item.payments.map((v, i) => {
                                        amt = parseInt(amt) + parseInt(v.amount)
                                        return <li key={i+1}>₹{v.amount}-{new Date(v.createdAt).toLocaleDateString('en-GB')}-{v.type === "1" ? 'Cash' : v.type === "2" ? 'UPI' : 'Check'}</li>

                                    })}</ul></td>
                                    <td>₹{item.totalfees - amt}</td>
                                    <td>
                                        {
                                            item.payments.map((v, i) => {
                                                return !v.id && v.status == 1 ?
                                                    <table key={i + 1}>
                                                        <tbody>
                                                            <tr className="mb-2">
                                                                <td className="mr-2">₹{v.amount}-{new Date().toLocaleDateString("en-GB")}</td>
                                                                <td>{<button className="btn btn-success btn-sm m-1" onClick={() => {
                                                                    setSelectedStudentId(item._id);
                                                                    setSelectedinstallment({ date: v.date, amount: v.amount, _id: v._id, name: item.name, course: item.courseDetails.name, enrno: item.enrno })
                                                                }} data-bs-toggle="modal" data-bs-target="#paymodal">Pay</button>}</td>
                                                                <td className="fs-6">(Registrationfee)</td>
                                                            </tr>
                                                        </tbody>
                                                    </table> : ''
                                            })}
                                        {
                                            item.installmentDetails.map((v, i) => {
                                                return <table key={i + 1}>
                                                    <tbody>
                                                        <tr className="mb-2">
                                                            <td className="mr-2">₹{v.amount}-{new Date(v.date).toLocaleDateString("en-GB")}</td>
                                                            <td>{item.status === 0 ? <button className="btn btn-success btn-sm m-1" onClick={() => {
                                                                setSelectedStudentId(item._id);
                                                                setSelectedinstallment({ date: v.date, amount: v.amount, _id: v._id, name: item.name, course: item.courseDetails.name, enrno: item.enrno })
                                                            }} data-bs-toggle="modal" data-bs-target="#paymodal">Pay</button> : ''}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            })
                                        }
                                    </td>
                                    <td>{item.address}</td>
                                    {/* <td>{item.payments.type == 1 ? 'Cash' : item.payments.type == 2 ? 'UPI' : 'Check'}</td> */}
                                    {/* <td>{item.password}</td> */}
                                    <td>
                                        {/* <li onClick={() => setSelectedStudentId(item._id)} key="1">
                                <MdDelete className="delete_icon" /> 
                                </li> */}
                                        <a onClick={() => setSelectedStudentId(item._id)} key="2" data-bs-toggle="modal" data-bs-target="#editmodal">
                                            <FaEdit className="edit_icon" />
                                        </a>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>

            </section >

            <div className="modal modal-lg fade" id="editmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <EditModal selectedid={selectedid} />
            </div>
            <div className="modal fade" id="paymodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <PayModal selectedid={selectedid} installmentDetails={selectedinstallment} />
            </div>
        </>
    );
}

export default Students_data;
