const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const nodemailer = require("nodemailer");

cloudinary.config({
  cloud_name: "dcntfpntm",
  api_key: "963429939113368",
  api_secret: "-Vp9g6gGPNox2OJ7EzMPCAAxZqU",
});

const addUser = (req, res) => {
  let form = new UserModel(req.body);
  form
    .save()
    .then(() => {
      console.log("User info Saved");
      console.log(form);

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });

      let mailOptions = {
        from: "petertechy01@gmail.com",
        to: [req.body.email, "lanre@almondcareers.com", "olumideferanmi025@gmail.com"],
        subject: "Welcome to my Student Portal",
        html: "<h1>Congratulations!, Your Registration was successful</h1><p>We are excited to have you register on this platform, you can always reach out if you need our help.</p>",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.send({ status: true, message: "Correct Submission", form });
    })
    .catch((err) => {
      console.log(err);
    });
};

const authenticateUser = (req, res) => {
  // console.log(req.body)
  let { password } = req.body;
  UserModel.findOne({ email: req.body.email })
    .then((response) => {
      if (response) {
        //email is valid
        response.validatePassword(password, (err, same) => {
          if (!same) {
            res.send({ status: false, message: "wrong details" });
          } else {
            let token = jwt.sign({ email: req.body.email }, "secret", {
              expiresIn: "2m",
            });
            // console.log(token)
            res.send({ status: true, message: "user logged in", token });
          }
        });
      } else {
        console.log("Wrong Credentials");
        res.send({ status: false, message: "wrong credentials" });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const getDashboard = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  // console.log(token)
  jwt.verify(token, "secret", (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: false, message: "Invalid Token or expired" });
    } else {
      console.log(result);
      res.send({ status: true, message: "Valid Token" });
    }
  });
};

const uploadFile = (req, res) => {
  let file = req.body.file;
  cloudinary.v2.uploader.upload(file, (err, result) => {
    if (err) {
      console.log("File could not upload");
      console.log(err);
    } else {
      console.log("File uploaded successfully");
      let myFile = result.secure_url;
      res.send({ message: "File Uploaded", status: true, myFile });
    }
  });
};

const editUser = () => {};

module.exports = {
  addUser,
  editUser,
  authenticateUser,
  getDashboard,
  uploadFile,
};

//API TESTING
// Thunder Client
// Postman
// Swagger
// Insomnia
