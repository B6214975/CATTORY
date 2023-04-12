const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    // const { name } = req.body;
    const product = await new Product(req.body).save();
    res.send(product);
    console.log(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onCreate Product");
  }
};
exports.list = async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    //console.log(count)
    const product = await Product.find({ status: "ready" })
      .limit(count)
      .sort([["createdAt", "desc"]]);
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onList Product");
  }
};

exports.listAllforAdmin = async (req, res) => {
  try {
    // const {date} = req.body
    console.log("date :: ", req.params.date);
    // const count = parseInt(req.params.count);
    // // //console.log(count)
    const product = await Product.find({ period: req.params.date }).sort([
      ["createdAt", "desc"],
    ]);
    res.send(product);
    // console.log(product)
    // res.send('date')
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onList Product");
  }
};
exports.listAll = async (req, res) => {
  try {
    // const count = parseInt(req.params.count);
    // console.log(count) -- {status:'ready'}
    const product = await Product.find({ status: "ready" })
      // .limit(count)
      .sort([["createdAt", "desc"]]);
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onList Product");
  }
};

exports.remove = async (req, res) => {
  try {
    const cart = await Cart.find().exec();
    const ProIncart = [];
    if(cart.length != 0){
      cart.map((Citem)=>{
        Citem.products.map((item) => {
        if (item.product.toString() == req.params.id) {
          ProIncart.push(item);
        }
      });
      })
      
    }

    console.log(ProIncart.length)
    if (ProIncart.length == 0) {
      const deleted = await Product.findOneAndRemove({
        _id: req.params.id,
      }).exec();
      res.send(deleted);
      // res.send("nothave");
    } else {
      res.send("haveIncart");
    }

    // res.send(req.params.id);
    // console.log(req.params.id)
  } catch (err) {
    res.status(500).send("Remove Product Error!!!");
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onUpdate Product");
  }
};

exports.searchFilters = async (req, res) => {
  const value = req.body;
  let search = "";
  const productSearch = [];
  const product = [];
  console.log("values: ", Object.values(value));
  for (let i = 0; i < Object.keys(value).length; i++) {
    if (Object.values(value)[i] == "") {
      search = search + "x";
    } else {
      search = search + Object.values(value)[i];
    }
  }

  console.log("search : ", search);

  var arr = await Product.find();
  for (var i = 0; i < arr.length; i++) {
    for (let j = 0; j < search.length; j++) {
      if (search[j] != "x") {
        if (arr[i].title[j] == search[j]) {
          productSearch[i] = arr[i];
        } else {
          productSearch[i] = "";
          break;
        }
      }
    }
  }

  for (let j = 0; j < productSearch.length; j++) {
    if (productSearch[j] != "") {
      // console.log(productSearch[j])
      product.push(productSearch[j]);
    }
  }

  console.log("after", product);
  res.send(product);
};

exports.read = async (req, res) => {
  try {
    const title = await Product.findOne({ _id: req.params.id })
      .select('title')
      .exec();
    res.send(title);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onRead Product");
  }
};

// exports.listBy = async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;

//     const product = await Product.find()
//       .limit(limit)
//       .populate("category")
//       .sort([[sort, order]]);
//     res.send(product);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Server Error!!! onListBy Product");
//   }
// };

// //searchFilters
// const handleQuery = async (req, res, query) => {
//   let product = await Product.find({ $text: { $search: query } })
//   .populate("category","_id name")
//   res.send(product)
// };
// const handleCategory = async (req, res, category) => {
//   let product = await Product.find({category})
//   .populate("category","_id name")
//   res.send(product)
// };
// const handlePrice = async (req, res, price) => {
//   let product = await Product.find({
//     price:{
//       $gte:price[0],
//       $lte:price[1]
//     }
//   })
//   .populate("category","_id name")
//   res.send(product)
// };
