const DonationCardModel = require("../models/DonationCardModel");
const cloudinary = require("cloudinary");
const donorModel = require("../models/donorModel");
const moment = require("moment");


exports.addDonation = async (req, res) => {

  const user = req.user
  if(user.role !== "Donor"){
    res.send({
      status : false,
      message : "User is not a donor"
    });
  }
  const donor = await donorModel.find({firebase_id : user.firebase_id})
  let org = donor[0].donation_centre
  let posted_by = {
    user_id : donor[0]._id,
    user_name : donor[0].owner_name,
    user_number : donor[0].owner_number,
    user_goodwill_points : donor[0].goodwillpoints
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
    { folder: "hackathon/donations" }
  );

  // alot a card number to a donation card to stay unique and use it to upload blog 
  // put reserved flags and picked flag to false which should be later updated when task completed
  const cardnumber = Math.floor(1000 + Math.random() * 9000);
 
  const {
    food_type,
    food_description,
    food_for,
    pick_up_time,
    food_life_time
  } = req.body;
  let reserved,picked,blog_posted = false
  let timenow = moment().format('MMMM Do YYYY, h:mm:ss a');
  const donation = await DonationCardModel.create({
    donation_centre:org,
    posted_by, 
    food_type,
    food_description,
    food_for,
    food_life_time,
    pick_up_details :{
      pick_up_time,
      picked 
    },
    card_number : cardnumber,
    reserved,
    blog_posted,
    photo_of_the_food: {
      id: result.public_id,
      public_url: result.secure_url,
    },
    post_time : timenow
  });
  if (!donation) {
    return res.send({
      status: false,
      message: "Something is went wrong in adding your donation...",
    });
  }
  res.send({
    status: true,
    message: "Donation added successfully!!!",
    donation,
  });
};

exports.getBlog = async (req, res) => {};
