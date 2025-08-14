const express = require("express")
const { addUser, editUser } = require("../controllers/userController")

const router = express.Router()


router.post("/register", addUser)
router.post("/edit", editUser)

module.exports = router;