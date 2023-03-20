const RequestCardModel = require("../models/RequestCardModel");
const BlogModel = require("../models/BlogModel");
const BlogModel = require("../models/BlogModel");

exports.createTWN = async (req, res) => {
  const {
    owner_name,
    owner_number,
    city,
    state,
    goodwillpoints,
    org_name,
    org_add,
    org_type,
  } = req.body;

  const twn = await TWNModel.create({
    owner_name,
    owner_number,
    city,
    state,
    goodwillpoints,
    donation_center: {
      org_name,
      org_add,
      org_type,
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
    message: "All set for the donor.",
    twn,
  });
};

exports.postRequirements = async (req, res) => {
  const { org_name, name, number, date, time, food_for, message } = req.body;

  const requestCard = await RequestCardModel.create({
    org_name,
    contact_details: {
      name,
      number,
    },
    required_by: {
      date,
      time,
    },
    food_for,
    message,
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
  })
};
exports.allOffers = async (req, res) => {};
