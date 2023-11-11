const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  console.log(username, password, email);
});

module.exports = router;
