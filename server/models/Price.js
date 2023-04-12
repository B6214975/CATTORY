const mongoose = require('mongoose')

const PriceSchema = new mongoose.Schema(
    {
    price:{
        type:Number,
        default:80,
    }
},
{timestamps: true}
);

module.exports = Price = mongoose.model("price",PriceSchema);