const mongoose = require("mongoose")
const faculty_model = mongoose.model('faculty')
const student_model = mongoose.model('student')
const bcrypt = require("bcrypt")

//login
const login = async (req, res) => {
    try {
        const data = req.body;

        // Admin login
        if (data.email === "admin@admin.com" && data.password === "admin123") {
            req.session.user = { name: data.name, email: data.email, role: "admin" };
            return res.status(200).json({ status: true, data: { message: 'Login successful', user: "admin", role: "admin" } });
        }

        // admision login
        if (data.email === "admision@gmail.com" && data.password === "admision123") {
            req.session.user = { name: data.name, email: data.email, role: "adminstar" };
            return res.status(200).json({ status: true, data: { message: 'Login successful', user: "adminstar", role: "adminstar" } });
        }

        // Faculty login
        const faculty = await faculty_model.findOne({ email: data.email});
        if (faculty && await bcrypt.compare(data.password, faculty.password)) {
            req.session.user = { name: faculty.name, email: data.email, role: "faculty", id: faculty._id };
            return res.status(200).json({ status: true, data: { message: 'Login successful', user: faculty, role: "faculty" } });
        }

        // Student login
        const student = await student_model.findOne({ enrno: data.email,status:0});
        if (student && await bcrypt.compare(data.password, student.password)) {
            req.session.user = { name: student.name, email: student.email, role: "student", id: student._id, course: student.course };
            return res.status(200).json({ status: true, data: { message: 'Login successful', user: student, role: "student" } });
        }

        // Invalid credentials
        res.status(401).json({ status: false, data: { message: 'Invalid username or password' } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, data: { message: 'Internal server error', error } });
    }
};

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error destroying session");
        }
        else {
            return res.status(200).json({ status: true, data: { message: 'Logout successful' } });
        }
    });
}

// forget password 
const forget = async (req, res) => {
    const { mobile } = req.body;
    const user = await User.findOne({ mobile });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await twilioClient.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: mobile
    });

    res.json({ message: 'OTP sent successfully' });
}

//getting session
const getsession = async (req, res) => {
    if (req.session.user) {
        res.status(200).json({ status: true, data: req.session.user });
    } else {
        res.status(401).json({ status: false, message: "No active session" });
    }
};


module.exports = {login, forget, getsession, logout }