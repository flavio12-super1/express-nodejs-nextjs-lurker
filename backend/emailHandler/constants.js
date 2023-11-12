require("dotenv").config();

const auth = {
  type: "OAuth2",
  user: process.env.SENDER,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: process.env.SENDER,
};

module.exports = {
  auth,
  mailoptions,
};
