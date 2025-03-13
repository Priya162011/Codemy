const mongoose=require("mongoose")
const exam_model=mongoose.model('exam')

//retrive all exams
const exams=async(req,res)=>{
    try {
        const exam=await exam_model.find().populate('faculty')
        if(!exam.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:exam}})
        }
    } catch (error) {
        console.log(error)
    }
}

//retrive exam based on student id
const examstud = async (req, res) => {
    try {
        const id = req.params.id; 
        const exams = await exam_model.find({ students: { $in: [id] } }).populate('faculty');

        if (!exams.length) {
            return res.status(404).json({
                status: false,
                data: { message: 'No exams found for this student' }
            });
        }

        res.status(200).json({
            status: true,
            data: { message: 'Exams retrieved successfully', exams }
        });
    } catch (error) {
        console.error('Error retrieving exams:', error);
        res.status(500).json({
            status: false,
            data: { message: 'An error occurred while retrieving the exams.' }
        });
    }
};



//retrive single exam
const exam=async(req,res)=>{
    try {
        const id=req.query.id
        console.log(id)
        const exam=await exam_model.findById(id).populate('faculty')
        if(!exam.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:exam}})
        }
    } catch (error) {
        console.log(error)
    }
}

//insert exam
const new_exam=async(req,res)=>{
    try{
        const formdata=req.body
        const exam=await exam_model(formdata)
        exam.save()
        if(!exam){
            res.status(404).json({status:false,data:{message:'data is not valid'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data instred successfully',data:exam}})
        }
    }
    catch(error){
        console.log(error)
    }
}

module.exports={new_exam,exams,exam,examstud}