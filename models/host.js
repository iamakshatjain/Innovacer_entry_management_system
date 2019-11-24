const Mongoose = require("mongoose");

const host = new Mongoose.Schema({
  name: String, //from form
  email: String, //from form
  phone: String, //from form
  address: String, //from form
  created_at: String //from server side
});

module.exports = Mongoose.model("Hosts", host);
