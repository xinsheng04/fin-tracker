import type React from "react";
import Form from "../../ui/form/Form";
import Input from "../../ui/input/Input";
import Dropdown from "../../ui/dropdown/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { addAmountToCard, removeAmountFromCard } from "../../store/myWallet";

type TransactionFormProps = {
  type: "income" | "expense";
  closeForm: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ type, closeForm }) => {
  const dispatch = useDispatch();
  const bankAccounts = useSelector((state: any) => state.myWallet.bankAccounts);
  const cardNos = bankAccounts.map((card: any) => ({label: `${card.bankName} : ${card.cardNo}`, value: card.cardNo}));
  if(bankAccounts.length === 0){
    return <p>Please add a bank account first.</p>
  }
  function handleAddIncome(data: any){
    const card = bankAccounts.find((acc: any) => acc.cardNo === Number(data.bankCard));
    if(card){
      dispatch(addAmountToCard({cardNo: card.cardNo, amount: Number(data.amount)}));
    } else{
      console.error("Income registration error: Card not found");
    }
    closeForm();
  }

  function handleAddExpense(data: any){
    const card = bankAccounts.find((acc: any) => acc.cardNo === Number(data.bankCard));
    if(card){
      dispatch(removeAmountFromCard({cardNo: card.cardNo, amount: Number(data.amount)}));
    } else{
      console.error("Expense registration error: Card not found");
    }
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