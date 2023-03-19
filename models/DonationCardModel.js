const mongoose = require("mongoose");
const donationCard = mongoose.Schema({
    food_from_org : { // org name
        type : String
    },
    add_of_org  : {
        type : String
    },
    food_for : {
        type : Number
    },
    pick_up_time : {
        type : String
    },
    photo_of_the_food : {
        id : {
            type : String
        },
        public_url : {
            type : String
        }
    },
    picked : {
        type : Boolean
    },
    picked_time : {
        type : String
    },
    picked_by : {
        type : String
    },
    card_otp : {
        type : Number
    }

})