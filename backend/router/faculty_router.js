const express=require('express')
const router=express.Router()
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage });

const {faculties,new_faculty}=require('../controller/faculty_controller')

router.get('/faculty',faculties) //get all faculties
router.post('/faculty', upload.single("image"),new_faculty) //insert faculty

module.exports=router