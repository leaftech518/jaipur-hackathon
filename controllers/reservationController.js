const DonationCardModel = require("../models/DonationCardModel");
const moment = require("moment");
const TWNModel = require("../models/TWNModel");
const reservationModel = require("../models/ReservationModel")
const notification = require("../models/Notifications");
const userModel = require("../models/userModel");
const { sendReservationNotification, sendBlogNotification } = require("../middleware/notification");
const blogsModel = require("../models/BlogModel");
const { async } = require("@firebase/util");
const cloudinary =  require("cloudinary")
const donorModel = require("../models/donorModel");


exports.reserveDonations = async(req,res) => {
    const user = req.user
    if(user.role !== "receiver"){
         res.send({
            status : false,
            message : "User is not a receiver!"
         });
    }
    const receiver = await TWNModel.find({firebase_id : user.firebase_id});
    const name = receiver[0].owner_name
    const org_name = receiver[0].care_centre.org_name
    let reservation_list_off = [];
    let title = "Reservation confirmed"

    const donationcardID = req.body.donation_card_id

   const dCard = await DonationCardModel.findById(donationcardID)
   console.log(dCard);
    let timenow = moment().format('MMMM Do YYYY, h:mm:ss a');

    const donorUser = await userModel.find({firebase_id : dCard.posted_by.firebase_id});
    console.log(donorUser);
    const donorNotificationToken = donorUser[0].notification_token

    const reservation_list = await reservationModel.create({
        donation_card : donationcardID,
        reservedAt:timenow,
        reserved_by : {
            firebase_id : user.firebase_id,
            user_name : name,
            user_number : user.phone_number,
            org_name 
        },
        card_number : dCard.card_number
    });
    let token = donorNotificationToken;
    let body = `Your donatijon was reserved by ${reservation_list.reserved_by.org_name} `;
    
    const saveReservationNotification = await notification.create({
            token,
            card_number : dCard.card_number,
            title,
            body,
            donation_card : donationcardID,
            reservedAt : timenow
    });
    
    sendReservationNotification(
        saveReservationNotification.token,
        saveReservationNotification.body,
        saveReservationNotification.title
    );

     // prepare notification block and save it
     //save card number body title and type
     // extract donor notification token


    if(reservation_list){
        res.send({
            status : true,
            message : "Successfully added donation card to your reservation list",
            reservation_list
        });
    }else{
        res.send({
            status : false,
            message : "Some error occured while reserving your donation"
        })
    }
}

exports.verifyDonation = async(req,res) => {
    const user = req.user
    if(user.role !== "receiver"){
        res.send({
            status : false,
            message : "User is not a receiver"
        });
    }
    const body_card_number = req.body.card_number
    const donation_card_id = req.params.donation_card_id

    const donation_card = await DonationCardModel.findById(donation_card_id);
    console.log(donation_card.card_number,body_card_number);
    if(body_card_number !== donation_card.card_number){
        res.send({
            status : false,
            messsage : "Please enter the correct Card number to verify the donation "
        });
    }else{
        // if card is verified then put the donation card in pending blogs
        let photo,description,card_number,org_name,org_add;
        photo = {
            id : donation_card.photo_of_the_food.id,
            public_url : donation_card.photo_of_the_food.public_url
        }
        description = donation_card.food_description
        card_number = donation_card.card_number
        org_name = donation_card.donation_centre.org_name
        org_add = donation_card.donation_centre.org_add


        const addblog = await blogsModel.create({
                photo,
                description,
                blog_for : {
                    card_number,
                    org_name,
                    org_add
                },
                published_by : {
                    firebase_id : user.firebase_id
                }
            
            });
        // increase goodwill points of the donor
        const firebase_id = donation_card.posted_by.user_id
    
        const donor = await donorModel.findById(firebase_id);
        donor.goodwillpoints += 10

        await donor.save({validateBeforeSave : false});
        // TODO : notify donor about 10 points were added 
        res.send({
            status : true,
            message : "Donation verified , 10 goodwill points have been added to your account"
        });

        
    }
}

exports.postBlog = async(req,res) => {
    const user = req.user
    if(user.role !== "receiver"){
        res.send({
            status : false,
            message : "User is not a receiver!"
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
    { folder: "hackathon/blogs" }
  );
    let token;
  const {description,blog_id} = req.body
  const pendingblogs = await blogsModel.find({"published_by.firebase_id" : user.firebase_id });
  for (let index = 0; index < pendingblogs.length; index++) {
    const pendingblog = pendingblogs[index];
    if(String(pendingblog._id) === blog_id){
        let photo = {
            id : result.public_id,
            public_url : result.secure_url
        }
        pendingblog.photo = photo,
        pendingblog.description = description
        // i need card number , body, title and notify donor
        const donation_card = await DonationCardModel.findOne({card_number : pendingblog.blog_for.card_number});
        const user = await userModel.findOne({firebase_id : donation_card.posted_by.firebase_id})
        token = String(user.notification_token)
    }
    await pendingblog.save({validateBeforeSave : false})
    res.send({
        status : true,
        message : "Blog uploaded",
        pendingblog
      })
      let body = `Your donation blog is uploaded by ${user.name}` 
      let title = `Your Donation blog is live`
    sendBlogNotification(token,pendingblog.blog_for.card_number,body,title);
  }
  


}

exports.pendingblogs = async(req,res) => {
    const user = req.user
    if(user.role !== "receiver"){
        res.send({
            status : false,
            message : "User is not a receiver!"
        });
    }
    const pendingblogs = await blogsModel.find({"published_by.firebase_id" : user.firebase_id })
   if(pendingblogs){
    res.send({
        status : true,
        message : "My Pending List",
        pendingblogs
    });
   }
}