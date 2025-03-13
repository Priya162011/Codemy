const mongoose=require("mongoose")

const attendance_schema=new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    startdate:{
        type:Date,
        require:true
    },
    enddate:{
        type:Date,
        require:true
    },
    remark:{
        type:String,
        require:true
    },
    status:{
        type:Number,
        require:true
    }
},{timestamps:true})

mongoose.model("attendance",attendance_schema)