const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/userSchema");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  // Example authentication logic (replace with your actual authentication logic)
  if (username && password) {
    // Create a JWT token
    const user = await User.findOne({ username: username });

    if (!user) {
      console.log("Invalid email or username does not exist");
      return res
        .status(401)
        .json({ error: "Invalid email or username does not exist" });
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      console.log("invalid password or incorect password");
      return res
        .status(401)
        .json({ error: "invalid password or incorect password" });
    } else if (user.isVerified === false) {
      console.log("user is not verified");
      return res.status(401).json({ error: "user is not verified" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" }); // Adjust expiration time as needed
    console.log(token);
    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });

    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
