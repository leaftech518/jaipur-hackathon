const { signup} = require("../controller/userController")
const { isSignedUp, customRole } = require("../middleware/user")

const router = require("express").Router()
// hello testing server

router.route("/signup").post(signup)

module.exports = router