const express=require('express')
const router=express.Router()

const {new_marks,markss}=require('../controller/marks_controller')

router.get('/marks',markss)  //get all marks
router.post('/marks',new_marks) //insert marks of student

module.exports=router