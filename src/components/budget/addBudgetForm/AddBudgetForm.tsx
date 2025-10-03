import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { expenseCat } from "../../../util/transactionTypes";
import type { Category } from "../../../util/transactionTypes";

import styles from "./AddBudgetForm.module.css";
import { queryClient } from "../../../api/Api";
import { useMutation } from "@tanstack/react-query";
import { addBudgetAPI } from "../../../api/budgetingAPI";
import Button from "../../../ui/button/Button";
import Dropdown from "../../../ui/dropdown/Dropdown";
import Input from "../../../ui/input/Input";
import { useSelector } from "react-redux"; // Added useSelector import here

const BudgetItem: React.FC<{
  category: Category;
  value: number;
  id: number;
  onChange: (id: number, field: "category" | "amount", value: string | number) => void;
  onRemove: (id: number) => void;
}> = ({ category, value, id, onChange, onRemove }) => {
  return (
    <tr className={styles.expenseItem}>
      <Dropdown
        className={styles.chosenCategory}
        label=""
        name="category"
        options={expenseCat}
        value={category}
        onChange={(e) => onChange(id, "category", e.target.value)}
      />
      <Input
        className={styles.enteredAmount}
        label=""
        name="amount"
        type="number"
        value={String(value)}
        onChange={(e) => onChange(id, "amount", Number(e.target.value))}
      />
      <button type="button" onClick={() => onRemove(id)}>&#10006;</button>
    </tr>
  );
};

interface BudgetFormProps {
  onClose: () => void;
}

const AddBudgetForm: React.FC<BudgetFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const email = useSelector((state: { userInfo: { email: string } }) => state.userInfo.email); // Added useSelector here to get email from Redux store
  const [expenses, setExpenses] = useState<{ id: number; category: Category; amount: number }[]>([
    { id: 0, category: "", amount: 0 },
  ]);
  const expenseIDRef = useRef(1);

  function handleAddNewExpense() {
    const newExpense = { id: expenseIDRef.current++, category: "", amount: 0 };
    setExpenses([...expenses, newExpense]);
  }

  function handleExpenseChange(id: number, field: "category" | "amount", value: string | number) {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, [field]: value } : expense
      )
    );
  }

  function handleRemoveExpense(id: number) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  const addBudgetQ = useMutation({
    mutationFn: (payload: {
      email: string;
      title: string;
      categoryAndAmount: { category: string; limitAmount: number }[]| null;
    }) => addBudgetAPI(payload.email, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgetId", email] });
    },
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const fd = new FormData(event.target as HTMLFormElement);
    const rawData = Object.fromEntries(fd.entries());

    const payload = {
      email,
      title: String(rawData.budgetName),
      categoryAndAmount:
        expenses.length > 0
          ? expenses.map((exp) => ({ category: exp.category, limitAmount: exp.amount }))
          : null,
    };
    console.log(payload);
    addBudgetQ.mutate(payload);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Budget Plan</h3>
      <Input type="text" label="Budget Name" name="budgetName" />
      <table className={styles.expenseTable}>
        <thead>
          {expenses.length > 0 && (
            <tr>
              <th>Category</th>
              <th>Limit</th>
            </tr>
          )}
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <BudgetItem
              key={expense.id}
              id={expense.id}
              category={expense.category}
              value={expense.amount}
              onChange={handleExpenseChange}
              onRemove={handleRemoveExpense}
            />
          ))}
        </tbody>
      </table>
      <Button type="button" onClick={handleAddNewExpense}>
        Add Expense
      </Button>
      <Button type="submit">Save Budget Plan</Button>
    </form>
  );
};

export default AddBudgetForm;