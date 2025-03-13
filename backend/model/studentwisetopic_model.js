const mongoose = require("mongoose");

const studentTopicSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'topic',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student', 
        required: true
    },
    status: {
        type: Number, 
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("StudentTopic", studentTopicSchema);
