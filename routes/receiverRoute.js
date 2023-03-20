const { isSignedUp } = require("../middleware/user")
const express = require("express")
const { allOffers, createTWN, postRequirements } = require("../controllers/TWNcontroller")
const { reserveDonations } = require("../controllers/reservationController")
const router = express.Router()


router.route("/alldonations/:firebase_id").get(isSignedUp,allOffers)
router.route("/addreceiver/:firebase_id").post(isSignedUp,createTWN)
router.route("/postrequest/:firebase_id").post(isSignedUp,postRequirements)
router.route("/reservation/:firebase_id").post(isSignedUp,reserveDonations)



module.exports = router