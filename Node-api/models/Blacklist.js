const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema(
  {
    token: { type: String},
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blacklist", BlacklistSchema);