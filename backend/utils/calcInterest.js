const MS_IN_DAY = 1000 * 60 * 60 * 24;

module.exports = function calculateInterest(loan) {
  if (loan.status === "closed") return loan;

  const now = new Date();
  const last = new Date(loan.lastInterestCalculatedAt);

  const daysPassed = Math.floor((now - last) / MS_IN_DAY);
  if (daysPassed <= 0) return loan;

  let interest = 0;

  if (loan.interestPeriod === "daily") {
    interest =
      (loan.outstanding * loan.interestRate * daysPassed) / 100 / 365;
  }

  if (loan.interestPeriod === "monthly") {
    interest =
      (loan.outstanding * loan.interestRate * daysPassed) / 100 / 30;
  }

  if (loan.interestPeriod === "yearly") {
    interest =
      (loan.outstanding * loan.interestRate * daysPassed) / 100 / 365;
  }

  loan.outstanding += Math.round(interest);
  loan.lastInterestCalculatedAt = now;

  return loan;
};
