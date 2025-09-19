import styles from './StatsPage.module.css';
import StatsSidebar from '../../components/statsSidebar/StatsSidebar';
import Header from '../../components/header/Header';
import DonutChart from '../../ui/graph/DonutChart';
import { useSelector } from 'react-redux';

const StatsPage: React.FC = () => {
  const transactions = useSelector((state: any) => state.transaction.recentTransaction);

  const income = transactions.filter((t: any) => t.typeOfTransfer === 'income');
  const incomeLabelData = income.map((t: any) => ({ label: t.category, value: t.amount }));
  const expenses = transactions.filter((t: any) => t.typeOfTransfer === 'expense');
  const expenseLabelData = expenses.map((t: any) => ({ label: t.category, value: t.amount }));

  return (
    <div>
      <Header title="My Financial Metrics" />
      <div className={styles.main}>
        <StatsSidebar />
        <div className={styles.visuals}>
          <div className={styles.pieChartSection}>
            <div>
              <p>Income</p>
              <div className={styles.donutChart}>
                <DonutChart
                  className={styles.chart}
                  labelData={incomeLabelData}
                  />
              </div>
            </div>
            <div>
              <p>Expenses</p>
              <div className={styles.donutChart}>
                <DonutChart
                  className={styles.chart}
                  labelData={expenseLabelData}
                />
              </div>
            </div>
          </div>
          <div className={styles.graphSection}></div>
        </div>
      </div>
    </div>    
  );
}

export default StatsPage;