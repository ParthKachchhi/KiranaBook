const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createLoan,
  getLoans,
  getLoansByCustomer,
  updateLoanStatus,
} = require("../controller/loanController");

const router = express.Router();

router.post("/", auth, createLoan);
router.get("/", auth, getLoans);
router.get("/customer/:customerId", auth, getLoansByCustomer);
router.put("/:id/status", auth, updateLoanStatus);

module.exports = router;
    