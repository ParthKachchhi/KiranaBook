const express = require("express");
const { login, signup, sendForgotOTP, resetPassword, sendLoginOTP, verifyLoginOTP } = require("../controller/authController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/signup", signup);
// router.post("/change-password", authMiddleware, changePassword);
router.post("/forgot-password", sendForgotOTP);
router.post("/reset-password", resetPassword);
router.post("/login-otp", sendLoginOTP);
router.post("/verify-login-otp", verifyLoginOTP);

module.exports = router;
