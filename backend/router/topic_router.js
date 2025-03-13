const express=require('express')
const router=express.Router()

const {new_topic,topics,topic}=require('../controller/topic_controller')

router.get('/topic',topics) //get all topics
router.post('/topic',new_topic) //insert topics
router.get('/topic/:id',topic) //get topic of oone course

module.exports=router