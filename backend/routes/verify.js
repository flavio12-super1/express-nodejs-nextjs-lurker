const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.post("/", async (req, res) => {
  const { username, password, email, code } = req.body;
  console.log("verifying code");
  console.log(username, password, email, code);
  const user = await User.findOne({ email: email });
  console.log(user);
  if (user.code === code) {
    console.log("code verified");
    user.isVerified = true;
    await user.save();
  } else {
    console.log("invalid code");
    return res.status(401).json({ error: "invalid code" });
  }

  res.status(200).json({ success: true, message: "code verified" });
});

module.exports = router;
