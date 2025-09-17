import type React from "react";
import Form from "../../ui/form/Form";
import Input from "../../ui/input/Input";
import Dropdown from "../../ui/dropdown/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { addAmountToCard, removeAmountFromCard, addRecentTransaction } from "../../store/myWallet";

type TransactionFormProps = {
  type: "income" | "expense";
  closeForm: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ type, closeForm }) => {
  const dispatch = useDispatch();
  const bankAccounts = useSelector((state: any) => state.myWallet.bankAccounts);
  const cardNos = bankAccounts.map((card: any) => ({ label: `${card.bankName} : ${card.cardNo}`, value: card.cardNo }));
  // adding date 
  let dateTime = new Date().toISOString().slice(0,10);
  if (bankAccounts.length === 0) {
    return <p>Please add a bank account first.</p>
  }
  function handleAddIncome(data: any) {
    const card = bankAccounts.find((acc: any) => acc.cardNo === data.bankCard);
    if (card) {
      dispatch(addAmountToCard({ cardNo: card.cardNo, amount: Number(data.amount) }));
      // this is to also dispatch the recentTransaction
      dispatch(addRecentTransaction({ bank:card.bankName, typeOfTransfer:"income",cardNo: card.cardNo, amount: Number(data.amount),date: String(dateTime)}))
  } else {
    console.error("Income registration error: Card not found");
  }

    
  closeForm();
}

function handleAddExpense(data: any) {
  const card = bankAccounts.find((acc: any) => acc.cardNo === data.bankCard);
  if (card) {
    dispatch(removeAmountFromCard({ cardNo: card.cardNo, amount: Number(data.amount) }));

    // adding the expense part for the recentTransaction
    dispatch(addRecentTransaction({bank:card.bankName, typeOfTransfer:"expense", cardNo:card.cardNo, amount:Number(data.amount),date: String(dateTime)}))
  } else {
    console.error("Expense registration error: Card not found");
  }

  // this is to also dispatch the recentTransaction
  closeForm();
}

return (
  <Form submit={type === "income" ? handleAddIncome : handleAddExpense}>
    <h1>{type === "income" ? "Add Income" : "Add Expense"}</h1>
    <div>
      {/* extra spaces because I'm not updating the CSS for dropdown */}
      <Dropdown label="Bank Card    " name="bankCard" options={cardNos} />
      <Input label="Amount" name="amount" type="number" />
    </div>
  </Form>
);
}
export default TransactionForm;