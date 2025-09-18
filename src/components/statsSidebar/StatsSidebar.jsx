import { useSelector } from "react-redux";
const StatsSidebar = () => {
  return (
    <div className={styles.metricSection}>
        <h1>My Financial Metrics</h1>
        <div className={styles.summary}>
          <p>Summary of Financial Position</p>
          <table>
            <tbody>
              <tr>
                <th>Net income</th>
                <td>
                  {/* income */}
                </td>
                <th>Net expenses</th>
                <td>
                  {/* expenses */}
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
                <td>{/* savingsRate */}</td>
              </tr>
              <tr>
                <th>Net worth</th>
                <td>{/* netWorth */}</td>
              </tr>
              <tr>
                <th>Debt-to-income ratio</th>
                <td>{/* debtToIncomeRatio */}</td>
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
                <td>{/* projectedEndOfPeriodBalance */}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  );
}