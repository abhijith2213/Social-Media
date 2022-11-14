require("dotenv").config();

const express = require('express')
const server = express()
const userRouter = require('./Routes/user')
const adminRouter = require('./Routes/admin')
const bodyParser = require('body-parser')
const cors = require('cors')

server.use(express.json())
server.use(bodyParser.urlencoded({extended:true}))

server.use(cors())

/* ---------------------------------- Routes --------------------------------- */

server.use('/',userRouter)
server.use('/admin',adminRouter)

/* ---------------------------- Connect Database ---------------------------- */

const {connectDb} = require('./config/connections')
connectDb();

/* ------------------------------ PORT SETTING ------------------------------ */

const port = process.env.PORT
server.listen(port,()=>{
    console.log('Server Started Successfully!');
})


module.exports = server;