const mongoose = require("mongoose");
const Loan = require("../models/Loan");
const Customer = require("../models/Customer");
const calculateInterest = require("../utils/calcInterest");
const { calculateInterest } = require("../utils/calculateInterest");

async function applyInterest(loan) {
  const today = new Date();

  const { interest } = calculateInterest({
    principal: loan.outstanding,
    interestRate: loan.interestRate,
    startDate: loan.lastInterestCalcDate,
    endDate: today,
    interestType: loan.interestType,
  });

  if (interest > 0) {
    loan.outstanding += interest;
    loan.totalInterest += interest;
    loan.lastInterestCalcDate = today;
    await loan.save();
  }
}

/* =========================
   CREATE LOAN
========================= */


exports.createLoan = async (req, res) => {
  try {
    const {
      customerId,
      principal,
      interestRate,
      interestType = "flat",
      startDate,
      dueDate,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    if (!principal || !interestRate || !startDate || !dueDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    console.log("OWNER ID:", req.ownerId);
    console.log("CUSTOMER ID:", customerId);

    // ✅ CUSTOMER MUST BELONG TO OWNER
    const customer = await Customer.findOne({
      _id: customerId,
      ownerId: req.ownerId,
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const loan = await Loan.create({
      ownerId: req.ownerId, // ✅ CHANGED
      customerId: customer._id,
      principal,
      interestRate,
      interestType,
      startDate,
      dueDate,
      outstanding: principal,
      status: "active",
    });

    // update customer balance
    // customer.balance += principal;
    // customer.type = "receivable";
    // await customer.save();

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
    const loans = await Loan.find({ ownerId: req.ownerId })
      .populate("customerId", "name mobile")
      .sort({ createdAt: -1 });

    for (const loan of loans) {
      calculateInterest(loan);
      await loan.save();
    }

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
      ownerId: req.ownerId,
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
      { _id: id, ownerId: req.ownerId },
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
