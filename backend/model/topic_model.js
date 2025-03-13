const mongoose=require("mongoose")

const topic_schema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course',
        require:true
    },
    status:{
        type:Number,
        require:true
    }
},{timestamps:true})

mongoose.model("topic",topic_schema)