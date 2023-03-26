const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
//@desc- register the user
//@route POST  /api/users/register
//@access  public

const registerUser = asyncHandler(async (req, res) => {
  const { username, useremail, userpassword } = req.body;
  if (!username || !useremail || !userpassword) {
    res.status(404);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ useremail });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already exist/registered");
  }
  // it there is new user which is not registerd yet so we create sa new user
  //  hash password
  const hashedPassword = await bcrypt.hash(userpassword, 10);
  // console.log("hashes password:",hashedPassword)
  const createuser = await User.create({
    username,
    useremail,
    userpassword: hashedPassword,
  });
  console.log("user created successfully");
  if (User) {
    res
      .status(201)
      .json({ _id: createuser.id, useremail: createuser.useremail });
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
  const { userpassword, useremail } = req.body;
  if (!userpassword || !useremail) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ useremail });
  // compare passowrd with hashpassword
  if (user && (await bcrypt.compare(userpassword, user.userpassword))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          useremail: user.useremail,
          id: user.id,
        },
      },
      process.env.ACESS_TOKEN_SECRET,
      { expiresIn: "2m" }
    );
    res.status(200).json({ accessToken });
  }
  else{
    res.status(400);
    throw new Error("email or password is not valid")
  }
});

// @desc current user
// @router GET  /api/users/current
// @access private (only loged in user can see the data)
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
});

module.exports = { registerUser, loginUser, currentUser };
