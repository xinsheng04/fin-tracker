import { useSelector } from "react-redux";
import styles from "./AssetLiabilityCard.module.css";

interface AssetLiabilityDetailsProps{
  id: string;
  viewDetailsOnClick: (openType: string, itemID: string) => void;
}

const AssetLiabilityCard: React.FC<AssetLiabilityDetailsProps> = (
  { id, viewDetailsOnClick }
) => {
  const {item, value, description, date, type} = useSelector((state: any) => state.assetLiability.assetLiabilityItems)
  .find((al: any) => al.id === id);

  return (
    <div className={styles.main}>
      <div className={styles.itemCard} onClick={() => viewDetailsOnClick("details-assets-liabilities", id)}>
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
