import Input from "../../ui/input/Input";
import Header from "../../components/header/Header";
import styles from "./budgeting.module.css";
import { useState } from 'react';
import Button from "../../ui/button/Button";
import BudgetDonut from "../../ui/graph/BudgetDonut";
import { useDispatch } from "react-redux";
import { setBudget } from "../../store/budgeting";
import { useSelector } from "react-redux";
function Budgeting() {
  // declaring dispatch 
  const dispatch = useDispatch();
  const [budgetButton, setBudgetButton] = useState<Boolean>(false);

  //defining Budget 
  const budget = useSelector((state: any) => state.budgeting);
  function handleClick() {
    setBudgetButton(!budgetButton);
  }

  // finding amount spent
  const transaction = useSelector((state: any) => state.transaction.recentTransaction);
  const spent = transaction
    ? transaction
      .filter((t: any) => t.typeOfTransfer === "expense")
      .reduce((sum: number, t: any) => sum + t.amount, 0)
    : 0;
  const amountSpent = Math.max(spent, 0);
  var amountPercentage = (amountSpent/budget.mainAmount)*100
  amountPercentage = Number(amountPercentage.toFixed(2));

  function handleFormSubmission(event: any) {
    // to stop the page from rerendering
    event.preventDefault();

    const fd = new FormData(event.target)
    const data = Object.fromEntries(fd.entries());
    console.log(data);
    dispatch(setBudget(Number(data.budget)
    ))

  }
  return (
    <div className={styles.main}>
      <Header title="Budget" />
      <div className={styles.divider}>
        <div className={styles.inputs}>
          <Button onClick={handleClick}>{budgetButton ? "Close Budget" : "Set Budget"}</Button>
          {budgetButton &&
            <form onSubmit={handleFormSubmission}>
              <Input label="set budget" name="budget" />
              <Button type="submit">Set Amount</Button>
            </form>
          }
        </div>
        <div>
          <BudgetDonut />
        </div>
      </div>
      <div className={styles.budgetInfo}>
        <div className={styles.infoBox}>
          <span>Total Budget</span>
          <strong>${budget.mainAmount|| 0}</strong>
        </div>
        <div className={styles.infoBox}>
          <span>Amount Spent</span>
          <strong className={styles.spentValue}>${amountSpent}</strong>
        </div>
        <div className={styles.infoBox}>
          <span>Percentage Spent</span>
          <strong className={styles.spentValue}>{amountPercentage}</strong>
        </div>
        
      </div>
    </div>

  );
}

export default Budgeting;