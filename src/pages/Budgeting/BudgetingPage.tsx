import { useSelector } from "react-redux";
import { useState } from "react";
import type { budgetObject } from "../../store/budgeting";
import AddBudgetForm from "../../components/budget/addBudgetForm/AddBudgetForm";
import Modal from "../../ui/modal/Modal";
// import BudgetDonut from "../../components/budget/budgetDonut/BudgetDonut";
import ProgressChart from "../../components/budget/budgetDonut/ProgressChart";
import Header from "../../components/header/Header";
import styles from "./BudgetingPage.module.css";
import Button from "../../ui/button/Button";
import type React from "react";

const BudgetingPage: React.FC = () => {
  const budgets = useSelector((state: any) => state.budgeting.budgets);
  const expenses = useSelector((state: any) => state.transaction.recentTransaction.filter((t: any) => t.typeOfTransfer === "expense"));
  const [selectedBudget, setSelectedBudget] = useState<budgetObject | null>(budgets.length > 0 ? budgets[0] : null);
  const [modalOpenType, setModalOpenType] = useState<"add" | "edit" | null>(null);

  let progressList: { spent: number; limit: number; title: string }[] = [];

  if (selectedBudget?.categoryAndAmount) {
    // Populate progressList with categories and their limits
    progressList = selectedBudget.categoryAndAmount.map(({ category, amount }) => ({
      title: category,
      limit: amount,
      spent: 0,
    }));

    // Add "Others" category
    progressList.push({
      title: "Others",
      limit: 0, // Use 0 or calculate unallocated limit if needed
      spent: 0,
    });

    // Update spent values
    progressList = expenses.reduce((
      acc: { title: string; limit: number; spent: number }[],
      { category, amount }: { category: string; amount: number }
    ) => {
      const index = acc.findIndex(item => item.title === category);
      if (index !== -1) {
        acc[index].spent += amount;
      } else {
        acc[acc.length - 1].spent += amount; // Add to "Others" if category not found
      }
      return acc;
    }, progressList);
  }


  function handleSelectBudget(budgetId: string) {
    const budget = budgets.find((b: budgetObject) => b.id === budgetId);
    setSelectedBudget(budget || null);
  }

  return (
    <div className={styles.main}>
      <Header title="Budget" />
      <div className={styles.budgetOverview}>
        <h3>My List of Budgets</h3>
        <div className={styles.budgets}>
          {budgets.length === 0 && <p>No budgets set. Set a<span onClick={() => setModalOpenType("add")}> new budget plan </span>now.</p>}
          {budgets.length > 0 && budgets.map((budget: budgetObject) => (
            <div key={budget.id} className={styles.budgetCard} onClick={() => handleSelectBudget(budget.id)}>
              <h3>{budget.title}</h3>
            </div>
          ))}
        </div>
        <p className={styles.subtext}>Or, you can <span onClick={() => setModalOpenType("add")}>create a new budget plan.</span></p>
      </div>
      {selectedBudget && (
        <div className={styles.budgetContent}>
          <h2>{selectedBudget.title}</h2>
          <div className={styles.budgetDetails}>
            <div className={styles.leftBox}>
              <table className={styles.categoryList}>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {progressList.map(({title, limit, spent}) => (
                    <tr className={styles.limitItem} key={title}>
                      <th>{title}</th>
                      {title !== "Others" ? 
                      <td>
                        <span className={spent > limit ? styles.overLimit : styles.normal}>{spent}</span>/<span>{limit}</span>
                      </td>
                      : 
                      <td><span>{spent}</span>/<span>{limit}</span></td>
                      }
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.budgetButtons}>
                <Button>Reset Progress</Button>
                <Button>Edit this budget</Button>
                <Button>Delete this budget</Button>
              </div>
            </div>
            <div className={styles.rightBox}>
              <ProgressChart progressList={progressList} />
            </div>
          </div>
        </div>
      )}
      <Modal isOpen={modalOpenType !== null} onClose={() => setModalOpenType(null)}>
        {modalOpenType === "add" && <AddBudgetForm onClose={() => setModalOpenType(null)} />}
        {/* editing modal to come later */}
      </Modal>
    </div>
  );
}

export default BudgetingPage;