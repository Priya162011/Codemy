const mongoose=require("mongoose")
const {DBURL}=require("./config")
const student=require("../model/student_model")
const course=require("../model/course_model")
const faculty=require("../model/faculty_model")
const leave=require("../model/leave_model")
const exam=require("../model/exam_model")
const marks=require("../model/marks_model")
const attendance=require("../model/attendance_model")
const payment=require("../model/payment_model")
const topic=require("../model/topic_model")
const student_topic=require("../model/studentwisetopic_model")
const remark=require("../model/remark_model")
const receipt=require("../model/receipt_model")

const conn=async()=>{
    try{
        await mongoose.connect(DBURL)
        course
        student
        faculty
        leave
        exam
        marks
        attendance
        payment
        topic
        student_topic
        remark
        receipt
        return true
    }catch(error){
        if(error.name==='MongooseServerSelectionError'){
            console.error('check your server is runing or not')
        }
        else
        {
            console.error('Database Connection is failed')
        }
        return false
    }
}

module.exports=conn