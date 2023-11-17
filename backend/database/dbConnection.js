const dburl = process.env.DBURL;

//mongoose db
const mongoose = require("mongoose");
mongoose.connect(dburl);
const mdb = mongoose.connection;
mdb.on("error", (error) => console.error(error));
mdb.once("open", () => console.log("Connected to Mongoose"));

module.exports = mdb;
