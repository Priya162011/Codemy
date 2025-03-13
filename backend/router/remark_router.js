const express=require('express')
const router=express.Router()

const {new_remark,remarks,remark}=require('../controller/remark_controller')

router.get('/remark',remarks) //get all remarks
router.post('/remark',new_remark) //insert new remark
router.get("/remark/:id",remark) //get remark

module.exports=router