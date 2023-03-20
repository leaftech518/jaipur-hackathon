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
  photos: {
    id: {
      type: String,
    },
    secure_url: {
      type: String,
    },
  },

  goodwillpoints: {
    type: Number,
    default: 1,
  },
  created_at: {
    date: {
      type: String,
    },
    time: {
      type: String,
    },
  },
  mention_count: {
    type: Number,
  },
  donation_centre: [
    // max 3 centres
    {
      org_name: {
        type: String,
      },
      org_add: {
        type: String,
      },
      org_type: {
        type: String,
      },
    },
  ],
  total_donations: {
    type: Number,
  },
});
