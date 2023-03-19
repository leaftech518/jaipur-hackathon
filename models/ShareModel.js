const mongoose = require("mongoose");
const shared = mongoose.Schema({
   
      shared_by: {
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
     
      shared_blog : {
        type : mongoose.Schema.Types.ObjectId
      },
      sharedAt : {
        type : String
    },
    
});

module.exports = mongoose.model("shared",shared);