const mongoose=require("mongoose")
const leave_model=mongoose.model('leave')
const student_model=mongoose.model('student')
const nodemailer = require("nodemailer");
const attendance_model = mongoose.model('attendance')
//retrive all leaves
const leaves=async(req,res)=>{
    try {
        const leave=await leave_model.find().populate('studentid')
        if(!leave.length){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:leave}})
        }
    } catch (error) {
        console.log(error)
    }
}

//insert leave
const new_leave = async (req, res) => {
    try {
        const formdata = req.body;
        const leave = new leave_model(formdata);
        await leave.save();

        const student = await student_model.findById(formdata.studentid).populate("faculty");
        if (!student || !student.faculty) {
            return res.status(400).json({ status: false, message: "Faculty not found" });
        }

        const facultySockets = req.app.get("facultySockets");

        if (facultySockets.has(student.faculty._id.toString())) {
            const facultySocket = facultySockets.get(student.faculty._id.toString());
            facultySocket.emit("leave-notification", {
                message: `New Leave Request from ${student.name}`,
                leaveRequest: leave,
            });
            console.log("📢 Notification sent to faculty:", student.faculty._id);
        } else {
            console.log("⚠️ Faculty is not online:", student.faculty._id);
        }
        sendemail(student.email, student.faculty.email,`leave from ${student.name}`)
        // sendemail("piap202124@gmail.com",`leave from ${student.name}`)
        res.status(200).json({
            status: true,
            message: "Leave request submitted successfully",
            data: leave,
        });
    } catch (error) {
        res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

//update leave (which is updated by only faculty for approval of the leave)
const edit_leave = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        if (!data || !id) {
            return res.status(400).json({ status: false, data: { message: "Data cannot be empty." } });
        }

        const leave = await leave_model.findOneAndUpdate({ _id: id }, data, { new: true });

        if (!leave) {
            return res.status(404).json({ status: false, data: { message: "No leave found." } });
        }

        const attendanceRecords = [];

        const startDate = new Date(leave.startdate);
        const endDate = new Date(leave.enddate);

        if (startDate.getTime() === endDate.getTime()) {
            attendanceRecords.push({
                student: leave.studentid,
                startdate: leave.startdate,
                enddate: leave.enddate,
                status: leave.status === 1 ? 2 : 0,
                remark: leave.reason
            });
        } else {
            let currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                attendanceRecords.push({
                    student: leave.studentid,
                    startdate: new Date(currentDate),
                    enddate: new Date(currentDate),
                    status: leave.status === 1 ? 2 : 0,
                    remark: leave.reason
                });

                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        await attendance_model.insertMany(attendanceRecords);

        const student = await student_model.findById(leave.studentid);
        if (!student) {
            return res.status(404).json({ status: false, data: { message: "No student found." } });
        }

        const text = leave.status == 1 ? "Your leave is approved." : "Your leave is not approved.";
        sendemail(faculty.email, student.email, text);

        return res.status(200).json({ status: true, data: { message: "Leave edited successfully.", data: leave } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, data: { message: "Internal Server Error" } });
    }
};


//send the email
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "piap202124@gmail.com", 
      pass: "avvndiusthpvvanp", 
    },
  });
const sendemail= async(from,to, text)=>{
    try {
        const mailOptions = {
          from,
          to,
          subject:"Leave",
          text,
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
      } catch (error) {
        console.error("Error sending email:", error);
      }
}

module.exports={new_leave,leaves,edit_leave}