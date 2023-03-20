const mongoose = require("mongoose");

const notificationModel =  new mongoose.Schema({
    tokens : {},
    image : {
        type : String
    },
    typeOfNotification : {
        type : String
    },
    createdAt : {
        type : String
    }
})

module.exports = mongoose.model("notification",notificationModel)