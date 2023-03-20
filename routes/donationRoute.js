const express = require("express")
const { addDonation } = require("../controllers/donationController")
const router = express.Router()

router.route("/post-dontion").post(addDonation)

module.exports = router