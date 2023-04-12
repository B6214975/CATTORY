const express = require('express')
const router = express.Router()

const {
    create,
    list,
    listAll,
    remove,
    update,
    listAllforAdmin,

    read,
    // listBy,
    searchFilters,
} = require('../controllers/product')


 const {auth,adminCheck} = require('../midleware/auth')

//@Enpoint http://localhost:5000/api/product
//@Method POST
//@Access Private
router.post('/product',auth,adminCheck,create)

//@Enpoint http://localhost:5000/api/product
//@Method GET
//@Access Private
router.get('/product/:count',list)

//@Enpoint http://localhost:5000/api/product
//@Method GET
//@Access Private
router.get('/product/',listAll)

//@Enpoint http://localhost:5000/api/admin/product/
//@Method GET
//@Access Private
router.get('/admin/product/:date',listAllforAdmin)

//@Enpoint http://localhost:5000/api/product
//@Method DELETE
//@Access Private
router.delete('/product/:id',auth,adminCheck,remove)

//@Enpoint http://localhost:5000/api/products
//@Method PUT
//@Access Public
router.put('/product/:id',auth,adminCheck,update)

//@Enpoint http://localhost:5000/api/products
//@Method GET
//@Access Public
router.get('/products/title/:id',read)

// //Update
// //listBy...
// router.post('/productby',listBy)

//search
//@Enpoint http://localhost:5000/api/search/filters
//@Method POST
//@Access Public
router.post('/search/filters',searchFilters)




module.exports = router