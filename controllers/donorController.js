const donorModel = require("../models/donorModel");
const userModel = require("../models/userModel");
const moment = require("moment")
const cloudinary = require("cloudinary");

exports.createDonor = async (req, res) => {
    // get the user and check if the user is donor or not
    const user = req.user
    if(user.role !== "Donor"){
        res.send({
            status : false,
            message : "User is not a Donor!"
        });
    }
    const firebase_id = user.firebase_id
    const {
      owner_name,
      city,
      state,
      org_name,
      org_add,
      org_type,
    } = req.body;
    
    if( !owner_name || !city || !state || !org_add || !org_name || !org_type){
        res.send({
            status : false,
            message : "Please enter all the details"
        });
    }
    if (!req.files) {
        return res.send({
          status: true,
          message: "Picture not found!",
        });
    }
  
      let result;
  
      let file = req.files.photo;
      result = await cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "hackathon/donor_org" }
      );
      let timenow = moment().format('MMMM Do YYYY, h:mm:ss a');

    const newdonor = await donorModel.create({
      owner_name,
      firebase_id,
      owner_number : user.phone_number,
      city,
      state,
      photo : {
        id: result.public_id,
        secure_url: result.secure_url,
      },
      donation_centre :  {
        org_name : req.body.org_name,
        org_add : req.body.org_add,
        org_type : req.body.org_type
      },
       created_at:timenow
    });
    if (!newdonor) {
      return res.send({
        status: false,
        message:
          "something went wrong in creating donor. Please try after sometime.",
      });
    }
  
    res.send({
      status: true,
      message: "All set for the donation.",
      newdonor,
    });

  };