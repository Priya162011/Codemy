const express=require('express')
const router=express.Router()

const {new_course,courses,delete_course,edit_course}=require('../controller/course_controller')

router.get('/course',courses) //get all courses
router.post('/course',new_course) //insert courses
router.delete('/course/:id',delete_course); //delete course
router.put('/course/:id',edit_course); //edit course
module.exports=router