const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const CartSchema = new mongoose.Schema(
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
   orderBy:{
    type: ObjectId,
    ref:'users'
   }
},
{timestamps: true}
);

module.exports = Cart = mongoose.model("cart",CartSchema);