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
  "Purchase of Assets",
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

interface TransactionObject{
  bankName: string;
  cardNo: string;
  typeOfTransfer: "income" | "expense";
  amountTransfered: number;
  dateTransfer: string;
  transactionId: number;
  category?: Category;
  comment?: string;
}

export type Category = (typeof incomeCat[number]) | (typeof expenseCat[number]);
export type { TransactionObject };

export { incomeCat, expenseCat };