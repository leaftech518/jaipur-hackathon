const admin = require("firebase-admin");
const serviceAccount = require("../secretkey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


exports.sendBlogNotification = (token) => {
  const messageforOrder = {
    data: {
      title: "Blog posted successfully!",
      body: `tap to see the Blog!`,
      notification_type: "Blog"
    },
    token,
    android: {
      priority: "high",
    },
  };
  admin
    .messaging()
    .send(messageforOrder)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
};


exports.sendReservationNotification = (token,body,title) => {
  const messageforReservation = {
    data : {
      title : title,
      body : body,
    },
    token,
    android: {
      priority: "high",
    },
  };
  admin
    .messaging()
    .send(messageforReservation)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });

}










































// exports.sendSignupNotificationToAdmin = (tokenArray, name, phone_number) => {
//   const messageforOrder = {
//     tokens: tokenArray,
//     data: {
//       title: "User registered Successfully.",
//       body: `One more user added in your database. Name : ${name} \n Phone Number : ${phone_number} `,
//       notification_type: "signup"
//     },
//     android: {
//       priority: "high",
//     },
//   };
//   admin
//     .messaging()
//     .sendMulticast(messageforOrder)
//     .then((response) => {
//       // Response is a message ID string.
//       console.log("Successfully sent message:", response);
//     })
//     .catch((error) => {
//       console.log("Error sending message:", error);
//     });
// };
