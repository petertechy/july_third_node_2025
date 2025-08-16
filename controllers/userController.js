const UserModel = require("../models/userModel");

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
          res.send({status: true, message: "user logged in"})

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

const editUser = () => {};

module.exports = { addUser, editUser, authenticateUser };
