const DonationCardModel = require("../models/DonationCardModel");
const cloudinary = require("cloudinary");
const Donor = require("../models/donorModel");


exports.addDonation = async (req, res) => {
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
      { folder: "hackathon/donation" }
    );
    // console.log("Result of the images here...",result);
  }

  const {
    fooo_from_org,
    food_type,
    food_description,
    food_for,
    picked_time,
    date,
    time,
  } = req.body;
  const donation = await DonationCardModel.create({
    fooo_from_org,
    food_type,
    food_description,
    food_for,
    food_life_time: {
      date,
      time,
    },
    picked_time,
    photo_of_the_food: {
      id: result.public_id,
      public_url: result.secure_url,
    },
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
