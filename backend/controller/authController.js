const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


// ================= SIGNUP =================
exports.signup = async (req, res) => {
  try {
    console.log("SIGNUP BODY:", req.body);

    const {
      businessName,
      ownerName,
      mobile,
      email,
      password,
      businessType,
    } = req.body;

    // 1️⃣ Check existing user
    const exists = await User.findOne({ mobile });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create user
    const user = await User.create({
      businessName,
      ownerName,
      mobile,
      email,
      password: hashedPassword,
      businessType,
    });

    // 4️⃣ Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Response
    res.status(201).json({
      token,
      user: {
        _id: user._id,
        businessName: user.businessName,
        ownerName: user.ownerName,
        mobile: user.mobile,
        email: user.email,
        businessType: user.businessType,
        avatar: user.avatar || null,
      },
    });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // 1️⃣ Find user by mobile OR email
    const user = await User.findOne({
      $or: [{ mobile: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2️⃣ Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3️⃣ Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4️⃣ Response
    res.json({
      token,
      user: {
        _id: user._id,
        businessName: user.businessName,
        ownerName: user.ownerName,
        mobile: user.mobile,
        email: user.email,
        businessType: user.businessType,
        avatar: user.avatar || null,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Password change failed" });
  }
};

exports.sendForgotOTP = async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({ message: "Email or mobile is required" });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { mobile: identifier }],
    });

    if (!user || !user.email) {
      return res.status(400).json({
        message: "User not found or email not registered",
      });
    }

    // 🔢 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    // 📧 SEND EMAIL
    await sendEmail({
      to: user.email,
      subject: "KhataBook Password Reset OTP",
      html: `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { identifier, otp, newPassword } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { mobile: identifier }],
    });

    if (
      !user ||
      user.resetOTP !== otp ||
      user.resetOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Reset password failed" });
  }
};

exports.sendLoginOTP = async (req, res) => {
  try {
    const { identifier } = req.body;

    if (!identifier) {
      return res.status(400).json({ message: "Email or mobile required" });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { mobile: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // EMAIL OTP
    if (user.email) {
      await sendEmail({
        to: user.email,
        subject: "KhataBook Login OTP",
        html: `
          <h2>Login OTP</h2>
          <p>Your OTP is <b>${otp}</b></p>
          <p>Valid for 10 minutes</p>
        `,
      });
    }

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.error("LOGIN OTP ERROR:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

exports.verifyLoginOTP = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { mobile: identifier }],
    });

    if (
      !user ||
      user.resetOTP !== otp ||
      user.resetOTPExpiry < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Clear OTP
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    // JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        _id: user._id,
        businessName: user.businessName,
        email: user.email,
        mobile: user.mobile,
      },
    });

  } catch (err) {
    console.error("OTP VERIFY ERROR:", err);
    res.status(500).json({ message: "OTP login failed" });
  }
};
