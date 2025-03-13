const express=require('express')
const router=express.Router()

const {new_attendance,attendances}=require('../controller/attendance_controller')

router.get('/attendance',attendances) //get all attendances
router.post('/attendance',new_attendance) //insert attendances

module.exports=router