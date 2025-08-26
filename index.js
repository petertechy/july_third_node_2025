const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const userRoute = require("./routes/user.route")
require('dotenv').config()
const PORT = process.env.PORT
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json({limit: "30mb"}));
app.use(cors())
app.use("/", userRoute)

const URI = process.env.MONGODB_URI
mongoose.connect(URI)
.then(()=>{
    console.log("Mongodb iyaf connected successfully");
})
.catch((err)=>{
    console.log(err)
})

app.listen(PORT, ()=>{
    console.log("Server is running")
})