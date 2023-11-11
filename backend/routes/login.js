const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  // Example authentication logic (replace with your actual authentication logic)
  if (username === "exampleUser" && password === "examplePassword") {
    // Create a JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" }); // Adjust expiration time as needed

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });

    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

module.exports = router;
