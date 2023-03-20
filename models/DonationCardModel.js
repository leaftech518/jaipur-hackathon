const mongoose = require("mongoose");
const donationCard = mongoose.Schema({
    donation_centre :  {
        org_name : {
            type : String
        },
        org_add : {
            type : String
        },
        org_type : {
            type : String
        }
    },
    posted_by : {
        user_id : {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
        firebase_id : {
            type : String
        },
        user_name : {
            type : String
        },
        user_number : {
            type : String
        },
        user_goodwill_points : {
            type : Number
        }
    },
    food_type : {
        type : String,
        enum : {
            values : ["raw food","cooked meal","others"],
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
   pick_up_details : {
        picked : {
            type : Boolean
        },
        picked_time : {
            type : String
        },
        pick_up_time : {
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
   },
   post_time : {
    type : String
   },
   blog_posted : {
    type : Boolean
   }

});

module.exports = mongoose.model("donationCard", donationCard);