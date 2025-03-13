const mongoose = require("mongoose")
const payment_model = mongoose.model('payment')
const student_model = mongoose.model('student')

//retrive all payments
const payments = async (req, res) => {
    try {
        const payment = await payment_model.find().populate("student")
        if (!payment.length) {
            res.status(404).json({ status: false, data: { message: 'data is not found' } })
        }
        else {
            res.status(200).json({ status: true, data: { message: 'data retrive successfully', data: payment } })
        }
    } catch (error) {
        console.log(error)
    }
}

//retrive student first payments
const getStudentPayments = async (req, res) => {
    try {
        const studentPayments = await student_model.aggregate([
            {
                $lookup: {
                    from: "payments",
                    localField: "_id",
                    foreignField: "student",
                    as: "payments"
                }
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "course",
                    foreignField: "_id",
                    as: "courseDetails"
                }
            },
            {
                $unwind: {
                    path: "$courseDetails",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        if (!studentPayments.length) {
            return res.status(404).json({ status: false, data: { message: 'No data found' } });
        }

        res.status(200).json({
            status: true,
            data: {
                message: 'Data retrieved successfully',
                data: studentPayments
            }
        });

    } catch (error) {
        console.error("Error fetching student payments:", error);
        res.status(500).json({ status: false, message: "Internal server error" });
    }
};

//insert payment
const new_payment = async (req, res) => {
    try {
        const formdata = req.body
        const paymentdata = await payment_model.findById(formdata.id)
        if (!paymentdata) {
            const payment = await payment_model(formdata)
            await payment.save()
            if (!payment) {
                res.status(404).json({ status: false, data: { message: 'data is not valid' } })
            }
            else {
                const student = await student_model.findById(payment.student)
                if (!student) {
                    res.status(404).json({ status: false, data: { message: 'data is not found' } })
                }
                else {
                    student.installmentDetails = student.installmentDetails.filter(
                        (installment) => installment._id.toString() !== payment.id.toString()
                    );
                    await student.save()
                }
                res.status(200).json({ status: true, data: { message: 'data instred successfully', data: payment } })
            }
        }
        else {
            const pay=await payment_model.findByIdAndUpdate(formdata.id,formdata,{new:true})
            if(!pay){
                return res.status(404).json({status:false, data:{message:"No payment Found."}})
            }
    
            return res.status(200).json({status:true, data:{message:"payment edited successfully.", data:pay}})
        }
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = { new_payment, payments, getStudentPayments }