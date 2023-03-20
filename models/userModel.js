const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    firebase_id:{
        type:String
    },
    notification_token :{
        type:String
    },
    phone_number:{
        type:Number
    },
    role: {
        type :String,
        default : 'default'
    },
    createdAt : {
        type : String
    }
   
});

module.exports = mongoose.model("user", userSchema);