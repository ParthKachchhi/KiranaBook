const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    principal: {
      type: Number,
      required: true,
    },

    interestRate: {
      type: Number,
      required: true,
    },

    interestType: {
      type: String,
      enum: ["flat", "reducing"],
      default: "flat",
    },

    startDate: {
      type: Date,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    outstanding: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "overdue", "closed"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);
