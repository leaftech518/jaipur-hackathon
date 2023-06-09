const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    firebase_id:{
        type:String
    },
    notification_token :{
        type:String
    },
    phone_number:{
        type:Number
    },
    gender:{
        type:String
    },
    role: {
        type :String,
        default : 'default'
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    good_will_points : {
        type : Number,
    },

});

module.exports = mongoose.model("Room", RoomSchema);