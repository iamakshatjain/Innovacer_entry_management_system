const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: "26edfce6",
  apiSecret: "r0RZ0KCzTuzJbiRi"
});

const from = "Nexmo";
const to = "918979297928";
const text = "Hello from Nexmo";

nexmo.message.sendSms(from, to, text);
