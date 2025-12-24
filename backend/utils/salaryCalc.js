const calculateSalary = ({ baseSalary, taxRate, bonus, penalty }) => {
  const tax = Math.round(baseSalary * (taxRate || 0));
  const total = baseSalary + bonus - penalty - tax;
  return { baseSalary, tax, total };
};

module.exports = { calculateSalary };
