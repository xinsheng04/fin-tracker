import { useSelector } from "react-redux";
import styles from './StatsSidebar.module.css';
import calcIncomeOrExpense from "../../util/calcIncomeOrExpense";
import formatCurrency from "../../util/currencyFormatter";
import { useGetAllAssetLiabilities } from "../../api/assetLiabilityAPI";
import { useGetAllTransactions } from "../../api/transactionAPI";
import { useGetCards } from "../../api/walletApi";

const StatsSidebar: React.FC = () => {
  const email = useSelector((state: any) => state.userInfo.email);
  const { data: transactions } = useGetAllTransactions(email);
  const { data: cards } = useGetCards(email);
  const { data: assetLiabilities } = useGetAllAssetLiabilities(email);
  
  const totalCashBalance = cards.reduce((acc: number, item: any) => acc + item.cardBalance, 0);
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