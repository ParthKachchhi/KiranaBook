const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    ownerName: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },
    businessType: { type: String, required: true },
    avatar: { type: String },

    // 🔐 FORGOT PASSWORD
    resetOTP: { type: String },
    resetOTPExpiry: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
