const User = require("../models/User");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");

// ==============================
// GET PROFILE
// ==============================
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Failed to load profile" });
    }
};

// ==============================
// UPDATE PROFILE
// ==============================
exports.updateProfile = async (req, res) => {
    try {
        const { businessName, ownerName, email, businessType } = req.body;

        const user = await User.findByIdAndUpdate(
            req.userId,
            { businessName, ownerName, email, businessType },
            { new: true }
        ).select("-password");

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Profile update failed" });
    }
};

// ==============================
// CHANGE PASSWORD
// ==============================
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(req.userId);

        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) {
            return res.status(400).json({ message: "Current password is wrong" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Password update failed" });
    }
};



exports.uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const uploadResult = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            {
                folder: "khatabook/avatars",
                transformation: [
                    { width: 300, height: 300, crop: "fill" },
                    { quality: "auto" },
                ],
            }
        );

        const user = await User.findByIdAndUpdate(
            req.userId,
            { avatar: uploadResult.secure_url },
            { new: true }
        ).select("-password -resetOTP -resetOTPExpiry");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ ONE RESPONSE ONLY
        res.json(user);

    } catch (err) {
        console.error("AVATAR UPLOAD ERROR:", err);
        if (!res.headersSent) {
            res.status(500).json({ message: "Avatar upload failed" });
        }
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select(
            "-password -resetOTP -resetOTPExpiry"
        );

        if (!user) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(user); // ✅ avatar INCLUDED
    } catch (err) {
        console.error("GET PROFILE ERROR:", err);
        res.status(500).json({ message: "Failed to load profile" });
    }
};

