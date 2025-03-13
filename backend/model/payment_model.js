const mongoose=require("mongoose")

const payment_schema=new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    amount:{
        type:Number,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    status:{
        type:Number,
        require:true
    },
    id:{
        type:String,
        require:true
    }
},{timestamps:true})

mongoose.model("payment",payment_schema)