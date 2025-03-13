const express=require('express')
const router=express.Router()
const multer = require('multer');
const path = require('path');
// const upload = require("../controller/upload_file");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});
const upload = multer({ storage });

const {students,facultywisestudents,upcomingstudents,one_student,edit_student,register}=require('../controller/student_controller')

router.get('/student',students) //get all students
router.get('/student/:id',facultywisestudents)  //get facultywise students
router.get('/studentup',upcomingstudents) //get upcoming students
router.get('/one_student/:id',one_student)  //get one student
router.put('/student/:id',edit_student) //edit student
router.post('/register', upload.fields([{ name: 'image' }, { name: 'adharcard' }]), register); //insert new student
module.exports=router