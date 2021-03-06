const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageURL: String,
    points: {
      type: Number,
      default: 0,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationOTP: {
      code: { type: Number },
      count: { type: Number, default: 0 },
      expTime: { type: Number },
    },
    forgotPassOTP: {
      code: { type: Number },
      count: { type: Number, default: 0 },
      expTime: { type: Number },
    },
    solvedProblems: {
      type: Array,
      dafault: [],
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
