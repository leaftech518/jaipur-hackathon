const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const CustomError = require("../utils/customError");

/*we want a method to get the req.user to check everytime
gorav can send firebaseUID anytime we want so we are trying to 
link each user and its activity through that firebaseUID
instead of token and findById we will use firebaseUID and findone
*/
exports.isSignedUp = async (req, res, next) => {
  const fid = req.params.firebase_id;
  if (!fid) {
    return CustomError(new CustomError("User not found", 403));
  }

  const userFid = await userModel.find({ firebase_id: fid });
  req.user = userFid[0];
  next();
};

/*
make customRole function to check the user role
*/
exports.customRole = (roles) => {
  return (req, res, next) => {
    const role = req.user.role;
    if (roles !== role) {
      return next(
        new CustomError("User not allowed to access this resource", 400)
      );
    }
    next();
  };
};
