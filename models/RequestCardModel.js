const mongoose = require("mongoose");
const requestCard = mongoose.Schema({
    org_name : {
        type : String
    },
    owner_name : {
        type : String
    },
    owner_number : {
        type : Number
    },
    contact_details : {
        name : {
            type : String
        },
        number : {
            type : Number
        }
    },
    required_by : {
        date : {
            type : String
        },
        time : {
            type : String
        }
    },
    posted_ago : {
        type : String
    },
    food_for : {
        type : Number
    },
    message : {
        type : String
    }
});

module.exports = mongoose.model("requestCard",requestCard);