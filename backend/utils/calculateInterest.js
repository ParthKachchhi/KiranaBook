module.exports.calculateInterest = ({
  principal,
  interestRate,
  startDate,
  endDate,
  interestType = "flat",
}) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = end.getTime() - start.getTime();
  const days = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const ratePerDay = interestRate / 100 / 365;

  let interest = 0;

  if (interestType === "flat") {
    interest = principal * ratePerDay * days;
  }

  if (interestType === "reducing") {
    // simple reducing approx (can be improved later)
    interest = principal * ratePerDay * days * 0.5;
  }

  return {
    interest: Math.round(interest),
    days,
  };
};
