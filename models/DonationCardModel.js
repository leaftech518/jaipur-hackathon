const mongoose = require("mongoose");
const donationCard = mongoose.Schema({
    food_from_org : { // org name
        type : String
    },
    owner_name : {
        type :String
    },
    owner_number :{
        type : Number
    },
    add_of_org  : {
        type : String
    },
    food_type : {
        type : String,
        enum : {
            values : ["raw material","cooked food","others"],
            message : "Please select from the following category"
        }
    },
    food_description : {
        type : String
    },
    food_for : {
        type : Number
    },
    food_life_time : {
        date : {
            type : String
        },
        time : {
            type : String
        }
    },
    photo_of_the_food : {
        id : {
            type : String
        },
        public_url : {
            type : String
        }
    },
   pick_up_details : {
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
   },
   reserved :{
    type : Boolean
   },
   card_number : {
    type : Number
   }

});

module.exports = mongoose.model("donationCard", donationCard);