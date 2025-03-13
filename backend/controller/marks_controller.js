const mongoose=require("mongoose")
const marks_model=mongoose.model('marks')

//retrive all marks
const markss=async(req,res)=>{
    try {
        let {userid}=req.query
        const marks = await marks_model.find({student:userid})
        .populate({
            path: "exam",
            populate: { path: "faculty", select: "name" },
        })
        .populate("student")
        if(!marks.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:marks}})
        }
    } catch (error) {
        console.log(error)
    }
}

//insert marks
const new_marks=async(req,res)=>{
    try{
        const formdata=req.body
        const marks=await marks_model(formdata)
        marks.save()
        if(!marks){
            res.status(404).json({status:false,data:{message:'data is not valid'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data instred successfully',data:marks}})
        }
    }
    catch(error){
        console.log(error)
    }
}

module.exports={new_marks,markss}