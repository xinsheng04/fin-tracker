import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AddBudgetForm from "../../components/budget/addBudgetForm/AddBudgetForm";
import Modal from "../../ui/modal/Modal";
import type { Category } from "../../util/transactionTypes";
import type { budgetingObject } from "../../api/interface/budgeting";
import type { transactionsObject } from "../../api/interface/transactions";

// import BudgetDonut from "../../components/budget/budgetDonut/BudgetDonut";
import ProgressChart from "../../components/budget/budgetDonut/ProgressChart";
import Header from "../../components/header/Header";
import styles from "./BudgetingPage.module.css";
import Button from "../../ui/button/Button";
import type React from "react";
import { useGetAllTransactions } from "../../api/transactionAPI";
import { useGetAllBudgets } from "../../api/budgetingAPI";
import { useResetBudgetProgress } from "../../api/budgetingAPI";
import { useDeleteBudget } from "../../api/budgetingAPI";

interface Budget {
  budgetId: number;
  title: string;
  trackDateFrom?: string;
  budgetItems: { budgetItemId: number, category: Category; limitAmount: string }[] | null;
}

const BudgetingPage: React.FC = () => {
  // getting email from the userInfo store;
  const email = useSelector((state: { userInfo: { email: string } }) => state.userInfo.email);
  const { data: budgetItems = [], isLoading, isSuccess: budgetsFetched } = useGetAllBudgets(email);
  const { data: transactionExpenses } = useGetAllTransactions(email);
  const { mutate: resetBudgetProgress } = useResetBudgetProgress(email);
  const { mutate: deleteBudgetMutation } = useDeleteBudget(email);
  
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);
  const [modalOpenType, setModalOpenType] = useState<"add" | "edit" | null>(null);
  
  useEffect(() => {
    if (budgetsFetched && selectedBudgetId === null && budgetItems.length > 0) {
      setSelectedBudgetId(budgets[0].budgetId);
    }
  }, [budgetsFetched, selectedBudgetId, budgetItems]);
  
  if (isLoading) {
    return <div>Loading budgets...</div>;
  }

  const budgets: Budget[] = budgetItems.reduce((acc: Budget[], budget: budgetingObject) => {
    const existingBudgetId = acc.findIndex(b => b.budgetId === budget.budgetId);
    if (existingBudgetId === -1) {
      acc.push({
        budgetId: budget.budgetId,
        title: budget.title,
        trackDateFrom: budget.trackDateFrom,
        budgetItems: [
          {
            budgetItemId: budget.budgetItemId,
            category: budget.category,
            limitAmount: budget.limitAmount
          }
        ]
      })
    }
    else {
      acc[existingBudgetId].budgetItems?.push({
        budgetItemId: budget.budgetItemId,
        category: budget.category,
        limitAmount: budget.limitAmount
      });
    }
    return acc;
  }, []);
  

  // using the get api for all the transactions
  const expenses = (transactionExpenses ?? []).filter((t: transactionsObject) => t.typeOfTransfer === "expense");
  const selectedBudget = budgets.find((b: Budget) => b.budgetId === selectedBudgetId) || null;
  let progressList: { spent: number; limit: number; title: string }[] = [];

  if (selectedBudget) {
    // Populate progressList with categories and their limits
    progressList = selectedBudget.budgetItems?.map(item => ({
      title: item.category,
      limit: parseFloat(item.limitAmount),
      spent: 0,
    })) || [];

    // Add "Others" category
    progressList.push({
      title: "Others",
      limit: 0, // Use 0 or calculate unallocated limit if needed
      spent: 0,
    });

    const dateFrom = new Date(selectedBudget?.trackDateFrom ?? 0); // Default to epoch if no date provided

    // Filter expenses based on the budget's trackDateFrom
    // improvement proposal:
    // make the database return transactions in decreasing order of date and use slice to get relevant dates
    const startFrom = expenses.findIndex((expense: any) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= dateFrom;
    });
    const expensesToConsider = startFrom !== -1 ? expenses.slice(startFrom) : expenses;

    // Update spent values
    progressList = expensesToConsider.reduce((
      acc: { title: string; limit: number; spent: number }[],
      { category, amountTransfered }: { category: string; amountTransfered: string }
    ) => {
      const index = acc.findIndex(item => item.title === category);
      if (index !== -1) {
        acc[index].spent += parseFloat(amountTransfered);
      } else {
        acc[acc.length - 1].spent += parseFloat(amountTransfered); // Add to "Others" if category not found
      }
      return acc;
    }, progressList);
  }

  // when user presses the title of the budget
  function handleSelectBudget(budgetId: number) {
    const budget = budgetItems.find((b: budgetingObject) => b.budgetId === budgetId);
    setSelectedBudgetId(budget.budgetId);
  }

  function handleDeleteBudget(budgetId: number | null) {
    if (!email || !budgetId) return;
    deleteBudgetMutation(budgetId); // now works
  }

  function handleResetBudgetProgress() {
    if (selectedBudgetId) {
      resetBudgetProgress(Number(selectedBudgetId));
    }
  }

  return (
    <div className={styles.main}>
      <Header title="Budget" />
      <div className={styles.budgetOverview}>
        <h3>My List of budgetItems</h3>
        {budgets.length === 0 && <p className={styles.subtext}>No budgets set. Set a<span onClick={() => setModalOpenType("add")}> new budget plan </span>now.</p>}
        <div className={styles.budgetItems}>
          {budgets.length > 0 && budgets.map((budget: Budget) => (
            <div
              key={budget.budgetId}
              className={styles.budgetCard}
              onClick={() => handleSelectBudget(budget.budgetId)}
            >
              <h3>{budget.title}</h3>
            </div>
          ))}
        </div>
        {budgets.length > 0 && <p className={styles.subtext}>Or, you can <span onClick={() => setModalOpenType("add")}>create a new budget plan.</span></p>}
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
                  {progressList.map(({ title, limit, spent }) => (
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
                <Button onClick={handleResetBudgetProgress}>Reset Progress</Button>
                <Button>Edit this budget</Button>
                <Button onClick={() => handleDeleteBudget(selectedBudgetId)}>Delete this budget</Button>
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