const mongoose = require("mongoose");
const reservation_list = mongoose.Schema({
   
      reserved_by: {
        firebase_id : {
          type : String
        },
        user_name: {
          type: String,
        },
        org_name:{
          type : String
        },
        user_number: {
          type: Number,
        },
      },
      card_number : {
        type : Number
      },
      donation_card: {
        type:mongoose.Schema.Types.ObjectId
      },
      reservedAt : {
       type : String
    },
    
});
module.exports = mongoose.model("reservation_list",reservation_list);