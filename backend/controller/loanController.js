const Loan = require("../models/Loan");
const Customer = require("../models/Customer");

/* =========================
   CREATE LOAN
========================= */
exports.createLoan = async (req, res) => {
  try {
    const {
      customerId,
      principal,
      interestRate,
      interestType,
      startDate,
      dueDate,
    } = req.body;

    if (!customerId || !principal || !interestRate || !startDate || !dueDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const loan = await Loan.create({
      userId: req.userId,
      customerId,
      principal,
      interestRate,
      interestType,
      startDate,
      dueDate,
      outstanding: principal,
    });

    res.status(201).json(loan);
  } catch (err) {
    console.error("CREATE LOAN ERROR:", err);
    res.status(500).json({ message: "Failed to create loan" });
  }
};

/* =========================
   GET ALL LOANS (WITH CUSTOMER)
========================= */
exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.userId })
      .populate("customerId", "name mobile")
      .sort({ createdAt: -1 });

    res.json(loans);
  } catch (err) {
    console.error("GET LOANS ERROR:", err);
    res.status(500).json({ message: "Failed to load loans" });
  }
};

/* =========================
   GET LOANS BY CUSTOMER
========================= */
exports.getLoansByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    const loans = await Loan.find({
      userId: req.userId,
      customerId,
    }).sort({ createdAt: -1 });

    res.json(loans);
  } catch (err) {
    console.error("CUSTOMER LOANS ERROR:", err);
    res.status(500).json({ message: "Failed to load customer loans" });
  }
};

/* =========================
   UPDATE LOAN STATUS
========================= */
exports.updateLoanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const loan = await Loan.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { status },
      { new: true }
    );

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.json(loan);
  } catch (err) {
    console.error("UPDATE LOAN ERROR:", err);
    res.status(500).json({ message: "Failed to update loan" });
  }
};
