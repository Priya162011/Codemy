import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import logo from "D:/codemy/forntend/src/assets/logo.jpg"
import axios from 'axios';

const Receipt = forwardRef(({ studentData },ref) => {
    const[no,setno]=useState(0)
    console.log(studentData)
    useEffect(()=>{
        axios.get('/api/getcount').then(res=>{
            setno(res.data.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    const receiptRef = useRef();
    const navigate=useNavigate()
    const handleDownloadPDF = async () => {
        const element = receiptRef.current;
        const canvas = await html2canvas(element,{scale:2});
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 190; 
        const imgHeight = (canvas.height * imgWidth) / canvas.width; 
        pdf.setFontSize(10)
        pdf.addImage(imgData, "PNG", 8, 8, imgWidth, imgHeight);
        pdf.save(`receipt_${studentData?.name}.pdf`);
        alert("pdf downloaded");
                navigate("/admision/");
                window.location.reload()
        
    };
    return (
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div ref={receiptRef} className="receipt">
                    <div className='mb-2 text-center'>
                    <img src={logo} height="50px" width="100px"/>
                    </div>
                    <div className='mb-2 text-center'>
                    <h5>Payment Receipt</h5>
                    </div>
                    <div className='mb-2 text-right'>
                        <small>Date:{new Date().toLocaleDateString('en-GB')}-{new Date().toLocaleTimeString()}</small>
                    </div>
                    <div className='mb-2 text-left'>
                        <small>Receipt No.:{no}</small>
                    </div>
                    <table className='table table-sm'>
                        <tbody>
                            <tr>
                                <td><strong>Student No.:</strong></td>
                                <td>{studentData?.enrno}</td>
                            </tr>
                            <tr>
                                <td><strong>Student Name:</strong></td>
                                <td>{studentData?.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Course Name:</strong></td>
                                <td>{studentData?.course}</td>
                            </tr>
                            <tr>
                                <td><strong>Amount Paid:</strong></td>
                                <td>₹{studentData?.amount}</td>
                            </tr>
                            <tr>
                                <td><strong>Payment Method:</strong></td>
                                <td>{studentData?.type === '1' ? 'Cash' : studentData?.type === '2' ? 'UPI' : 'Check'}</td>
                            </tr>
                            <tr>
                                <td><strong>Date:</strong></td>
                                <td>{!studentData.date?new Date().toLocaleDateString('en-GB'):new Date(studentData.date).toLocaleDateString('en-GB')}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <div className='mb-2 d-flex justify-content-between'>
                        <strong>Student Sign.</strong> <strong>Receiver Sign.</strong>
                    </div>
                    <div className='mb-2 d-flex justify-content-between'>
                        <small>Note: This amount is non-refundable.</small> 
                    </div>
                </div>
            </div>
            <button onClick={() => handleDownloadPDF()}>Print Receipt</button>
            </div>
        </div>
    );
});

export default Receipt;
