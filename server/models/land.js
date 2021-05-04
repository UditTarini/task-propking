var mongoose = require("mongoose");
const crypto = require("crypto");
const {v1: uuidv1} = require("uuid");

var Schema = mongoose.Schema;

var user_schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 40,
      trim: true,
      unique: true,
    },
    area: {
      type: Number,
      required: true,
      maxlength: 40,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", user_schema);
