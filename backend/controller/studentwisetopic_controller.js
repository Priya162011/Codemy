const mongoose=require("mongoose")
const student_topic_model=mongoose.model('StudentTopic')

//retrive all student_topics
const student_topics=async(req,res)=>{
    try {
        
        const id=req.params.id
        const student_topic=await student_topic_model.find({student:id}).populate('name')
        if(!student_topic.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:student_topic}})
        }
    } catch (error) {
        console.log(error)
    }
}

//insert student_topic
const new_student_topic=async(req,res)=>{
    try{
        const formdata=req.body
        const st=await student_topic_model.findById(formdata.name)
        if(!st){
            const student_topic=await student_topic_model(formdata)
            student_topic.save()
            if(!student_topic){
                res.status(404).json({status:false,data:{message:'data is not valid'}})
            }
            else
            {
                res.status(200).json({status:true,data:{message:'data instred successfully',data:student_topic}})
            }
        }
        else
        {
           const stu= await student_topic_model.findOneAndUpdate(formdata.name,formdata,{new:true})
           if(!stu){
            res.status(404).json({status:false,data:{message:'data is not valid'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data instred successfully',data:student_topic}})
        }
        }
        
    }
    catch(error){
        console.log(error)
    }
}

module.exports={new_student_topic,student_topics}