const Loan = require("../models/Loan");
const Payment = require("../models/Payment");
const Customer = require("../models/Customer");
const calculateInterest = require("../utils/calcInterest");

const recalcCustomerBalance = async (customerId, ownerId) => {
    const loans = await Loan.find({
        customerId,
        ownerId,
        status: { $ne: "closed" },
    });

    const totalOutstanding = loans.reduce(
        (sum, loan) => sum + loan.outstanding,
        0
    );

    await Customer.findByIdAndUpdate(customerId, {
        balance: totalOutstanding,
        type:
            totalOutstanding === 0
                ? "settled"
                : "receivable",
    });
};

exports.collectPayment = async (req, res) => {
    try {
        const { loanId, amount, paymentDate, method } = req.body;

        if (!req.ownerId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!loanId || !amount || !paymentDate) {
            return res.status(400).json({ message: "Missing fields" });
        }

        // 1️⃣ Find loan
        const loan = await Loan.findOne({
            _id: loanId,
            ownerId: req.ownerId,
        });

        if (!loan) {
            return res.status(404).json({ message: "Loan not found" });
        }

        // 2️⃣ Create payment record
        const payment = await Payment.create({
            ownerId: req.ownerId,
            loanId,
            amount: Number(amount),
            paymentDate,
            method,
        });

        // 3️⃣ Reduce loan outstanding
        loan.outstanding = Math.max(0, loan.outstanding - Number(amount));

        if (loan.outstanding === 0) {
            loan.status = "closed";
        }

        await loan.save();

        // 4️⃣ Reduce customer balance
        const customer = await Customer.findOne({
            _id: loan.customerId,
            ownerId: req.ownerId,
        });

        if (customer) {
            customer.balance = Math.max(
                0,
                customer.balance - Number(amount)
            );
            await customer.save();
        }

        res.json({
            message: "Payment collected",
            payment,
            loan,
            customer,
        });

    } catch (err) {
        console.error("PAYMENT ERROR:", err);
        res.status(500).json({ message: "Payment failed" });
    }
};


