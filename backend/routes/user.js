const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.get("/", async (req, res) => {
  // console.log("getting user info...");
  const token = req.cookies.token;
  const userId = res.locals.userId;
  // console.log(userId);
  // console.log(token);
  const user = await User.findById(userId);
  const userInfo = {
    username: user.username,
    email: user.email,
  };
  // console.log(user);
  res.status(200).json({ success: true, userInfo: userInfo });
});

module.exports = router;
