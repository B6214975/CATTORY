const generatePayload = require("promptpay-qr");
const qrcode = require("qrcode");
const fs = require("fs");

exports.createQRcode = async (req, res) => {
  try {
    const { total } = req.body;
    // console.log("ttttooooo :",total);
    const mobileNumber = "093-002-0483";
    const amount = parseInt(total);
    const payload = generatePayload(mobileNumber, { amount });

    qrcode.toDataURL(payload, (err, url) => {
      if (err) return console.log(err);
      res.send(url);
    });

    console.log("ok QR :");
  } catch (err) {
    console.log(err);
    res.status(500).send("create QR Error!!!");
  }
};
