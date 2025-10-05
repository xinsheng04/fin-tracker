import type React from "react";
import Form from "../../../ui/form/Form";
import Input from "../../../ui/input/Input";
import Dropdown from "../../../ui/dropdown/Dropdown";
import { useState, useEffect } from "react";
import { RemainingAmountDisplay } from "../../remainingAmount/RemainingAmountDisplay";
import { incomeCat, expenseCat } from "../../../util/transactionTypes";
import { useSelector } from "react-redux";
import { useAddTransaction } from "../../../api/transactionAPI";
import { useGetCards } from "../../../api/walletApi";
import styles from './TransactionForm.module.css';
// import { deductFromRemaining } from "../../../store/budgeting";
import Error from "../../../ui/error/Error";

type TransactionFormProps = {
  type: "income" | "expense";
  closeForm: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ type, closeForm }) => {
  // const dispatch = useDispatch();
  const email = useSelector((state: any) => state.userInfo.email);
  const {data: cards, isLoading, isError: isGetCardsError, error: getCardsError} = useGetCards(email);
  const {mutate: addTransaction, isSuccess: isAddTransactionSuccess, isError: isAddTransactionError, error: addTransactionError} = useAddTransaction(email);
  
  if(isLoading){
    return <p>Loading...</p>
  }
  if(isGetCardsError){
    console.error('Error fetching cards: ', getCardsError);
    return <p>Error loading cards. Please try again later.</p>
  }
  if (!Array.isArray(cards) || cards.length === 0) {
    return <p>Please add a bank account first.</p>
  }
  const cardDisplayTags = cards ? cards.map((card: any) => ({ label: `${card.bankName} : ${card.cardNo}`, value: card.cardNo })) : [];
  
  useEffect(()=>{
    if(isAddTransactionSuccess){
      closeForm();
    }
  }, [isAddTransactionSuccess]);

  function handleAddIncome(data: any) {
    const card = cards.find((acc: any) => acc.cardNo === data.bankCard);
    if (card) {
      addTransaction({
        amount: Number(data.amount),
        typeOfTransfer: "income",
        category: data.category,
        comments: data.comments,
        cardNo: card.cardNo
      })
    } else {
      console.error("Income registration error: Card not found");
    }
  }


  function handleAddExpense(data: any) {
    const card = cards.find((acc: any) => acc.cardNo === data.bankCard);
    if (card) {
      addTransaction({
        amount: Number(data.amount),
        typeOfTransfer: "expense",
        category: data.category,
        comments: data.comments,
        cardNo: card.cardNo
      });
    } else {
      console.error("Expense registration error: Card not found");
    }
  }

  return (
    <>
      {isAddTransactionError && (
        <Error
          isError={true}
          isOpen={addTransactionError}
          title={"Transaction Error"}
          onClose={closeForm}
        >
          {addTransactionError.message}
        </Error>
      )}
      <Form submit={type === "income" ? handleAddIncome : handleAddExpense}>
        <h1>{type === "income" ? "Add Income" : "Add Expense"}</h1>
        <div className={styles.formGroup}>
          {/* extra spaces because I'm not updating the CSS for dropdown */}
          <div>
            <p>1. Account involved</p>
            <Dropdown label="Bank Card    " name="bankCard" options={cardDisplayTags} />
          </div>
          <div>
            <p>2. Transaction amount</p>
            <Input label="Amount" name="amount" type="number" />
            {type == 'expense' && <p>Amount remaining : <RemainingAmountDisplay /> </p>}

          </div>
          <div>
            <p>3. Purpose of transaction</p>
            <Dropdown label="Category    " name="category" options={type === "income" ? incomeCat : expenseCat} />
            <textarea className={styles.commentsBox} name="comments" placeholder="Additional comments (optional)" />
          </div>
        </div>
      </Form>
    </>
  );
}
export default TransactionForm;