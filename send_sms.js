const Nexmo = require("nexmo");
require("dotenv").config();

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_APIKEY,
  apiSecret: process.env.NEXMO_APISECRET
});

const sendSMS = (reciever, body) => {
  const from = process.env.NEXMO_FROM_NO;
  const to = reciever;
  const text = body;

  // const resp = await nexmo.message.sendSms(from, to, text);
  // console.log(resp);
  console.log("Sending message...");
  nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
} 

module.exports = sendSMS;

