const express = require('express')
const router = express.Router()


const {createImages,removeImages} = require('../controllers/cloudinary')
 const {auth,adminCheck} = require('../midleware/auth')

//@Enpoint http://localhost:5000/api/images
//@Method POST
//@Access Private
router.post('/images',createImages)

//@Enpoint http://localhost:5000/api/images
//@Method POST
//@Access Private
router.post('/removeimages',auth,removeImages)


module.exports = router