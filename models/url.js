const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }], // total clicks (is an array which has the timestamp)
  },
  { timestamps: true } // it will show at what time the entry has been created
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
