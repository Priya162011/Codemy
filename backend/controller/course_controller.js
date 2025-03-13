const mongoose=require("mongoose")
const course_model=mongoose.model('course')

//retrive all courses
const courses=async(req,res)=>{
    try {
        const course=await course_model.find()
        if(!course.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:course}})
        }
    } catch (error) {
        console.log(error)
    }
}

//insert course
const new_course=async(req,res)=>{
    try{
        const formdata=req.body
        const course=await course_model(formdata)
        course.save()
        if(!course){
            res.status(404).json({status:false,data:{message:'data is not valid'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data instred successfully',data:course}})
        }
    }
    catch(error){
        console.log(error)
    }
}

module.exports={new_course,courses}