const mongoose = require("mongoose");

//Admin hereglegch bol buh erhtei hereglegch bna
//Customer hereglegch bol Admin Panel dotor nevterj chadahgui hereglegch bna
//User hereglegch ni zarim neg Admin Panel deer ustgah uurchluh esvel uusgeh erhgui hereglegch bna
const userRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the Role Name"],
    unique: true,
  },
});
const UserRole = mongoose.model("UserRole", userRoleSchema);

module.exports = UserRole;
