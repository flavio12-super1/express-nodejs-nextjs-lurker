const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");
const path = require("path");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
require("dotenv").config();
const port = process.env.PORT || 8000; // You can choose any available port

//cors middleware
app.use(
  cors({
    origin: "http://localhost:8000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Socket.io
const initializeSocket = require("./modules/socket");
const io = initializeSocket(server);

// middleware
const verifyJWT = require("./middleware/auth");

// Database connection
const db = require("./database/dbConnection");

// API routes
const register = require("./routes/register");
const login = require("./routes/login");
const logout = require("./routes/logout");
const user = require("./routes/user");
const verify = require("./routes/verify");

app.use("/verify", verify);
app.use("/user", verifyJWT, user);
app.use("/logout", verifyJWT, logout);
app.use("/register", register);
app.use("/login", login);

// Static files serving
app.use(
  express.static(path.resolve(__dirname, "../frontend/out/"), { index: false })
);
app.use(express.static(path.resolve(__dirname, "./lurker-icons")));

//Routes
app.get("/", verifyJWT, (req, res) => {
  console.log("sending index.html");
  res.sendFile(path.join(__dirname, "../frontend/out/", "index.html"));
});
app.get("/app", verifyJWT, (req, res) => {
  console.log("sending search.html");
  res.sendFile(path.join(__dirname, "../frontend/out/", "app.html"));
});
app.get("/app/search", verifyJWT, (req, res) => {
  console.log("sending search.html");
  res.sendFile(path.join(__dirname, "../frontend/out/app/", "search.html"));
});
app.get("/app/:email", verifyJWT, (req, res) => {
  console.log("sending search.html");
  res.sendFile(path.join(__dirname, "../frontend/out/app/", "user.html"));
});
app.get("/login", (req, res) => {
  console.log("sending login.html");
  res.sendFile(path.join(__dirname, "../frontend/out/", "login.html"));
});
app.get("/register", (req, res) => {
  console.log("sending register.html");
  res.sendFile(path.join(__dirname, "../frontend/out/", "register.html"));
});
// app.get("/app/:user", (req, res) => {
//   // res.send({ message: "Hello, World!" });
//   console.log("pinged");
// });

app.get("/getUser", (req, res) => {
  // Replace this with your actual logic to fetch user data from a database or other source
  const userData = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ];

  res.json(userData);
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
