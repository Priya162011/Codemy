const mongoose=require("mongoose")

const course_schema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    duration:{
        type:String,
        require:true
    },
    status:{
        type:Number,
        require:true
    }
},{timestamps:true})

mongoose.model("course",course_schema)