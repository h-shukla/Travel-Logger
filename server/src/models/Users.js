const mongoose = require("mongoose");
const { Schema } = mongoose;

const requiredString = {
  type: String,
  required: true,
};

const userSchema = new Schema({
  name: requiredString,
  username: {
    ...requiredString,
    unique: true,
  },
  email: {
    ...requiredString,
    unique: true,
  },
  password: requiredString,
  role: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
