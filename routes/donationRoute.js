const express = require("express")
const { addDonation } = require("../controllers/donationController")
const { createDonor } = require("../controllers/donorController")
const { isSignedUp } = require("../middleware/user")
const router = express.Router()

router.route("/postdonation/:firebase_id").post(isSignedUp,addDonation)
router.route("/newdonor/:firebase_id").post(isSignedUp,createDonor)


module.exports = router