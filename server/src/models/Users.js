const mongoose = require("mongoose");
const { Schema } = mongoose;

/*
{
    "name": "",
    "username": "",
    "email": "",
    "password": "",
    "confirmPassword": "",
    "role": "admin"
}
*/

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
  communities: [
    {
      type: Schema.Types.ObjectId,
      ref: "community",
    },
  ],
});

const User = mongoose.model("user", userSchema);
module.exports = User;
