const mongoose =  require("mongoose");
const blogs = mongoose.Schema({
    photos: [
        {
          id: {
            type: String,
          },
          secure_url: {
            type: String,
          },
        },
    ],
    title : {
        type : String
    },
    description : {
        type : String
    },
    posted_time : {
        date : {
            type : String
        },
        time : {
            type : String
        }
    },
    clicks : {
        type : Number
    },
    shareCount : {
        type : Number
    },
    blog_for : {
        card_number : {
            type : Number
        },
        org_name : {
            type : String
        },
        org_add : {
            type : String
        }
    },
    published_by : {
        _id : {
            type: mongoose.Schema.ObjectId,
            ref : "TWN"
        },
        name : {
            type : String
        },
        org_name : {
            type : String
        }
    }
});

module.exports = mongoose.model("blogs",blogs);