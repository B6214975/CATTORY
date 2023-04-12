const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const UserSchema = new mongoose.Schema(
    {
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    email:{
        type:String,
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    telnumber:{
        type:String,
    },
    banknumber:{
        type:String,
    },
    bankname:{
        type:String,
    },
    role:{
        type:String,
        default: "user",
    },
    enabled:{
        type:Boolean,
        default: true,
    },
},
{timestamps: true}
);

module.exports = User = mongoose.model("users",UserSchema);