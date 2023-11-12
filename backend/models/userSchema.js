const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    const compare = await bcrypt.compare(password, this.password);
    return compare;
  } catch (error) {
    console.error(error);
    throw new Error("Error comparing passwords");
  }
};

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;
