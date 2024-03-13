const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Message = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

Message.pre("save", async function () {
  let salt = await bcrypt.genSalt();
  this.content = await bcrypt.hash(this.content, salt);
});
Message.static("preUpdateOne", async function (content) {
  let salt = await bcrypt.genSalt();
  content = await bcrypt.hash(content, salt);
  return content;
});
Message.method("generateToken", function () {
  return jwt.sign({ _id: this._id.toString() }, process.env.JWTOKEN, {
    expiresIn: "5m",
  });
});
Message.static("verifyToken", function (token) {
  try {
    let verify = jwt.verify(token, process.env.JWTOKEN);

    return verify;
  } catch (error) {
    if(error.message==="jwt expired")
    throw new Error("Code Expired")
  }
});
Message.method("compareCode", async function (code) {
  return await bcrypt.compare(code, this.content);
});
module.exports = mongoose.model("message", Message);
