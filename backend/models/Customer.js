const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    gstin: {
      type: String,
      default: "",
    },

    balance: {
      type: Number,
      default: 0, // + receivable, - payable
    },

    type: {
      type: String,
      enum: ["receivable", "payable", "settled"],
      default: "receivable",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
