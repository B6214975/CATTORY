const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
// const dotenv = require('dotenv')
const {readdirSync} = require('fs')
require('dotenv').config()
const connectDB = require('./config/db')


const app = express()

// connectDB
connectDB()

//midleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())

//Route
// app.use('/api',require('./routes/api'))
readdirSync('./routes').map((r)=>app.use('/api',require('./routes/'+r)))



const port = process.env.PORT
app.listen(port,()=>{
    console.log('Server run on port 5000')
})
