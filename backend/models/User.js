let mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const users = mongoose.model("users", userSchema);
// users.createIndexes();
//create indexes jo h vo us field me jisme unique ho usko repeat hote hi post ke time error dedeta if that email already exists vrna ek hi email ki 100 field bnadega
module.exports = users;
