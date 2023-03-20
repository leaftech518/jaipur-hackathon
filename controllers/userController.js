const uesrModel = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const userModel = require("../models/userModel");
const moment = require("moment");
const customError = require("../middleware/customError")

exports.signup = catchAsyncErrors(async(req,res) => {

    let {number,firebase_id,notification_token} = req.body
    if(number === null){
        return res.send({
            status : false,
            message : "Please enter the mobile number"
        });
    }
    if (!firebase_id || !notification_token) {
        return res.send({
          status: false,
          message: "Notifiction_token or firebase_id Number not Found seond",
        });
    }

    const finduser = await userModel.findOne({firebase_id});

    if (finduser) {
        update = {
          notification_token: notification_token,
        };
        const alreadyUser = await userModel.findByIdAndUpdate(
          finduser._id,
          update
        );
  
        return res.send({
          status: true,
          message: "user already exits",
        });
    }

    let timenow = moment().format('MMMM Do YYYY, h:mm:ss a');
    const user = await uesrModel.create({
        phone_number : number,
        notification_token,
        firebase_id,
        createdAt:timenow
    });

    // const users = await userModel.find({ role : "admin"});
    // let tokenArray = [];
    // for (let index = 0; index < users.length; index++) {
    //     const user = users[index];
    //     tokenArray.push(user.notification_token);
    //   }
  
    //   if (tokenArray.length >= 1) {
    //     sendSignupNotificationToAdmin(tokenArray, req.body.name, req.body.phone_number);
    // }
    if(user){
        res.send({
            status: true,
            message: "User created successfully!",
        });
    }else{
        res.send({
            status : true,
            message : "User registration failed"
        });
    }
      
});

exports.updateRole = async(req,res) => {
    const user = req.user;
    let role = req.body.role

    if(!role){
        res.send({
            status : false,
            message : "Please enter the role"
        });
    }
    const updateUser = await userModel.findByIdAndUpdate(user._id,{role},{new : true});
    if (!updateUser) {
        return res.send({
          status: true,
          message: "Something is wrong in updating user!",
        });
      }else{
        res.send({
            status: true,
            message: "User is updated successfully!",
        });
      }
    
}

