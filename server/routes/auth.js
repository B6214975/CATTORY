const express = require('express')
const router = express.Router()

//controller
const {register,
    // listUser,
    // editUser,
    // deleteUser,
    login,
    currentUser,
} = require('../controllers/auth')
// middleware
const {auth,adminCheck} = require('../midleware/auth')



//@Enpoint http://localhost:5000/api/register
//@Method POST
//@Access Public
router.post('/register',register)

//@Enpoint http://localhost:5000/api/login
//@Method POST
//@Access Public
router.post('/login',login)

// //@Enpoint http://localhost:5000/api/auth
// //@Method Get
// //@Access Public
// router.get('/auth',listUser)

// //@Enpoint http://localhost:5000/api/auth
// //@Method PUT
// //@Access Public
// router.put('/auth',editUser)

// //@Enpoint http://localhost:5000/api/auth
// //@Method DELETE
// //@Access Public
// router.delete('/auth',deleteUser)


// เช็คสถานะเพื่อไปเก็บใน redux

//@Enpoint http://localhost:5000/api/current-user
//@Method POST
//@Access Private
router.post('/current-user',auth,currentUser)

//@Enpoint http://localhost:5000/api/current-admin
//@Method POST
//@Access Private
router.post('/current-admin',auth,adminCheck,currentUser)


module.exports = router