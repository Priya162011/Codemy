require('dotenv').config()

module.exports={
    DBURL:process.env.DBURL,
    PORT:process.env.PORT,
    SECRET:process.env.SECRET,
    RAZORPAY_ID_KEY:process.env.RAZORPAY_ID_KEY,
    RAZORPAY_SECRET_KEY:process.env.RAZORPAY_SECRET_KEY
}