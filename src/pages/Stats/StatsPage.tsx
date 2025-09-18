import styles from './StatsPage.module.css';
const StatsPage: React.FC = () => {
  return (
    <div>

      <div className={styles.pieChartSection}></div>
      <div className={styles.graphSection}></div>
    </div>
  );
}

export default StatsPage;