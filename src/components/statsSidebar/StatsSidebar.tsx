import { useSelector } from "react-redux";
import styles from './StatsSidebar.module.css';
import calcIncomeOrExpense from "../../util/calcIncomeOrExpense";
import formatCurrency from "../../util/currencyFormatter";
import { useGetAllAssetLiabilities } from "../../api/assetLiabilityAPI";
import { useGetAllTransactions } from "../../api/transactionAPI";
import { useGetCards } from "../../api/walletApi";

const StatsSidebar: React.FC = () => {
  const email = useSelector((state: any) => state.userInfo.email);
  const { data: transactions, isLoading: isLoadingTransactions, isError: isErrorTransactions, error: errorTransactions } = useGetAllTransactions(email);
  const { data: cards, isLoading: isLoadingCards, isError: isErrorCards, error: errorCards } = useGetCards(email);
  const { data: assetLiabilities, isLoading: isLoadingAsLi, isError: isErrorAsLi, error: errorAsLi } = useGetAllAssetLiabilities(email);

  if (isLoadingTransactions || isLoadingCards || isLoadingAsLi) {
    return <p>Loading...</p>
  }
  if (isErrorTransactions || isErrorCards || isErrorAsLi) {
    console.error('Error fetching data: ', errorTransactions || errorCards || errorAsLi);
    return <p>Error loading data for the following: 
      ${isErrorTransactions ? 'Transactions' : ''} 
      ${isErrorCards ? 'Cards' : ''} 
      ${isErrorAsLi ? 'Asset Liabilities' : ''}
    . Please try again later.</p>
  }
  
  const totalCashBalance = cards.reduce((acc: number, item: any) => acc + Number(item.cardBalance), 0);
  const assets = assetLiabilities.filter((item: any) => item.type === 'asset');
  const liabilities = assetLiabilities.filter((item: any) => item.type === 'liability');
  const assetSum = Number(assets.reduce((acc: number, item: any) => acc + Number(item.value), 0));
  const liabilitySum = Number(liabilities.reduce((acc: number, item: any) => acc + Number(item.value), 0));
  const income = Number(calcIncomeOrExpense(transactions, "income"));
  const expense = Number(calcIncomeOrExpense(transactions, "expense"));
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