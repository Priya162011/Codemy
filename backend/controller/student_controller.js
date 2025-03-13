const mongoose=require("mongoose")
const student_model=mongoose.model('student')
const payment_model=mongoose.model('payment')
const bcrypt=require("bcrypt")

//retrive all students
const students=async(req,res)=>{
    try {
        const stud=await student_model.find().populate("course").populate("faculty")
        if(!stud.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:stud}})
        }
    } catch (error) {
        console.log(error)
    }
}

//retrive single students
const one_student=async(req,res)=>{
        const {id}=req.params
    try {
        const stud=await student_model.find({_id:id}).populate("course").populate("faculty")
        if(!stud.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:stud}})
        }
    } catch (error) {
        console.log(error)
    }
}

//insert student
const register = async (req, res) => {
    try {
        let { 
            name, email, password: plainPassword, contactno, address, 
            parentname, parentcontactno, course, batch, profile, 
            parentprofile, faculty, totalfees, status, amount, type, 
            installmentDetails, joindate ,ref,enrno,counselor
        } = req.body;
    
        const image = req.files?.image ? req.files.image[0].filename : null;
        const adharcard = req.files?.adharcard ? req.files.adharcard[0].filename : null;
        plainPassword=contactno
        const c=await student_model.find()
        const count=c.length
        enrno='2025'+count
        if (!plainPassword) {
            return res.status(400).json({ error: "Password is required" });
        }
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
        if (!joindate) {
            return res.status(400).json({ error: "Join date is required" });
        }
    
        if (typeof installmentDetails === "string") {
            try {
                installmentDetails = JSON.parse(installmentDetails);
            } catch (err) {
                return res.status(400).json({ error: "Invalid format for installmentDetails" });
            }
        }
    
        if (!Array.isArray(installmentDetails)) {
            return res.status(400).json({ error: "Installment details must be an array" });
        }
    
        // Insert Student Data
        const student = new student_model({
            name, 
            email, 
            password: hashedPassword, 
            contactno, 
            address, 
            parentname, 
            parentcontactno, 
            course, 
            batch, 
            profile, 
            parentprofile, 
            image, 
            adharcard, 
            faculty, 
            totalfees, 
            status,
            joindate, 
            installmentDetails,
            ref,
            enrno,
            counselor
        });
    
        const savedStudent = await student.save();
    
        // Insert Payment Data
        const payment = new payment_model({
            student: savedStudent._id, 
            amount,
            type,
            status
        });
    
        await payment.save();
    
        res.status(201).json({ message: "Student and payment data inserted successfully", student: savedStudent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const edit_student=async(req,res)=>{
    try {
        const id=req.params.id;
        const data = req.body;
        
        if(!data || !id){
            return res.status(404).json({status:false, data:{message:"data can not empty."}})
        }

        const student = await student_model.findByIdAndUpdate(id, data, {new:true})
        
        if(!student){
            return res.status(404).json({status:false, data:{message:"No student Found."}})
        }

        return res.status(200).json({status:true, data:{message:"student edited successfully.", data:student}})
    } catch (error) {
        console.log(error)
    }
}

//retrive all students faculty wise
const facultywisestudents=async(req,res)=>{
    try {
        const params=req.params
        const stud=await student_model.find({faculty:params.id}).populate('course').populate('faculty')
        if(!stud.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:stud}})
        }
    } catch (error) {
        console.log(error)
    }
}


//retrive upcoming students
const upcomingstudents=async(req,res)=>{
    try {
        const stud=await student_model.find({status:1}).populate('course').populate('faculty')
        if(!stud.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:stud}})
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports={students,facultywisestudents,upcomingstudents,register,one_student,edit_student}