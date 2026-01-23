const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentDate: {
      type: Date,
      required: true,
    },

    method: {
      type: String,
      enum: ["cash", "upi", "bank"],
      default: "cash",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
