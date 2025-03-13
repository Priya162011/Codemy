const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    contactno: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Contact number must be exactly 10 digits"]
    },
    address: {
        type: String,
        required: true
    },
    parentname: {
        type: String,
        required: true
    },
    parentcontactno: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Parent contact number must be exactly 10 digits"]
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    ref:{
        type:String,
        required:true
    },
    profile: {
        type: String,
        required: true
    },
    parentprofile: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    adharcard: {
        type: String,
        required: true
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculty',
        required: true
    },
    totalfees: {
        type: Number,
        required: true
    },
    joindate: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    installmentDetails: [
        {
            amount: { type: Number, required: true },
            date: { type: Date, required: true }
        }
    ],
    counselor:{
        type:String,
        required:true
    },
    enrno:{
        type:String,
        required:true
    }
}, { timestamps: true });

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
