const Customer = require("../models/Customer");

// ==========================
// CREATE CUSTOMER
// ==========================
exports.createCustomer = async (req, res) => {
  try {
    const { name, mobile, gstin, balance } = req.body;

    const type =
      balance > 0 ? "receivable" : balance < 0 ? "payable" : "settled";

    const customer = await Customer.create({
      ownerId: req.userId,
      name,
      mobile,
      gstin,
      balance,
      type,
    });

    res.status(201).json(customer);
  } catch (err) {
    console.error("CREATE CUSTOMER ERROR:", err);
    res.status(500).json({ message: "Failed to create customer" });
  }
};

// ==========================
// GET CUSTOMERS
// ==========================
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ ownerId: req.userId }).sort({
      createdAt: -1,
    });

    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Failed to load customers" });
  }
};

// ==========================
// UPDATE CUSTOMER
// ==========================
exports.updateCustomer = async (req, res) => {
  try {
    const { name, mobile, gstin, balance } = req.body;

    const type =
      balance > 0 ? "receivable" : balance < 0 ? "payable" : "settled";

    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.userId },
      { name, mobile, gstin, balance, type },
      { new: true }
    );

    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: "Failed to update customer" });
  }
};

// ==========================
// DELETE CUSTOMER
// ==========================
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.userId,
    });

    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete customer" });
  }
};
