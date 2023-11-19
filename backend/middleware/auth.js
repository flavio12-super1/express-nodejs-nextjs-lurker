const jwt = require("jsonwebtoken");
const tokenBlacklist = require("../routes/tokenBlackList.js");
const { JWT_SECRET } = process.env;

const verifyJWT = (req, res, next) => {
  console.log("Verifying JWT...");
  const token = req.cookies.token;

  if (!token) {
    console.log("No token found");
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
    res.locals.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    return res.redirect("/login");
  }
};

module.exports = verifyJWT;
