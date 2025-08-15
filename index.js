const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const PORT = 5000
const userRoute = require("./routes/user.route")
// app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json());
app.use(cors())
app.use("/", userRoute)

const URI = "mongodb+srv://petertechy01:Olanrewaju@my-project.w3cyijl.mongodb.net/student_db?retryWrites=true&w=majority&appName=my-project"
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
