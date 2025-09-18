import Input from "../../ui/input/Input";
import Header from "../../components/header/Header";
import styles from "./budgeting.module.css";
import { useState } from 'react';
import Button from "../../ui/button/Button";
import BudgetDonut from "../../ui/graph/BudgetDonut";
import { useDispatch } from "react-redux";
import { setBudget } from "../../store/budgeting";
function Budgeting() {
  // declaring dispatch 
  const dispatch = useDispatch();
  const [budgetButton, setBudgetButton] = useState<Boolean>(false);

  function handleClick() {
    setBudgetButton(!budgetButton);
  }

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
          <Button onClick={handleClick}>Set Budget</Button>
          {budgetButton &&
            <form onSubmit={handleFormSubmission}>
              <Input label="set budget" name="budget" />
              <Button type="submit">set Amount</Button>
            </form>
          }
        </div>
        <div>
          <BudgetDonut />
        </div>
      </div>

    </div>

  );
}

export default Budgeting;