const mongoose = require("mongoose")
const faculty_model = mongoose.model('faculty')
const student_model = mongoose.model('student')
const bcrypt = require("bcrypt")


//retrive all facultys
const faculties = async (req, res) => {
    try {
        const faculty = await faculty_model.find()
        if (!faculty.length) {
            res.status(404).json({ status: false, data: { message: 'data is not found' } })
        }
        else {
            res.status(200).json({ status: true, data: { message: 'data retrive successfully', data: faculty } })
        }
    } catch (error) {
        console.log(error)
    }
}

//insert faculty
const new_faculty = async (req, res) => {
    try {
        let data = req.body;

        data.password=data.name+"1234"
        if (!data.password) {
            return res.status(400).json({ status: false, data: { message: "Password is required" } });
        }

      
        if (typeof data.password !== "string") {
            return res.status(400).json({ status: false, data: { message: "Invalid password format" } });
        }
        data.image = req.file ? req.file.filename : null;
        const plainPassword = data.name ? `${data.name}1234` : "default1234";

        data.password = await bcrypt.hash(plainPassword, 10);
        const faculty = new faculty_model(data);

        
        await faculty.save();

      
        return res.status(200).json({ status: true, data: { message: "Data inserted successfully", faculty } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, data: { message: "Internal Server Error", error: error.message } });
    }
};


module.exports = { faculties, new_faculty}