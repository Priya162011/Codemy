const mongoose=require("mongoose")

const leave_schema=new mongoose.Schema({
    studentid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
            required: true
        },
    reason:{
        type:String,
        require:true
    },
    startdate:{
        type:Date,
        require:true
    },
    enddate:{
        type:Date,
        require:true
    },
    status:{
        type:Number,
        require:true
    },
    remark:{
        type:String,
        require:true
    }
},{timestamps:true})

mongoose.model("leave",leave_schema)