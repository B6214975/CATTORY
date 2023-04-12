const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
const { token } = require("morgan");

const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

// get list user
exports.listUsers = async (req, res) => {
  try {
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onkistUser");
  }
};

exports.changeRole = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onchangeRole");
  }
};
exports.changeStatus = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onchaneStatus");
  }
};

// delete list user
exports.deleteUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onDeleteUser");
  }
};

//listUsersBy
exports.listUsersBy = async (req, res) => {
  try {
    const userBy = await User.findOne({
      _id: req.params.id,
    })
      .select("-password -createdAt -enabled -role -updatedAt")
      .exec();
    // console.log(req.params.id)
    res.send(userBy);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on listUser");
  }
};

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;
    let products = [];
    let soldOut = [];
    let soldOut_product = [];
    const productsDB = await Product.find().select("_id title status").exec();
    const cartDB = await Cart.find().exec();
    let user = await User.findOne({ username: req.user.username }).exec();
    let cartOld = await Cart.findOne({ orderBy: user._id }).exec();


    // console.log(cartOld)

    cartDB.map((c_item) => {
      c_item.products.map((c_item_p) => {
        // console.log(c_item_p.product)
        cart.map((c_item_c) => {
          if (c_item_p.product.toString() == c_item_c._id.toString()) {
            soldOut.push(c_item_c._id);
          }
        });
      });
    });
    // console.log(soldOut)
   var soldOut_cut = [...new Set(soldOut.map((item) => item))];
    
    console.log(soldOut_cut);
    if(cartOld){
    cartOld.products.map(item=>{
      soldOut_cut.map((sc_item)=>{
        if (sc_item == item.product.toString()){
          soldOut_cut.splice(soldOut_cut.indexOf(sc_item),1)
          // console.log("==> ",soldOut_cut.indexOf(sc_item))
          
        }
      })
    })}

    productsDB.map((p_item)=>{
      cart.map((c_item)=>{
        if(c_item._id.toString() == p_item._id.toString()){
          if(p_item.status == 'sold'){
            soldOut_product.push(c_item.title)
          }
          // console.log(c_item.title,"==",p_item.title)
        }
      })
    })



    if (soldOut_cut.length == 0) {

if(soldOut_product.length == 0 ){
  if (cartOld) {
    cartOld.remove();
    console.log("remove Old Cart");
  }
  // //จัดระเบียบก่อนเก็บ เลือกเก็บ
  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.amount = cart[i].amount;
    object.price = cart[i].price;
    object.period = cart[i].period;

    products.push(object);
  }
  // //ผลรวมตะกร้า
  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price;
  }
  let newCart = await new Cart({
    products,
    cartTotal,
    orderBy: user._id,
  }).save();

  res.send("OK not sold Out");
}else{
  res.send(soldOut_product)
}
    } else {
      // const send_number = await Product.find({_id:})
      res.send(soldOut_cut);
    }

    // res.send(soldOut_product);
    // console.log(soldOut_product);
  } catch (err) {
    console.log(err);
    res.status(500).send("usercart server error");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let cart = await Cart.findOne({ orderBy: user._id })
      .populate("products.product", "_id title price")
      .exec();
    const { products, cartTotal } = cart;
    res.json({ products, cartTotal });
  } catch (err) {
    res.status(500).send("get Cart ERROR!!!");
  }
};

// // manage Order อย่าลืมทำ เช็ตสถานะว่า sole หรอืยัง ----------------
exports.saveOrder = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();
    const userCart = await Cart.findOne({ orderBy: user._id }).exec();
    const products = await Product.find().select("_id title status").exec();
    const { fileUpload } = req.body;
    let soldOut = [];

    products.map((p_item) => {
      userCart.products.map((c_item) => {
        if (p_item._id.toString() == c_item.product.toString()) {
          if (p_item.status == "sold") {
            soldOut.push(p_item.title);
          }
          // if(products)
        }
      });
    });
    console.log(soldOut);

    if (soldOut.length == 0) {
      let order = await new Order({
        products: userCart.products,
        orderBy: user._id,
        cartTotal: userCart.cartTotal,
        images: [fileUpload[0]],
      }).save();

      const bulkOption = userCart.products.map((item) => {
        return {
          updateOne: {
            filter: { _id: item.product._id },
            update: { $inc: { quantity: -1 } },
            update: { $set: { status: "sold" } },
          },
        };
      });

      let updated = await Product.bulkWrite(bulkOption, {});
      res.send("OK not sold Out");
    } else {
      res.send(soldOut);
    }

    // res.send("ok IN saveORder");
  } catch (err) {
    res.status(500).send("save Order ERROR!!!");
  }
};
// exports.saveOrder = async (req, res) => {
//   try {
//     const {fileUpload} = req.body
//     const user = await User.findOne({ username: req.user.username }).exec();
//     const userCart = await Cart.findOne({ orderBy: user._id }).exec();

