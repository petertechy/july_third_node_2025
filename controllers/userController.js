const UserModel = require("../models/userModel");

const addUser = (req, res) => {
  let form = new UserModel(req.body);
  form.save().then(() => {
    console.log("User info Saved");
    console.log(form);
    res.send({ status: true, message: "Correct Submission", form });
  });
};

const editUser = () => {};

module.exports = { addUser, editUser };