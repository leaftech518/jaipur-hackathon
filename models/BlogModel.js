const mongoose = require("mongoose");
const blogs = mongoose.Schema({
  photo: {
    id: {
      type: String,
    },
    public_url: {
      type: String,
    },
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  posted_time: {
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  clicks: {
    type: Number,
    default:1
  },
  shareCount: {
    type: Number,
  },
  blog_for: {
    card_number: {
      type: Number,
    },
    org_name: {
      type: String,
    },
    org_add: {
      type: String,
    },
  },
  published_by: {
    firebase_id: {
      type: String
    },
    name: {
      type: String,
    },
    org_name: {
      type: String,
    },
  },
  published : {
    type : Boolean,
    default : false
  },
  card_number : {
    type : Number
  },
});

module.exports = mongoose.model("blogs", blogs);
