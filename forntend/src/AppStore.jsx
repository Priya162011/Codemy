import { configureStore } from "@reduxjs/toolkit"
import LoginSlice from './Componants/Slices/LoginSlice'
import StudentSlice from './Componants/Slices/StudentSlice'
import MarksSlice from './Componants/Slices/MarksSlice'
import AttendanceSlice from './Componants/Slices/AttendanceSlice'
import ExamSlice from './Componants/Slices/ExamSlice'
import LeaveSlice from './Componants/Slices/LeaveSlice'
import TopicSlice from './Componants/Slices/TopicSlice'
import RemarkSlice from './Componants/Slices/RemarkSlice'
import PaymentSlice from './Componants/Slices/PaymentSlice'
export const store=configureStore({
    reducer:{
        Login:LoginSlice,
        Students:StudentSlice,
        Marks:MarksSlice,
        Attendance:AttendanceSlice,
        Exam:ExamSlice,
        Leave:LeaveSlice,
        Topic:TopicSlice,
        Remark:RemarkSlice,
        Payment:PaymentSlice
    }
})