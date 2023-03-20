const mongoose = require("mongoose");



const connectWithDb = () => {
  mongoose.set('strictQuery',true)
  mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Database connected");
  }).catch((error) => {
    console.log("connection error in database " + error)
  })

  
};

module.exports = connectWithDb;
