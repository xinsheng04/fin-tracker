const incomeCat = [
  "Salary/Wages", 
  "Business Income", 
  "Bonuses", 
  "Investments/Dividends", 
  "Sale of Assets", 
  "Gifts", 
  "Rental Income", 
  "Freelance/Part-time",  
  "Tax Refunds", 
  "Winnings",
  "Other"
];

const expenseCat = [
  "Food & Dining",
  "Tax",
  "Utilities",
  "Rent/Mortgage",
  "Transportation",
  "Healthcare",
  "Entertainment",
  "Education",
  "Shopping",
  "Travel",
  "Insurance",
  "Debt Payments",
  "Personal Care",
  "Gifts/Donations",
  "Non-entertainment Subscriptions",
  "Other"
];

export type Category = (typeof incomeCat[number]) | (typeof expenseCat[number]);

export { incomeCat, expenseCat };