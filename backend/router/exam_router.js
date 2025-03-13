const express=require('express')
const router=express.Router()

const {new_exam,exams,exam,examstud}=require('../controller/exam_controller')

router.get('/exam',exams) //get all exams
router.post('/exam',new_exam) //insert new exam
router.get('/exam/:id',exam) //get exam
router.get('/examstud/:id',examstud) //get exam of student

module.exports=router