const DonationCardModel = require("../models/DonationCardModel");
const moment = require("moment");
const TWNModel = require("../models/TWNModel");
const reservationModel = require("../models/ReservationModel")

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
    let reservation_list_off = [];

    const donationcardID = req.body.donation_card_id

   const dCard = await DonationCardModel.findById(donationcardID)
   
    let timenow = moment().format('MMMM Do YYYY, h:mm:ss a');


    const reservation_list = await reservationModel.create({
        donation_card : donationcardID,
        reservedAt:timenow,
        reserved_by : {
            firebase_id : user.firebase_id,
            user_name : name,
            user_number : user.phone_number
        },
        card_number : dCard.card_number
    });

     
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