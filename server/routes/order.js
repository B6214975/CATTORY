const express = require("express");
const router = express.Router();

const { changeOrderStatus, 
    getOrderAdmin,

 } = require("../controllers/order");
 const {createQRcode} =require('../controllers/qrcode')

// middleware
const { auth, adminCheck } = require("../midleware/auth");

//@Enpoint http://localhost:5000/api/admon/order-status
//@Method PUT
//@Access Private
router.put("/admin/order-status", auth, adminCheck, changeOrderStatus);

//@Enpoint http://localhost:5000/api/admon/admin/orders
//@Method GET
//@Access Private
router.get("/admin/orders", auth, adminCheck, getOrderAdmin);

//@Enpoint http://localhost:5000/api/qrcode
//@Method POST
//@Access Private
router.post('/qrcode',createQRcode)


module.exports = router;
