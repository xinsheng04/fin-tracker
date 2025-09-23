import { useSelector } from "react-redux";
import { useState } from "react";
import type { budgetObject } from "../../store/budgeting";
import AddBudgetForm from "../../components/budget/addBudgetForm/AddBudgetForm";
import Modal from "../../ui/modal/Modal";
import BudgetDonut from "../../components/budget/budgetDonut/BudgetDonut";
import Header from "../../components/header/Header";
import styles from "./BudgetingPage.module.css";
import Button from "../../ui/button/Button";
import type React from "react";

const BudgetingPage: React.FC = () => {
  const budgets = useSelector((state: any) => state.budgeting.budgets);
  const [selectedBudget, setSelectedBudget] = useState<budgetObject | null>(budgets.length > 0 ? budgets[0] : null);
  const [modalOpenType, setModalOpenType] = useState<"add" | "edit" | null>(null);

  function handleSelectBudget(budgetId: string) {
    const budget = budgets.find((b: budgetObject) => b.id === budgetId);
    setSelectedBudget(budget || null);
  }

  return (
    <div className={styles.main}>
      <Header title="Budget" />
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
      {selectedBudget && (
        <div className={styles.budgetContent}>
          <h2>{selectedBudget.title}</h2>
          <div>
            <div className={styles.leftBox}>
              <table className={styles.categoryList}>
                <tbody>
                  {selectedBudget.categoryAndAmount?.map((item) => (
                    <tr className={styles.limitItem} key={item.category}>
                      <th>{item.category}</th>
                      {/* Note: add spent / limit in the future */}
                      <td>{item.amount}</td>
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
              {/* to come soon */}
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