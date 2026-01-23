const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    ownerId: {
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
      type: Number, // eg: 12 = 12%
      required: true,
    },

    interestPeriod: {
      type: String,
      enum: ["daily", "monthly", "yearly"],
      default: "monthly",
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

    lastInterestCalculatedAt: {
      type: Date,
      default: function () {
        return this.startDate;
      },
    },

    status: {
      type: String,
      enum: ["active", "overdue", "closed"],
      default: "active",
    },

    lastInterestCalcDate: {
      type: Date,
      default: Date.now,
    },

    totalInterest: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Loan", loanSchema);
