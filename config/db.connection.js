const mongoose = require('mongoose');
require('dotenv').config();
const connectionString = 'mongodb://localhost:27017/projectly'

mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

mongoose.connection.on("connected",()=>{
    console.log("....connected")
})

mongoose.connection.on('error',(error)=>{
    console.log("....error",error)
})

mongoose.connection.on("disconnected",()=>{
    console.log("....disconnected")
})
