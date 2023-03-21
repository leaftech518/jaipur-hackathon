require("dotenv").config();
const app = require("./app");
const connectWithDb = require("./config/db_conn");
const cloudinary = require("cloudinary");

// connect with DB
connectWithDb();
// cloudinary  config goes here
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT || 7070, () =>
console.log(`Server is running at port 7070`)
);



//Unhandled Promise Rejection
process.on("unhandledRejection", (err)=>{
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to unHandled Promise Rejection`);

  server.close( ( ) =>{
      process.exit(1);
  });
})

