const mongoose = require("mongoose")
const remark_model = mongoose.model('remark')

//retrive remark
const remarks = async (req, res) => {
        try {
            const remark=await remark_model.find()
            if(!remark.length){
                res.status(404).json({status:false,data:{message:'data is not found'}})
            }
            else
            {
                res.status(200).json({status:true,data:{message:'data retrive successfully',data:remark}})
            }
        } catch (error) {
            console.log(error)
        }
};

//insert remark
const new_remark = async (req, res) => {
    try {
        const formdata = req.body
        const remark = await remark_model(formdata)
        remark.save()
        if (!remark) {
            res.status(404).json({ status: false, data: { message: 'data is not valid' } })
        }
        else {
            res.status(200).json({ status: true, data: { message: 'data instred successfully', data: remark } })
        }
    }
    catch (error) {
        console.log(error)
    }
}

// get remark 
const remark = async (req, res) => {
    try {
        const id=req.params.id
        const remark=await remark_model.find({student:id})
        if(!remark){
            res.status(404).json({status:false,data:{message:'data is not found'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'data retrive successfully',data:remark}})
        }
    } catch (error) {
        console.log(error)
    }
};

module.exports = { new_remark, remarks,remark }