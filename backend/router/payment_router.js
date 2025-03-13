const express=require('express')
const router=express.Router()

const {new_payment,payments,getStudentPayments}=require('../controller/payment_controller')

router.get('/payment',payments) //get all ppaymets
router.post('/payment',new_payment) //insert payment
router.get('/getStudentPayments',getStudentPayments) //get payment of student

module.exports=router