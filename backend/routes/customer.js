const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controller/customerController");

const router = express.Router();

router.get("/", auth, getCustomers);
router.post("/", auth, createCustomer);
router.put("/:id", auth, updateCustomer);
router.delete("/:id", auth, deleteCustomer);

module.exports = router;
