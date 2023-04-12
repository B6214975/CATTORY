
const Amount = require('../models/Amount')
const Period = require('../models/Period')
const Price = require('../models/Price')



exports.createAmount = async (req, res) => {
  try {
    const { amount } = req.body;
    // console.log(amount)
    var amountSet = await Amount.findOne({amount})
        if(amountSet){
            return res.status(400).send('have_amount')
        }
    amountSet = await new Amount({ amount }).save();
    res.send(amountSet);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onCreate Amount");
  }
};
exports.listAmount = async (req, res) => {
  try {
    const amountSet = await Amount.find({})
    .sort([["amount", "asc"]]).exec();
    res.send(amountSet);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onList Amount");
  }
};
exports.removeAmount = async (req, res) => {
  try {
    const id = req.params.id;
    const amountSet = await Amount.findOneAndDelete({ _id: id });
    res.send(amountSet);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onRemove Amount");
  }
};

// period 

exports.updatePeriod = async (req, res) => {
  try {
    const id = req.params.id;
    const {newDate}  = req.body;
    // console.log(newDate)
    const period = await Period.findOneAndUpdate(
      { _id: id },
      { date: newDate }
    );
    res.send(period);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onUpdate Period");
  }
};

exports.listPeriod = async (req, res) => {
  try {
    const period = await Period.find({}).exec();
    res.send(period);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onList Period");
  }
};
// price

exports.updatePrice = async (req, res) => {
  try {
    const id = req.params.id;
    const {newPrice}  = req.body;
    // console.log(newP)
    const price = await Price.findOneAndUpdate(
      { _id: id },
      { price: newPrice }
    );
    res.send(price);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onUpdate Price");
  }
};

exports.listPrice = async (req, res) => {
  try {
    const price = await Price.find({}).exec();
    res.send(price);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onList Price");
  }
};




