const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const session = require('express-session');
const { SECRET } = require('./utility/config')
const { PORT } = require("./utility/config");
const conn = require("./utility/connection");
const course_router = require("./router/course_router");
const faculty_router = require("./router/faculty_router");
const student_router = require("./router/student_router");
const attendance_router = require("./router/attendance_router");
const exam_router = require("./router/exam_router");
const marks_router = require("./router/marks_router");
const leave_router = require("./router/leave_router");
const payment_router = require("./router/payment_router");
const topic_router = require("./router/topic_router");
const student_topic_router = require("./router/studentwisetopic_router");
const login_router=require("./router/login_router")
const remark_router=require("./router/remark_router")
const receipt_router=require("./router/receipt_router")
const rzr_router=require("./router/rzrpay");

const app = express();
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  
}));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST","PUT","DELETE"],
    },
});

// Store socket connections
const facultySockets = new Map();

io.on("connection", (socket) => {
    socket.on("registerFaculty", (facultyId) => {
        facultySockets.set(facultyId, socket);
    });
    socket.on("disconnect", () => {
        facultySockets.forEach((value, key) => {
            if (value.id === socket.id) {
                facultySockets.delete(key);
            }
        });
    });
});

app.set("io", io);
app.set("facultySockets", facultySockets);

app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api', course_router);
app.use('/api', faculty_router);
app.use('/api', student_router);
app.use('/api', attendance_router);
app.use('/api', exam_router);
app.use('/api', marks_router);
app.use('/api', leave_router);
app.use('/api', payment_router);
app.use('/api', topic_router);
app.use('/api', student_topic_router);
app.use('/api',login_router);
app.use('/api',remark_router)
app.use('/api',receipt_router)
app.use('/api',rzr_router);

const serverlisten = async () => {
    try {
        var connection = await conn();
        if (connection) {
            server.listen(PORT, () => {
                console.log(`🚀 Server running on port ${PORT}`);
            });
        } else {
            console.log("⚠️ Database connection failed");
        }
    } catch (error) {
        console.error("🔥 Error starting server:", error);
    }
};

serverlisten();
