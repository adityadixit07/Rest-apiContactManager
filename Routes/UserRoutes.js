const express = require("express");
const { registerUser, loginUser, currentUser } = require("../Controllers/userControllers");
const validateToken = require("../middleware/ValidateTokenhandler");

const router = express.Router();

router.post("/register",registerUser)

router.post("/login",loginUser);

router.get("/current",validateToken,currentUser);


module.exports=router;
