const mongoose=require("mongoose")

const histroy_schema=new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    date:{
        type:Date,
        required: true
    },
    histroy:{
        type:Number,
        require:true
    },
    status:{
        type:Number,
        require:true
    }
},{timestamps:true})

mongoose.model("histroy",histroy_schema)