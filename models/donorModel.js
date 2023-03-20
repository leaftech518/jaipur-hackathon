const mongoose = require("mongoose");
const donor = mongoose.Schema({
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
  photo: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    }
  },
  goodwillpoints : {
        type : Number,
        default : 1
  },
  created_at : {
        type : String
  },
  mention_count : {
        type : Number,
        default : 0
  },
  donation_centre :  {
            org_name : {
                type : String
            },
            org_add : {
                type : String
            },
            org_type : {
                type : String
            }
    },
    total_donations : {
        type : Number,
        default : 0
    }

});

module.exports = mongoose.model("donor", donor);
