const express=require('express')
const router=express.Router()

const {new_course,courses}=require('../controller/course_controller')

router.get('/course',courses) //get all courses
router.post('/course',new_course) //insert courses

module.exports=router