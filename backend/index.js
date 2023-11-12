const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 8000; // You can choose any available port
const dburl = process.env.DBURL;
const JWT_SECRET = process.env.JWT_SECRET;
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

const tokenBlacklist = require("./routes/tokenBlackList.js");

const verifyJWT = (req, res, next) => {
  console.log("Verifying JWT");
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
  }

  // Check if the token is in the blacklist
  if (tokenBlacklist.includes(token)) {
    return res
      .status(401)
      .json({ success: false, message: "Token revoked. Please log in again." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded.id);
    res.locals.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

const register = require("./routes/register");
app.use("/register", register);
const login = require("./routes/login");
app.use("/login", login);
const logout = require("./routes/logout");
app.use("/logout", verifyJWT, logout);
const user = require("./routes/user");
app.use("/user", verifyJWT, user);
const verify = require("./routes/verify");
app.use("/verify", verify);

app.use(
  express.static(path.resolve(__dirname, "../frontend/out/"), { index: false })
);

app.get("/", verifyJWT, (req, res) => {
  console.log("sending index.html");
  res.sendFile(path.join(__dirname, "../frontend/out/", "index.html"));
});

app.get("/login", (req, res) => {
  console.log("sending login.html");
  res.sendFile(path.join(__dirname, "../frontend/out/", "login.html"));
});
app.get("/register", (req, res) => {
  console.log("sending register.html");
  res.sendFile(path.join(__dirname, "../frontend/out/", "register.html"));
});

// Define a route that responds to the root URL
app.get("/ping", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
