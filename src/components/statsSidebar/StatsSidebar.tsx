import { useSelector } from "react-redux";
import styles from './StatsSidebar.module.css';
import calcIncomeOrExpense from "../../util/calcIncomeOrExpense";
import formatCurrency from "../../util/currencyFormatter";
const StatsSidebar: React.FC = () => {
  const transactions = useSelector((state: any) => state.transaction.recentTransaction);
  const assetLiabilities = useSelector((state: any) => state.assetLiability.assetLiabilityItems);
  const bankAccount = useSelector((state: any) => state.myWallet.bankAccounts);
  
  const totalCashBalance = bankAccount.reduce((acc: number, item: any) => acc + item.amount, 0);
  const assets = assetLiabilities.filter((item: any) => item.type === 'asset');
  const liabilities = assetLiabilities.filter((item: any) => item.type === 'liability');
  const assetSum = assets.reduce((acc: number, item: any) => acc + item.value, 0);
  const liabilitySum = liabilities.reduce((acc: number, item: any) => acc + item.value, 0);
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
                {formatCurrency(income)}
              </td>
            </tr>
            <tr>
              <th>Net expenses</th>
              <td>
                {formatCurrency(expense)}
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
              <td>{formatCurrency(assetSum + totalCashBalance - liabilitySum)}</td>
            </tr>
            <tr>
              <th>Debt-to-income ratio</th>
              <td>{liabilitySum !== 0 && income !== 0 ? (liabilitySum / income * 100).toFixed(2) : 0}%</td>
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