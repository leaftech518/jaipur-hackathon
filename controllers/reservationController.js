const DonationCardModel = require("../models/DonationCardModel");
const moment = require("moment");
const TWNModel = require("../models/TWNModel");
const reservationModel = require("../models/ReservationModel")
const notificationModel =  require("../models/NotificationModel");
const userModel = require("../models/userModel");
const { sendReservationNotification } = require("../middleware/notification");



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
   
    let timenow = moment().format('MMMM Do YYYY, h:mm:ss a');

    const donorUser = await userModel.find({firebase_id : dCard.posted_by.firebase_id});
    const donorNotificationToken = donorUser.notification_token

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
    const saveReservationNotification = await notificationModel.create({
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