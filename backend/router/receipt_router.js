const express=require('express')
const router=express.Router()

const {new_receipt,receipts,getcount}=require('../controller/receipt_controller')

router.get('/receipt',receipts) //get all receipts
router.post('/receipt',new_receipt) //insert receipts
router.get('/getcount',getcount) //get the count of receipts

module.exports=router