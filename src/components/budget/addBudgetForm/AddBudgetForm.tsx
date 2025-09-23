import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import { expenseCat } from "../../../util/transactionCategories";
import type { Category } from "../../../util/transactionCategories";
import { addBudget } from "../../../store/budgeting";
import styles from "./AddBudgetForm.module.css";

import Button from "../../../ui/button/Button";
import Dropdown from "../../../ui/dropdown/Dropdown";
import Input from "../../../ui/input/Input";

const BudgetItem: React.FC<{
  category: Category;
  value: number;
  id: number;
  onChange: (id: number, field: "category" | "amount", value: string | number) => void;
  onRemove: (id: number) => void;
}> = ({ category, value, id, onChange, onRemove }) => {
  return (
    <div className={styles.expenseItem}>
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
    </div>
  );
};

interface BudgetFormProps{
  onClose: ()=>void;
}

const AddBudgetForm: React.FC<BudgetFormProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [expenses, setExpenses] = useState<{ id:number, category: Category; amount: number }[]>([{
    id: 0, category: "", amount: 0
  }]);
  const expenseIDRef = useRef(1);

  function handleAddNewExpense(){
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

  function handleRemoveExpense(id: number){
    setExpenses(expenses.filter((expense)=> expense.id !== id));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const fd = new FormData(event.target as HTMLFormElement);
    const rawData = Object.fromEntries(fd.entries());
    dispatch(addBudget({
      title: String(rawData.budgetName),
      categoryAndAmount: expenses.length > 0 ? expenses.map(exp => ({category: exp.category, amount: exp.amount})) : null
    }));
    onClose();
  }

  return(
    <form onSubmit={handleSubmit}>
      <h3>Add New Budget Plan</h3>
      <Input type="text" label="Budget Name" name="budgetName" />
      <table className={styles.expenseTable}>
        <thead>
          { expenses.length > 0 &&
            <tr>
              <th>Category</th>
              <th>Limit</th>
            </tr>
          }
        </thead>
        <tbody>
          {expenses.map((expense) =>
          <BudgetItem
            key={expense.id}
            id={expense.id}
            category={expense.category}
            value={expense.amount}
            onChange={handleExpenseChange}
            onRemove={handleRemoveExpense}
          />
          )}
        </tbody>
      </table>
      <Button type="button" onClick={handleAddNewExpense}>Add Expense</Button>
      <Button type="submit">Save Budget Plan</Button>
    </form>
  )
}

export default AddBudgetForm;