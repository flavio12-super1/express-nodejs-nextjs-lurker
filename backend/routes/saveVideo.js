const express = require("express");
const router = express.Router();
const SaveVideo = require("../models/SaveVideo");

router.get("/", async (req, res) => {
  try {
    const receivedData = {
      url: req.query.url,
    };

    console.log(receivedData);

    // Create a new task using the Task model and the prompt
    const saveVideo = new SaveVideo({ video: receivedData.url });

    // Save the task to the database
    await saveVideo.save();

    return res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
