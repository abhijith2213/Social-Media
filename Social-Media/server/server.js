require("dotenv").config();

const express = require('express')
const server = express()
const userRouter = require('./Routes/user')
const adminRouter = require('./Routes/admin')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const port = process.env.PORT
const {connectDb} = require('./config/connections')


server.use(express.json())
server.use(bodyParser.urlencoded({extended:true}))

server.use(cors())


server.use('/images',express.static(path.join(__dirname,'public/images')))

/* ---------------------------------- Routes --------------------------------- */

server.use('/',userRouter)
server.use('/admin',adminRouter)

/* ---------------------------- Connect Database ---------------------------- */

connectDb();

/* ------------------------------ PORT SETTING ------------------------------ */

server.listen(port,()=>{
    console.log('Server Started Successfully!');
})


module.exports = server;