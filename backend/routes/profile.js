const express = require("express");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
    getProfile,
    updateProfile,
    changePassword,
    uploadAvatar,
} = require("../controller/profileController");

const router = express.Router();

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);
router.put("/change-password", auth, changePassword);
router.post("/avatar", auth, upload.single("avatar"), uploadAvatar);
module.exports = router;
