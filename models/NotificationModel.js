const mongoose = require("mongoose");
const notification_schema = mongoose.Schema({
    notification_type : {
        type : String
    },
    notification_card : {
        _id: {
            type: mongoose.Schema.ObjectId,
        },
        user_name : {
            type : String
        },
        user_org : {
            type : String
        },
        photo : {
            id : {
                type : String
            },
            public_url : {
                type : String
            }
        },
    },
    otp_notification : {
        otp : {
            type : Number
        },
            
        from_user : {
                _id: {
                    type: mongoose.Schema.ObjectId,
                },
                user_name : {
                    type : String
                },
                user_org : {
                    type : String
                }
        }
    }
    
})