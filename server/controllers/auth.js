const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

// POST register
exports.register = async (req, res) => {
  try {
    // Check User
    const {
      username,
      email,
      password,
      firstname,
      lastname,
      telnumber,
      banknumber,
      bankname,
    } = req.body;
    var user = await User.findOne({ username });
    var emailScheck = await User.findOne({ email });
    if (emailScheck) {
      return res.status(400).send("have_email");
    } else if (user) {
      return res.status(400).send("have_user");
    }
    const salt = await bcrypt.genSalt(10);
    user = new User({
      username,
      email,
      password,
      firstname,
      lastname,
      telnumber,
      banknumber,
      bankname,
    });
    // Encrypt
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.send("register Success");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onRegister");
  }
};

// PORT login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    var user = await User.findOneAndUpdate({ username }, { new: true });
    if (user && user.enabled) {
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Password Invalid!!!");
      }
      myObjectId = user._id;
      myObjectIdString = myObjectId.toString();
      // Payload
      // console.log(myObjectIdString)
      const Payload = {
        user: {
          username: user.username,
          role: user.role,
          iduser: myObjectIdString,
        },
      };
      // Generate Token Time_limit(3600sec)
      jwt.sign(Payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, Payload });
        // console.log(user._id)
      });
    } else {
      return res.status(400).send("User not found!!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! onLogin");
  }
};

// // GET
// exports.listUser = async(req,res)=>{
//     try{
//         // res.send(req.body.username)
//         res.send('List Get User')
//     }catch(err){
//         console.log(err)
//         res.status(500).send('Server Error!')
//     }
// }
// // PUT
// exports.editUser = async(req,res)=>{
//     try{
//         // res.send(req.body.username)
//         res.send('Edit User')
//     }catch(err){
//         console.log(err)
//         res.status(500).send('Server Error!')
//     }
// }
// // DELETE
// exports.deleteUser = async(req,res)=>{
//     try{
//         // res.send(req.body.username)
//         res.send('Remove Get User')
//     }catch(err){
//         console.log(err)
//         res.status(500).send('Server Error!')
//     }
// }

// currentUser

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.iduser })
      .select("-password")
      .exec();
    // console.log("USer: ",user)
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!!! on current user");
  }
};
