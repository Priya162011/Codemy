const mongoose=require("mongoose")
const topic_model=mongoose.model('topic')

//retrive all topics
const topics=async(req,res)=>{
    try {
        const topic=await topic_model.find().populate('course')
        if(!topic.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:topic}})
        }
    } catch (error) {
        console.log(error)
    }
}

//retrive topic of particular course
const topic=async(req,res)=>{
    try {
        const id=req.params.id
        const topic=await topic_model.find({course:id})
        if(!topic.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:topic}})
        }
    } catch (error) {
        console.log(error)
    }
}

//insert topic
const new_topic=async(req,res)=>{
    try{
        const formdata=req.body
        const topic=await topic_model(formdata)
        topic.save()
        if(!topic){
            res.status(404).json({status:false,data:{message:'data is not valid'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data instred successfully',data:topic}})
        }
    }
    catch(error){
        console.log(error)
    }
}

module.exports={new_topic,topics,topic}