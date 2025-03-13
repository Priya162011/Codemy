const mongoose=require("mongoose")

const faculty_schema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    contactno:{
        type:Number,
        require:true,
        maximum:10,
        minimum:10
    },
    address:{
        type:String,
        require:true
    },
    qualification:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    status:{
        type:Number,
        require:true
    },
},{timestamps:true})

mongoose.model("faculty",faculty_schema)