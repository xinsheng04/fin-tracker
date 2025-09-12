import Header from "../../components/header/Header"
import CashBalance from "../../components/cashBalance/CashBalance";
import styles from "./OverviewPage.module.css";
import Button from "../../components/button/Button";
const Overview: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.balances}>
        <CashBalance title="My Balance">
          <div className={styles.balanceActions}>
            <Button onClick={() => console.log("Add Income")}>
              Transfer
            </Button>
            <Button onClick={() => console.log("Add Expense")}>
              Received
            </Button>
          </div>
        </CashBalance>
        <CashBalance title="Monthly Income" />
        <CashBalance title="Monthly Expenses" />
      </div>
    </div>
  );
}

export default Overview;