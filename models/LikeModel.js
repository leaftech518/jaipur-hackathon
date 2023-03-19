const mongoose = require("mongoose");
const liked = mongoose.Schema({
    blogs_liked : [
        {
            blog_id : {
                type : mongoose.Schema.ObjectId,
            }
        }
    ],
    liked_by : {
        user_id  : { 
            type: mongoose.Schema.ObjectId,
        },
        user_name : {
            type : String
        }
    },
    user_firebase_id : {
        type : String
    }
})