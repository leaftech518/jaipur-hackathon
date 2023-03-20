const { signup, updateRole} = require("../controllers/userController");
const { isSignedUp, customRole } = require("../middleware/user")

const router = require("express").Router()
// hello testing server

router.route("/signup").post(signup)
router.route("/updaterole/:firebase_id").put(isSignedUp,updateRole)

module.exports = router