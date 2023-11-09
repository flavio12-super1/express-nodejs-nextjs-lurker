const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 9000; // You can choose any available port
const dburl = process.env.DBURL;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, "../")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "index.html"));
});

// Define a route that responds to the root URL
app.get("/ping", (req, res) => {
  const { google } = require("googleapis");
  const fs = require("fs");
  const readline = require("readline");

  const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];
  const TOKEN_PATH = "token.json"; // You can change this as needed

  // Load client secrets from a file and set up the Gmail API client
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    authorize(JSON.parse(content), sendMessage);
  });

  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err)
          return console.error(
            "Error while trying to retrieve access token",
            err
          );
        oAuth2Client.setCredentials(token);

        // Store the token for future use
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });

        callback(oAuth2Client);
      });
    });
  }

  function sendMessage(auth) {
    const gmail = google.gmail({ version: "v1", auth });

    const email = [
      "To: herreraflavio0@gmail.com",
      "Subject: Your Subject Here",
      "Content-Type: text/html; charset=utf-8",
      "",
      "Your email content goes here.",
    ].join("\r\n");

    const base64EncodedEmail = Buffer.from(email).toString("base64");
    const request = {
      userId: "me",
      resource: {
        raw: base64EncodedEmail,
      },
    };

    gmail.users.messages.send(request, (err, response) => {
      if (err) {
        console.error("The API returned an error:", err);
        return;
      }
      console.log("Message sent:", response);
    });
  }

  res.send("Hello, World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// const express = require("express");
// const app = express();
// require("dotenv").config();
// const path = require("path");
// const port = process.env.PORT || 9000; // You can choose any available port
// const dburl = process.env.DBURL;
// const cors = require("cors");
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// //mongoose db
// const mongoose = require("mongoose");
// mongoose.connect(dburl);
// const mdb = mongoose.connection;
// mdb.on("error", (error) => console.error(error));
// mdb.once("open", () => console.log("Connected to Mongoose"));

// const saveVideo = require("./routes/saveVideo");
// app.use("/saveVideo", saveVideo);

// // app.use(express.static(path.resolve(__dirname, "../frontend/out/")));
// // app.get("/", (req, res) => {
// //   res.sendFile(path.join(__dirname, "../frontend/out/", "index.html"));
// // });
// app.use(express.static(path.resolve(__dirname, "../")));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../", "index.html"));
// });

// // Define a route that responds to the root URL
// app.get("/ping", (req, res) => {
//   res.send("Hello, World!");
// });

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   console.log(username, password);
//   res.send("success");
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
