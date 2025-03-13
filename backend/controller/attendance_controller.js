const mongoose = require("mongoose")
const attendance_model = mongoose.model('attendance')
const leave_model = mongoose.model('leave')

//retrive attendance
const attendances = async (req, res) => {
    try {
        let { page, limit, userid } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 7;

        const skip = (page - 1) * limit;


        const attendanceRecords = await attendance_model.find({ student: userid }).skip(skip).limit(limit);


        const totalRecords = await attendance_model.countDocuments({ student: userid });

        if (!attendanceRecords.length) {
            return res.status(404).json({ status: false, data: { message: 'Data not found' } });
        }


        const leaveRecords = await leave_model.find({ studentid: userid });
        const leaveMap = new Map();
        leaveRecords.forEach(leave => {
            leaveMap.set(leave.startdate.toISOString().split('T')[0], leave.reason);
        });


        const attendanceWithLeave = attendanceRecords.map(attendance => {
            const attendanceDate = attendance.startdate.toISOString().split('T')[0];
            return {
                ...attendance._doc,
                leaveReason: attendance.status === 2 ? leaveMap.get(attendanceDate) || "No reason provided" : null
            };
        });

        res.status(200).json({
            status: true,
            data: {
                message: 'Data retrieved successfully',
                data: attendanceWithLeave,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(totalRecords / limit),
                    totalRecords,
                }
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};

//insert attendance
const new_attendance = async (req, res) => {
    try {
        const formdata = req.body;

        const data = await attendance_model.findOne({
            startdate: { $lte: formdata.startdate },
            enddate: { $gte: formdata.enddate }
        });

        if (!data) {
            const attendance = new attendance_model(formdata);
            await attendance.save();

            res.status(200).json({ 
                status: true, 
                data: { message: 'Data inserted successfully', attendance } 
            });
        } else {
            const attendance = await attendance_model.findByIdAndUpdate(
                data._id,
                formdata,
                { new: true }
            );

            res.status(200).json({ 
                status: true, 
                data: { message: 'Data updated successfully', attendance } 
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, data: { message: 'Server error' } });
    }
};


module.exports = { new_attendance, attendances }