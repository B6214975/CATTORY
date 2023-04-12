const mongoose = require('mongoose')

const AmountSchema = new mongoose.Schema(
    {
    amount:{
        type:String,
    }
},
{timestamps: true}
);

module.exports = Amount = mongoose.model("amount",AmountSchema);