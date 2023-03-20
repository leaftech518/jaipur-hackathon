const RequestCardModel = require("../models/RequestCardModel");
const BlogModel = require("../models/BlogModel");
const DonationCardModel = require("../models/DonationCardModel");
const cloudinary = require("cloudinary");
const moment = require("moment");
const TWNModel = require("../models/TWNModel");

exports.createTWN = async (req, res) => {
  const user = req.user
  if(user.role !== "receiver"){
    res.send({
      status : false,
      message : "User is not a receiver!"
    })
  }
  const {
    owner_name,
    city,
    state,
    org_name,
    org_add,
    org_type,
    good_people
  } = req.body;

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

  let timenow = moment().format('MMMM Do YYYY, h:mm:ss a');
  const twn = await TWNModel.create({
    owner_name,
    owner_number : user.phone_number,
    city,
    state,
    created_at : timenow,
    firebase_id : user.firebase_id,
    care_centre: {
      org_name,
      org_add,
      org_type,
      good_people,
      photo : {
        id: result.public_id,
        public_url: result.secure_url,
      }
    },
  });
  if (!twn) {
    return res.send({
      status: false,
      message:
        "something went wrong in creating TWN. Please try after sometime.",
    });
  }

  res.send({
    status: true,
    message: "All set for the receiving donations.",
    twn,
  });
};

exports.postRequirements = async (req, res) => {
  const user = req.user
  if(user.role !== "receiver"){
    res.send({
      status : false,
      message : "User is not a receiver!"
    })
  }

  const receivers =  await TWNModel.find({firebase_id : user.firebase_id})
  const care_centre = receivers[0].care_centre

  const { required_by,food_for,name,number } = req.body;

  const requestCard = await RequestCardModel.create({
    org_name : care_centre.org_name,
    org_add : care_centre.org_add,
    contact_details: {
      name,
      number,
    },
    required_by,
    food_for,
  });

  if(!requestCard) {
    return res.send({
      status: false,
      message:
        "something went wrong in creating request. Please try after sometime.",
    });
  }

  res.send({
    status:true,
    message:"Successfully created your request!!!",
    requestCard
  })
};

exports.postBlog = async (req, res) => {
  const {title,description} = req.body
  let result;
  if (!req.files) {
    return res.send({
      status: false,
      message: "Image is required...!!!",
    });
  }
  if (req.files) {
    result = await cloudinary.v2.uploader.upload(
      req.files.photo_of_the_food.tempFilePath,
      { folder: "hackathon/blog" }
    );
    // console.log("Result of the images here...",result);
  }


  const blog = await BlogModel.create({
      title,
      description,
      photos:{
        id:result.public_id,
        secure_url : result.public_url
      }
  });
};
exports.allOffers = async (req, res) => { // top goodwill point donations
  const user = req.user
  if(user.role !== "receiver"){
    res.send({
      status : false,
      message : "User is not a receiver"
    });
  }
  const allDonations = await DonationCardModel.find().sort({"posted_by.user_goodwill_points" : -1});
  res.send({
    status : true,
    message : "Showing all donation list",
    allDonations
  });
};
