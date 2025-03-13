const mongoose=require("mongoose")

const receipt_schema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    receiptno:{
        type:String,
        require:true
    },
    status:{
        type:Number,
        require:true
    }
},{timestamps:true})

mongoose.model("receipt",receipt_schema)