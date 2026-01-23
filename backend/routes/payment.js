const express = require("express");
const auth = require("../middleware/authMiddleware");
const { collectPayment } = require("../controller/paymentController");

const router = express.Router();

router.post("/collect", auth, collectPayment);

module.exports = router;
