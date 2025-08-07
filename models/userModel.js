const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String, 
    password: String
})

let UserModel = mongoose.model(
    "student_collection",
    userSchema
  );

  module.exports = UserModel