//     let order = await new Order({
//       products: userCart.products,
//       orderBy: user._id,
//       cartTotal: userCart.cartTotal,
//       images: [fileUpload[0]],
//     }).save();

//     const bulkOption = userCart.products.map((item) => {
//       return {
//         updateOne: {
//           filter: { _id: item.product._id },
//           update: { $inc: { quantity: -1 } },
//           update: { $set : { status : 'sold' } },
//         },
//       };
//     });
//     let updated = await Product.bulkWrite(bulkOption, {});
//     console.log(order);
//     // console.log("index0 : ",fileUpload[0]);
//     res.send(userCart.products);

//   } catch (err) {
//     res.status(500).send("save Order ERROR!!!");
//   }
// };

exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    const empty = await Cart.findOneAndRemove({ orderBy: user._id }).exec();
    res.send(empty);
  } catch (err) {
    console.log(err);
    res.status(500).send("reMovecart server error");
  }
};

exports.getOrder = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    let order = await Order.find({ orderBy: user._id })
      .populate("products.product")
      .sort([["createdAt", "desc"]])
      .exec();
    res.send(order);
  } catch (err) {
    res.status(500).send("get Order ERROR!!!");
  }
};

exports.updateUser = async (req, res) => {
  try {
    // const id  = req.params.id;

    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    }).exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onupdateUser");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { oldpassword, newpassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const enPassword = await bcrypt.hash(newpassword, salt);

    var user = await User.findOneAndUpdate({ _id: id }, { new: true });
    if (user) {
      const isMatch = await bcrypt.compare(oldpassword, user.password);
      // console.log("Have pass is: ",isMatch)

      if (isMatch) {
        const setPassword = await User.findOneAndUpdate(
          { _id: id },
          {
            password: enPassword,
            new: true,
          }
        );
      } else {
        return res.status(400).send("Password Invalid!!!");
      }
    }

    res.send("ok");
    // console.log(checkPassword)
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onresetPassword");
  }
};
exports.forgetPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { newpassword } = req.body;
    const salt = await bcrypt.genSalt(10);
    const enPassword = await bcrypt.hash(newpassword, salt);

    var user = await User.findOneAndUpdate({ _id: id }, { new: true });
    if (user) {
      const setPassword = await User.findOneAndUpdate(
        { _id: id },
        {
          password: enPassword,
          new: true,
        }
      );
    }

    res.send("ok");
    // console.log(checkPassword)
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onresetPassword");
  }
};

exports.sendSMS = async (req, res) => {
  try {
    const tel = await User.findOne({ username: req.params.id }).select(
      "telnumber"
    );

    if (!tel) {
      return res.status(400).send("not have user");
    }

    let telTo = tel.telnumber.substr(1, 10);
    // console.log(telTo)
    const OTP = String(parseInt(1000 + Math.random() * (10000 - 1000)));
    var client = new twilio(
      "ACcea4d2eb379f658487bac29ac6e217cb",
      "c3789b6ecb6f28a1dda50212bb4f1344"
    );
    const sendto = await client.messages.create({
      to: "+66" + telTo,
      from: "+14699479833",
      body: "รหัสยืนยันของคุณคือ : " + OTP,
    });
    let resOTP = [tel, OTP];

    res.send(resOTP);
  } catch (err) {
    res.status(500).send("send SMS ERROR!!!");
  }
};
