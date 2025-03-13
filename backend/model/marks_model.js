const mongoose=require("mongoose")

const marks_schema=new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    exam:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exam',
        required: true
    },
    marks:{
        type:Number,
        require:true
    },
    status:{
        type:Number,
        require:true
    }
},{timestamps:true})

mongoose.model("marks",marks_schema)