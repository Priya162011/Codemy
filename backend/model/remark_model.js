const mongoose=require("mongoose")

const remark_schema=new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    date:{
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

mongoose.model("remark",remark_schema)