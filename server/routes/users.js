const express = require("express");
const router = express.Router();
const {
  listUsers,
  changeRole,
  changeStatus,
  deleteUsers,
  listUsersBy,
  updateUser,
  resetPassword,
  // changeROle,
  // readUsers,

  userCart,
  getUserCart,

  saveOrder,
  emptyCart,
  getOrder,

  sendSMS,
  forgetPassword,
  
  // saveAdress,
  // addToWishList,
  // getWishList,
  // removeWishList,

} = require("../controllers/users");

//controller

// middleware
const { auth, adminCheck } = require("../midleware/auth");

//@Enpoint http://localhost:5000/api/users
//@Method GET
//@Access Private
router.get("/users", auth, adminCheck, listUsers);

//@Enpoint http://localhost:5000/api/change-role
//@Method UPDATE
//@Access Private
router.post("/change-role", auth, adminCheck, changeRole);

//@Enpoint http://localhost:5000/api/change-status
//@Method UPDATE
//@Access Private
router.post("/change-status", auth, adminCheck, changeStatus);

//@Enpoint http://localhost:5000/api/users/:id
//@Method DELETE
//@Access Private
router.delete("/users/:id", auth, adminCheck, deleteUsers);

//@Enpoint http://localhost:5000/api/users
//@Method GET
//@Access Private
router.get("/users/:id", auth, listUsersBy);

//@Enpoint http://localhost:5000/api/user/cart
//@Method POST
//@Access Private
router.post("/user/cart", auth, userCart);

//@Enpoint http://localhost:5000/api/user/cart
//@Method GET
//@Access Private
router.get("/user/cart", auth, getUserCart);

//@Enpoint http://localhost:5000/api/user/order
//@Method POST/GET
//@Access Private
router.post("/user/order", auth, saveOrder);
router.get('/user/orders',auth,getOrder)

//@Enpoint http://localhost:5000/api/user/cart
//@Method DELETE
//@Access Private
router.delete("/user/cart", auth, emptyCart);

// //@Enpoint http://localhost:5000/api/users/:id
// //@Method GET // เอา listUserBy มาทำตรงนี้ -------------
// //@Access Private
// router.get('/users/:id',readUsers)

//@Enpoint http://localhost:5000/api/users/:id
//@Method PUT
//@Access Private
router.put('/users/updateuser/:id',auth,updateUser)

//@Enpoint http://localhost:5000/api/users/:id
//@Method PUT
//@Access Private
router.put('/users/resetpassword/:id',auth,resetPassword)


//@Enpoint http://localhost:5000/api/users/:id
//@Method PUT
//@Access Private
router.put('/users/forgetpassword/:id',forgetPassword)


//@Enpoint http://localhost:5000/api/sendsms
//@Method get
//@Access puclic
router.get('/sendsms/:id',sendSMS)

// //@Enpoint http://localhost:5000/api/user/address
// //@Method POST
// //@Access Private
// router.post('/user/address',auth,saveAdress)

// //@Enpoint http://localhost:5000/api/user/wishlist
// //@Method POST,GET,DELETE
// //@Access Private
// router.post('/user/wishlist',auth,addToWishList)
// router.get('/user/wishlist',auth,getWishList)
// router.put('/user/wishlist/:productId',auth,removeWishList)

module.exports = router;
