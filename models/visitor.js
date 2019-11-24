const Mongoose = require("mongoose");

const visitor = new Mongoose.Schema({
  name: String, //from form
  phone: String, //from form
  email: String, //from form
  status: String, //from server
  check_in: String, //from server
  check_out: String, //from server
  host_name: String, //from form
  // host_id: Mongoose.Schema.Types.ObjectId, //from client - there can be multiple hosts of same name
  host_email: String, //from form
  host_phone: String, //from form
  add_visited: String, //from client
  created_at : String //from server
});

module.exports = Mongoose.model("Visitors", visitor);