const mongoose = require("mongoose");
const donor = mongoose.Schema({
  owner_name: {
    type: String,
  },
  owner_number: {
    type: Number,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  good_people: {
    // number of Poeple who need help
    type: Number,
  },
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
  goodwillpoints: {
    type: Number,
    default: 100,
  },
  created_at: {
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },

  care_centre: [
    // max 3 centres
    {
      org_name: {
        type: String,
      },
      org_add: {
        type: String,
      },
      org_type: {
        // drop down
        type: String,
      },
    },
  ],
  blogs_posted: {
    type: Number,
  },
  total_received: {
    type: Number,
  },
});
