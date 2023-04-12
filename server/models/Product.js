const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const ProductSchema = new mongoose.Schema(
    {
    title:{
        type:String,
        text:true
    },
    price:{
        type: Number,
    },
    period:{
        type: String,
    },
    amount:{
        type: String,
    },

    quantity:Number,
    
    images:{
        type:Array,
    },
    status:{
        type: String,
    },
},
{timestamps: true}
);

module.exports = Product = mongoose.model("product",ProductSchema);