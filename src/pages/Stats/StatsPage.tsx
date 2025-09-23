import styles from './StatsPage.module.css';
import StatsSidebar from '../../components/statsSidebar/StatsSidebar';
import Header from '../../components/header/Header';
import DonutChart from '../../ui/graph/DonutChart';
import { useSelector } from 'react-redux';
import type React from 'react';

const EmptyChartText: React.FC<{ item: string }> = ({ item }) => {
  return(
    <p className={styles.emptyChartText}>There are no {item} transactions to display.</p>
  )
}

const StatsPage: React.FC = () => {
  const transactions = useSelector((state: any) => state.transaction.recentTransaction);

  function groupByCategory(data: any[]): { label: string; value: number }[] {
    const aggregatedData = data.reduce((acc: Record<string, number>, curr: any) => {
      const { category, amount } = curr;
      if (!acc[category]){
        acc[category] = 0;
      }
      acc[category] += Number(amount);
      return acc;
    }, {} as Record<string, number>);

    const ans = Object.entries(aggregatedData).map(([category, amount]) => ({ label: category, value: Number(amount) }));
    return ans;
  }

  const income = transactions.filter((t: any) => t.typeOfTransfer === 'income');
  const incomeLabelData = groupByCategory(income);
  const expenses = transactions.filter((t: any) => t.typeOfTransfer === 'expense');
  const expenseLabelData = groupByCategory(expenses);

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
                {income.length === 0 && <EmptyChartText item="income" />}
                {income.length > 0 &&
                <DonutChart
                  className={styles.chart}
                  labelData={incomeLabelData}
                  />
                }
              </div>
            </div>
            <div>
              <p>Expenses</p>
              <div className={styles.donutChart}>
                {expenses.length === 0 && <EmptyChartText item="expense" />}
                {expenses.length > 0 &&
                <DonutChart
                  className={styles.chart}
                  labelData={expenseLabelData}
                />
                }
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