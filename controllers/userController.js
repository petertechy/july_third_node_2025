const UserModel = require("../models/userModel");
const jwt = require('jsonwebtoken')

const addUser = (req, res) => {
  let form = new UserModel(req.body);
  form.save().then(() => {
    console.log("User info Saved");
    console.log(form);
    res.send({ status: true, message: "Correct Submission", form });
  });
};

const authenticateUser = (req, res) =>{
  // console.log(req.body)
  let {password} = req.body
  UserModel.findOne({email: req.body.email})
  .then((response)=>{
    if(response){
      //email is valid
      response.validatePassword(password,(err, same)=>{
        if(!same){
          res.send({status: false, message: "wrong details"})
        }else{
          let token = jwt.sign({email: req.body.email}, "secret", {expiresIn: "2m"})
          // console.log(token)
          res.send({status: true, message: "user logged in", token})

        }
      })
    }else{
      console.log("Wrong Credentials")
      res.send({status: false, message: "wrong credentials"})
    }
  })
  .catch((error)=>{
    console.log(error)
  })
}

const getDashboard = (req, res)=>{
let token =   req.headers.authorization.split(" ")[1]
  // console.log(token)
  jwt.verify(token, "secret", (err, result)=>{
    if(err){
      console.log(err)
      res.send({status:false, message: "Invalid Token or expired"})
    }else{
      console.log(result)
      res.send({status:true, message: "Valid Token"})
    }
  })

}

const editUser = () => {};

module.exports = { addUser, editUser, authenticateUser, getDashboard };
