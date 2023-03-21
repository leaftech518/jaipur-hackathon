const mongoose = require("mongoose");
const requestCard = mongoose.Schema({
    org_name : {
        type : String
    },
    firebase_id : {
        type : String
    },
    org_add : {
        type : String
    },
    goodwillpoints : {
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
       type : String,
       enum : {
        values : ["lunch","dinner","urgent"],
        message : "Please select only these values"
       }
    },
    posted_ago : {
        type : String
    },
    food_for : {
        type : Number
    },
    message : {
        type : String,
        default : "Thank You!"
    }
});

module.exports = mongoose.model("requestCard",requestCard); 