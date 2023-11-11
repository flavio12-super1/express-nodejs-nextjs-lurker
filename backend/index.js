const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 9000; // You can choose any available port
const dburl = process.env.DBURL;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//mongoose db
const mongoose = require("mongoose");
mongoose.connect(dburl);
const mdb = mongoose.connection;
mdb.on("error", (error) => console.error(error));
mdb.once("open", () => console.log("Connected to Mongoose"));

const saveVideo = require("./routes/saveVideo");
app.use("/saveVideo", saveVideo);

app.use(express.static(path.resolve(__dirname, "../frontend/out/")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/out/", "index.html"));
});

// Secret key for JWT signing
const JWT_SECRET = "mySecret"; // Replace with a strong secret key

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/out/", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/out/", "register.html"));
});

// Define a route that responds to the root URL
app.get("/ping", (req, res) => {
  res.send("Hello, World!");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

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

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  console.log(username, password, email);
});

// Example protected route
app.get("/protected", (req, res) => {
  // Verify the token from the cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Token is valid, you can access the user information in `decoded`
    res.json({ success: true, message: "Access granted", user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
