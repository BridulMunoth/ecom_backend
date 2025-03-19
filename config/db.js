const mongoose = require('mongoose')

require("dotenv").config()
const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.Mongo_Url)
        console.log("MongoDB connected...")

    }
    catch(error){
        console.error(`Error conncecting to MongoDb: ${error.message}`)
        process.exit(1)

    }
}

module.exports = connectDB