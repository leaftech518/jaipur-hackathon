const mongoose = require("mongoose");
const OTPSchema = mongoose.Schema({
    OTP : {
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
    },
    
    to_user : {
        _id: {
            type: mongoose.Schema.ObjectId,
        },
        user_name : {
            type : String
        },
        user_org : {
            type : String
        }
    },
    OTP_time_line :{
        created_at : {
            type : String
        },
        verfied_at : {
            type : String
        }
    },
    verified : {
        type : Boolean
    }
});

module.exports = mongoose.model("OTP", OTPSchema);