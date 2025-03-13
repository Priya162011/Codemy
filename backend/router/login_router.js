const express=require('express')
const router=express.Router()

const {login,forget,getsession,logout}=require('../controller/login_controller')

router.post('/login',login) 
router.post('/forgot-password',forget)
router.get('/getsession',getsession)
router.get('/logout',logout)

module.exports=router