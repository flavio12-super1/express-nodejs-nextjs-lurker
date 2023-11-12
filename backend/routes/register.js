const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const controllers = require("../emailHandler/controllers");

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;

  if (username && password && email) {
    console.log(username, password, email);

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const generateCode = await controllers.sendMail(email, username);
      if (generateCode) {
        console.log(generateCode);
        const user = new User({
          username: username,
          password: hashedPassword,
          email: email,
          code: generateCode,
          isVerified: false,
        });
        const newUser = await user.save();
        if (newUser) {
          res.status(201).json({ message: "User created successfully" });
        } else {
          res.status(500).json({ error: "Internal server error" });
        }
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(401).json({ success: false, message: "missing input fields" });
  }
});
module.exports = router;
