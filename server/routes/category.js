const express = require('express')
const router = express.Router()
const { 

    createAmount,
    listAmount,
    removeAmount,

    listPeriod,
    updatePeriod,
   
    listPrice,
    updatePrice,



 } = require('../controllers/category')
 const {auth,adminCheck} = require('../midleware/auth')

// Amount

//@Enpoint http://localhost:5000/api/amount
router.post('/amount',auth,adminCheck,createAmount)

//@Enpoint http://localhost:5000/api/amount
router.get('/amount',auth,adminCheck,listAmount)

//@Enpoint http://localhost:5000/api/amount
router.delete('/amount/:id',auth,adminCheck,removeAmount)

// Period

//@Enpoint http://localhost:5000/api/period
router.put('/period/:id',auth,adminCheck,updatePeriod)

//@Enpoint http://localhost:5000/api/period
router.get('/period',listPeriod)

// Price

//@Enpoint http://localhost:5000/api/price
router.put('/price/:id',auth,adminCheck,updatePrice)

//@Enpoint http://localhost:5000/api/period
router.get('/price',listPrice)







module.exports = router