require('dotenv').config()

module.exports={
    DBURL:process.env.DBURL,
    PORT:process.env.PORT,
    SECRET:process.env.SECRET
}