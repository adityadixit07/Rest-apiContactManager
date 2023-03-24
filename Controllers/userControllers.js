const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const user = require("../models/UserModel");
//@desc- register the user
//@route POST  /api/users/register
//@access  public

const registerUser = asyncHandler(async (req, res) => {
  const { username, useremail, userpassword } = req.body;
  if (!username || !useremail || !userpassword) {
    res.status(404);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await user.findOne({ useremail });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already exist/registered");
  }

  // it there is new user which is not registerd yet so we create sa new user
  //  hash password
  const hashedPassword = await bcrypt.hash(userpassword, 10);
  // console.log("hashes password:",hashedPassword)
  const createuser = await user.create({
    username,
    useremail,
    userpassword: hashedPassword,
  });
  console.log("user created successfully");
  if (user) {
    res.status(200).json({_id:user.id,useremail:user.usermail});
  } else {
    res.status(400);
    throw new Error("user data is not valid.");
  }
  //   res.status(200).json({ message: "register the user" });
});

// @desc login the user
// @router POST  /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Login the user" });
});

// @desc current user
// @router GET  /api/users/current
// @access private (only loged in user can see the data)
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user information" });
});

module.exports = { registerUser, loginUser, currentUser };
