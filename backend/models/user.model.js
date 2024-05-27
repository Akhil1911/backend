import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../helpers/password.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/token.helper.js";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please fill all fields"],
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "Please fill all fields"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: [true, "Please fill all fields"],
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      required: [true, "Please fill all fields"],
    },
    coverImage: { type: String },
    password: { type: String, required: [true, "Please fill all fields"] },
    refreshToken: { type: String },
    watchHistory: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = hashPassword(this.password);
  next();
});

userSchema.method.isPasswordCorrect = function (password) {
  return comparePassword(password, this.password);
};

userSchema.method.generateAccessToken = function () {
  return generateAccessToken(this);
};

userSchema.method.generateRefreshToken = function () {
  return generateRefreshToken(this._id);
};

export const User = mongoose.model("User", userSchema);
