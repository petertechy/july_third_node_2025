const express = require("express")
const { addUser, editUser, authenticateUser, getDashboard, uploadFile } = require("../controllers/userController")

const router = express.Router()


router.post("/register", addUser)
router.post("/edit", editUser)
router.post("/signin", authenticateUser)
router.get("/dashboard", getDashboard)
router.post("/upload", uploadFile)

module.exports = router;