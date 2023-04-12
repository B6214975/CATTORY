const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.DATABASE)
        console.log('ConnectDB success...')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
//upload
module.exports = connectDB;