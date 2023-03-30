const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Enter the first name"],
  },
  lastName: {
    type: String,
    required: [true, "Enter the last name"],
  },
  email: {
    type: String,
    require: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    require: [true, "Please provide a password"],
    unique: false,
  },
  phone: {
    type: Number,
    minimum: 0,
  },
  address: {
    type: String,
    required: [true, "Enter the address"],
  },
  UserRole: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRole",
  },
});
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
