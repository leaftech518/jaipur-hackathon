const mongoose = require("mongoose");
const reservation_list = mongoose.Schema({
   
      reserved_by: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TWN",
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
module.exports = mongoose.model("reservation_list",reservation_list);