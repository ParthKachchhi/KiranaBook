const mongoose = require("mongoose");

module.exports = mongoose.model("Transaction", new mongoose.Schema({
  customerId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  type: String,
  date: { type: Date, default: Date.now }
}));
