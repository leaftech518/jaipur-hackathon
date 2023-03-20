const mongoose = require("mongoose");
const TWN = mongoose.Schema({
  owner_name: {
    type: String,
  },
  owner_number: {
    type: Number,
  },
  firebase_id : {
    type : String
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  goodwillpoints: {
    type: Number,
    default: 100,
  },
  created_at: {
   type : String
  },
  care_centre :
        {
            org_name : {
                type : String
            },
            org_add : {
                type : String
            },
            org_type : { // drop down
                type : String
            },
            good_people : { // number of Poeple who need help
              type : Number
            },
            photo:
            {
              id: {
                type: String,
              },
              secure_url: {
                type: String,
              },
            }
    },
    blogs_posted : {
        type : Number,
        default : 0
    },
    total_received : {
        type : Number,
        default : 0
    }

});

module.exports = mongoose.model("receiver",TWN)