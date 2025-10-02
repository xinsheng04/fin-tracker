import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import type { budgetObject } from "../../store/budgeting";
import { resetBudgetProgress } from "../../store/budgeting";
import AddBudgetForm from "../../components/budget/addBudgetForm/AddBudgetForm";
import Modal from "../../ui/modal/Modal";
// import BudgetDonut from "../../components/budget/budgetDonut/BudgetDonut";
import ProgressChart from "../../components/budget/budgetDonut/ProgressChart";
import Header from "../../components/header/Header";
import styles from "./BudgetingPage.module.css";
import Button from "../../ui/button/Button";
import type React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBudgetDataAPI } from "../../api/budgetingAPI";
import { useGetAllTransactions } from "../../api/transactionAPI";

const BudgetingPage: React.FC = () => {
  // getting email from the userInfo store;
  const email = useSelector((state: {userInfo:{email:string}}) => state.userInfo.email);
  const dispatch = useDispatch();
  const budgets = useSelector((state: any) => state.budgeting.budgets);
  const expensesList = useSelector((state: any) => state.transaction.recentTransaction);
  const expenses = expensesList.filter((t: any) => t.typeOfTransfer === "expense");
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(budgets.length > 0 ? budgets[0].id : "");
  const [modalOpenType, setModalOpenType] = useState<"add" | "edit" | null>(null);

  const selectedBudget = budgets.find((b: budgetObject) => b.id === selectedBudgetId) || null;
  let progressList: { spent: number; limit: number; title: string }[] = [];

  // using tanStack query and not removing RTK so that i don't break the code base lmao
  //migrating is hard ngl T_T
  const {data:budgetQ = []} = useQuery({
    queryKey:['budgetId',email],
    queryFn:()=>getAllBudgetDataAPI(email as string),
    enabled:!!email
  });
  console.log(budgetQ)
  console.log('budgetid for budget[0] ',budgetQ[0].budgetId)

  const {data:transaction, isLoading,isError} = useGetAllTransactions(email);
  console.log('transaction ', transaction);

  

  if (selectedBudget?.categoryAndAmount) {
    // Populate progressList with categories and their limits
    progressList = selectedBudget.categoryAndAmount.map(
      ({ category, amount }: { category: string; amount: number }) => ({
        title: category,
        limit: amount,
        spent: 0,
      })
    );

    // Add "Others" category
    progressList.push({
      title: "Others",
      limit: 0, // Use 0 or calculate unallocated limit if needed
      spent: 0,
    });

    const dateFrom = new Date(selectedBudget.trackDateFrom);

    // Filter expenses based on the budget's trackDateFrom
    const startFrom = expenses.findIndex((expense: any) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= dateFrom;
    });
    const expensesToConsider = startFrom !== -1 ? expenses.slice(startFrom) : [];

    // Update spent values
    progressList = expensesToConsider.reduce((
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
    setSelectedBudgetId(budget.id);
  }

  function handleResetBudgetProgress() {
    if (selectedBudgetId) {
      const todayDate = new Date().toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
      dispatch(resetBudgetProgress({ budgetId: selectedBudgetId, newTrackDateFrom: todayDate }));

    }
  }

  return (
    <div className={styles.main}>
      <Header title="Budget" />
      <div className={styles.budgetOverview}>
        <h3>My List of Budgets</h3>
        <div className={styles.budgets}>
          {budgetQ.length === 0 && <p>No budgets set. Set a<span onClick={() => setModalOpenType("add")}> new budget plan </span>now.</p>}
          {budgetQ.length > 0 && budgetQ.map((budget: budgetObject) => (
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