const express = require("express");
const router = express.Router();
const tokenBlacklist = require("./tokenBlackList.js");

router.post("/", (req, res) => {
  console.log("logging out");
  const token = req.cookies.token;

  // Invalidate the token on the server side
  // For example, by adding it to the blacklist
  tokenBlacklist.push(token);

  // Clear the cookie on the client side
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logout successful" });
});

module.exports = router;
