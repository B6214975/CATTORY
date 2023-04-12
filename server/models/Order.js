const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const OrderSchema = new mongoose.Schema(
    {
   products:[
    {
        product:{
            type: ObjectId,
            ref:'product'
        },
        amount:Number,
        price:Number,
        period:String,
    }
   ],
   cartTotal:Number,
   orderstatus:{
    type:String,
    default:'new'
   },
   orderBy:{
    type: ObjectId,
    ref:'users'
   },
   images:{
    type:Array,
}
},
{timestamps: true}
);

module.exports = Order = mongoose.model("order",OrderSchema);