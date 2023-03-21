const { isSignedUp } = require("../middleware/user")
const express = require("express")
const { allOffers, createTWN, postRequirements, showrequests } = require("../controllers/TWNcontroller")
const { reserveDonations, verifyDonation, pendingblogs, postBlog } = require("../controllers/reservationController")
const router = express.Router()


router.route("/alldonations/:firebase_id").get(isSignedUp,allOffers)
router.route("/addreceiver/:firebase_id").post(isSignedUp,createTWN)
router.route("/postrequest/:firebase_id").post(isSignedUp,postRequirements)
router.route("/reservation/:firebase_id").post(isSignedUp,reserveDonations)
router.route("/verifydonation/:firebase_id/:donation_card_id").post(isSignedUp,verifyDonation)
router.route("/mypendinglist/:firebase_id").post(isSignedUp,pendingblogs)
router.route("/postblog/:firebase_id").post(isSignedUp,postBlog);
router.route("/allrequests/:firebase_id").get(isSignedUp,showrequests);




module.exports = router