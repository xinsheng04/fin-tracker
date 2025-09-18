import { useSelector } from "react-redux";
import styles from './StatsSidebar.module.css';
import calcIncomeOrExpense from "../../util/calcIncomeOrExpense";
const StatsSidebar: React.FC = () => {
  const transactions = useSelector((state: any) => state.transaction.recentTransaction);
  const income = calcIncomeOrExpense(transactions, "income");
  const expense = calcIncomeOrExpense(transactions, "expense");
  const savingsRate = income !== 0 ? ((income - expense) / income * 100) : 0;
  return (
    <div className={styles.metricSection}>
      <div className={styles.summary}>
        <p>Summary</p>
        <table>
          <tbody>
            <tr>
              <th>Net income</th>
              <td>
                {income}
              </td>
            </tr>
            <tr>
              <th>Net expenses</th>
              <td>
                {expense}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.indicators}>
        <p>Key Indicators</p>
        <table>
          <tbody>
            <tr>
              <th>Savings rate</th>
              <td>{savingsRate.toFixed(2)}%</td>
            </tr>
            <tr>
              <th>Net worth</th>
              <td>0000</td>
            </tr>
            <tr>
              <th>Debt-to-income ratio</th>
              <td>0000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.trends}>
        <p>Projections</p>
        <table>
          <tbody>
            <tr>
              <th>Projected End-of-period Balance</th>
              <td>0000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatsSidebar;