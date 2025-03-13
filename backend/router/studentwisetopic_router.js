const express=require('express')
const router=express.Router()

const {new_student_topic,student_topics}=require('../controller/studentwisetopic_controller')

router.get('/student_topic/:id',student_topics) //get all student_topics
router.post('/student_topic',new_student_topic) //insert student_topics

module.exports=router