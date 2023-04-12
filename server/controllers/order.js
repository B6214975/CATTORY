const Order = require("../models/Order");

exports.changeOrderStatus = async (req, res) => {
  try {
    const {orderId,orderstatus} = req.body
    console.log(orderId,orderstatus)
    const productOption = []

    if (orderstatus == 'cancel'){
      let order = await Order.find({_id:orderId})
    .populate("products.product")
    .exec()
      // console.log("product: cancel --> ",order[0].products[i].product.status)
      const Option = order[0].products.map((item) => {
        if(item.product != null){
          console.log(item.product.title)
          productOption.push(item)
          
        }
      });
      console.log(productOption)
      const bulkOption = productOption.map((item)=>{
        return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $set : { status : 'ready' } },
        },
      };
      })
      let updated = await Product.bulkWrite(bulkOption, {});
    // console.log(updated)
    }
    

    let orderUpdate = await Order.findByIdAndUpdate(
        orderId,
        {orderstatus},
        {new:true}
    )

    res.send(orderUpdate)
    // res.send('ok')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onUpdata Status Order");
  }
};

exports.getOrderAdmin = async (req, res) => {
    try {

      let order = await Order.find()
        .populate("products.product")
        .populate("orderBy","-password -createdAt -enabled -role -updatedAt")
        .sort([["createdAt", "desc"]])
        .exec();
      res.send(order)

    } catch (err) {
      res.status(500).send("get Order ERROR!!!");
    }
  };
