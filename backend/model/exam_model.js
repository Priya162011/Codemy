const mongoose=require("mongoose")

const exam_schema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    },
    totalmarks:{
        type:Number,
        require:true
    },
    faculty:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculty',
        required: true
    },
    students:{
        type:Array,
        required:true
    },
    status:{
        type:Number,
        require:true
    }
},{timestamps:true})

mongoose.model("exam",exam_schema)