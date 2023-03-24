const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    useremail: {
      type: String,
      required: [true, "Please add the user email"],
      unique: [true, "email address already taken"],
    },
    userpassword: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    timestamps: true,
  }
);


module.exports=mongoose.model("user",userSchema);
