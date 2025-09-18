import styles from './StatsPage.module.css';
import StatsSidebar from '../../components/statsSidebar/StatsSidebar';
import Header from '../../components/header/Header';
const StatsPage: React.FC = () => {
  return (
    <div>
      <Header title="My Financial Metrics" />
      <div className={styles.main}>
        <StatsSidebar />
        <div className={styles.visuals}>
          <div className={styles.pieChartSection}></div>
          <div className={styles.graphSection}></div>
        </div>
      </div>
    </div>    
  );
}

export default StatsPage;