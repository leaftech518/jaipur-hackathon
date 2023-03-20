const mongoose = require("mongoose");

const notificationModel =  new mongoose.Schema({
    token : {
        type : String,
    },
    tokens : {},
    body : {
        type : String
    },
    title : {
        type : String
    },
    card_number : {
        type : Number
    },
    donationcard_id : {
        type: mongoose.Schema.ObjectId,
        ref : "donationCard"
    },
    typeOfNotification : {
        type : String
    },
    sentAt : {
        type : String
    }
})

module.exports = mongoose.model("notification",notificationModel)