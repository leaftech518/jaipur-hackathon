const mongoose = require("mongoose");
const all_complete_donations = mongoose.Schema({
   
      reserved_by: {
        firebase_id : {
          type : String
        },
        user_name: {
          type: String,
        },
        user_number: {
          type: Number,
        },
      },
     
      donation_cards: [{type:mongoose.Schema.Types.ObjectId}],
      reservedAt : {
       type : String
    },
    
});

module.exports = mongoose.model("all donations",all_complete_donations)