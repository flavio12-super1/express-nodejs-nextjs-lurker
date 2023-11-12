const nodemailer = require("nodemailer");
const CONSTANTS = require("./constants");
const { google } = require("googleapis");
const generateRandomCode = require("../generateCode/generateCode");

require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(email, username) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...CONSTANTS.auth,
        accessToken: accessToken,
      },
    });
    const generateCode = generateRandomCode(6);
    ``;
    const mailOptions = {
      ...CONSTANTS.mailoptions,
      to: email,
      subject: "Hello: " + username,
      text: "your code is " + generateCode,
    };

    const result = await transport.sendMail(mailOptions);
    console.log(result);
    console.log("email sent, code is:", generateCode);
    return generateCode;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  sendMail,
};
