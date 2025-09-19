import type { AssetLiabilityKeyValueType } from "../../store/assetLiability";
import styles from "./AssetLiabilityCard.module.css";

interface AssetLiabilityDetailsProps{
  id: number;
  item: string;
  value: number;
  description: string;
  date: string;
  type: "asset" | "liability";
  category: "current" | "fixed";
  viewDetailsOnClick: (item: AssetLiabilityKeyValueType) => void;
}

const AssetLiabilityCard: React.FC<AssetLiabilityDetailsProps> = (
  { id, item, value, description, date, type, category, viewDetailsOnClick }
) => {
  return (
    <div className={styles.main}>
      <div className={styles.itemCard} onClick={() => viewDetailsOnClick({ id, item, value, description, date, type, category })}>
        <div className={styles.item}>
          <strong>{item}</strong>
          <p className={styles.description}>{description}</p>
        </div>
        <p className={styles.date}>{date}</p>
        <div className={type==="asset" ? `${styles.asset}` : `${styles.liability}`}>{type==="asset" ? `+${value}` : `-${value}`}</div>
      </div>
    </div>
  )
}

export default AssetLiabilityCard;
