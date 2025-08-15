const express = require("express")
const { addUser, editUser, authenticateUser } = require("../controllers/userController")

const router = express.Router()


router.post("/register", addUser)
router.post("/edit", editUser)
router.post("/signin", authenticateUser)

module.exports = router;
