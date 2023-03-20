const { isSignedUp } = require("../middleware/user")
const express = require("express")
const { allOffers, createTWN, postRequirements } = require("../controllers/TWNcontroller")
const router = express.Router()


router.route("/alldonations/:firebase_id").get(isSignedUp,allOffers)
router.route("/addreceiver/:firebase_id").post(isSignedUp,createTWN)
router.route("/postrequest/:firebase_id").post(isSignedUp,postRequirements)



module.exports = router