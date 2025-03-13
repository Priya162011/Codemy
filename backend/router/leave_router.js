const express=require('express')
const router=express.Router()

const {new_leave,leaves,edit_leave}=require('../controller/leave_controller')

router.get('/leave',leaves) //get all leaves
router.post('/leave',new_leave)  //insert new leave
router.put('/leave/:id',edit_leave)  //edit exam

module.exports=router