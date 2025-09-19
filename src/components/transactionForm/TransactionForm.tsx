import type React from "react";
import Form from "../../ui/form/Form";
import Input from "../../ui/input/Input";
import Dropdown from "../../ui/dropdown/Dropdown";
import { RemainingAmountDisplay } from "../remainingAmount/RemainingAmountDisplay";
import { incomeCat, expenseCat } from "../../util/transactionCategories";
import { useSelector, useDispatch } from "react-redux";
import { addAmountToCard, removeAmountFromCard } from "../../store/myWallet";
import { addRecentTransaction } from "../../store/transaction";
import styles from './TransactionForm.module.css';
import { deductFromRemaining } from "../../store/budgeting";

type TransactionFormProps = {
  type: "income" | "expense";
  closeForm: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ type, closeForm }) => {
  const dispatch = useDispatch();
  const bankAccounts = useSelector((state: any) => state.myWallet.bankAccounts);
  const cardNos = bankAccounts.map((card: any) => ({ label: `${card.bankName} : ${card.cardNo}`, value: card.cardNo }));

  // adding date 
  let dateTime = new Date().toISOString().slice(0, 10);
  if (bankAccounts.length === 0) {
    return <p>Please add a bank account first.</p>
  }

  function handleAddIncome(data: any) {
    const card = bankAccounts.find((acc: any) => acc.cardNo === data.bankCard);
    if (card) {
      dispatch(addAmountToCard({ cardNo: card.cardNo, amount: Number(data.amount) }));
      // this is to also dispatch the recentTransaction
      dispatch(addRecentTransaction({
        bank: card.bankName,
        typeOfTransfer: "income",
        cardNo: card.cardNo,
        amount: Number(data.amount),
        date: String(dateTime),
        category: data.category,
        comments: data.comments
      }));
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
      dispatch(addRecentTransaction({
        bank: card.bankName,
        typeOfTransfer: "expense",
        cardNo: card.cardNo,
        amount: Number(data.amount),
        date: String(dateTime),
        category: data.category,
        comments: data.comments
      }));

      // Tells the budget store to update the remaining amount immediately
      dispatch(deductFromRemaining(Number(data.amount)))

    } else {
      console.error("Expense registration error: Card not found");
    }

    closeForm();
  }

  return (
    <Form submit={type === "income" ? handleAddIncome : handleAddExpense}>
      <h1>{type === "income" ? "Add Income" : "Add Expense"}</h1>
      <div className={styles.formGroup}>
        {/* extra spaces because I'm not updating the CSS for dropdown */}
        <div>
          <p>1. Account involved</p>
          <Dropdown label="Bank Card    " name="bankCard" options={cardNos} />
        </div>
        <div>
          <p>2. Transaction amount</p>
          <Input label="Amount" name="amount" type="number" />
          {type=='expense' && <p>Amount remaining : <RemainingAmountDisplay/> </p>}

        </div>
        <div>
          <p>3. Purpose of transaction</p>
          <Dropdown label="Category    " name="category" options={type === "income" ? incomeCat : expenseCat} />
          <textarea className={styles.commentsBox} name="comments" placeholder="Additional comments (optional)" />
        </div>
      </div>
    </Form>
  );
}
export default TransactionForm;