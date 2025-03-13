const Razorpay = require('razorpay');
const {RAZORPAY_SECRET_KEY,RAZORPAY_ID_KEY}=require('../utility/config')

const razorpay = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY,
});

const pay=async(req,res)=>{
    const amt=Number(req.body.amount)
    try{
        const options = {
            amount:  amt*100, 
            currency: "INR",
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);
        if(!order){
            res.status(404).json({status:true,data:{message:'Payment failed'}})
        }
        else
        {
            res.status(200).json({status:true,data:{message:'Payment success',data:order}})
        }
    }catch(err){
        console.log(err)
    }
}

module.exports={pay}