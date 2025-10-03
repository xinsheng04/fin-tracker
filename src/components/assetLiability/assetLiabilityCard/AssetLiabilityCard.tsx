import type { AssetLiabilityObject } from "../../../util/assetLiabilityTypes";
import styles from "./AssetLiabilityCard.module.css";

interface AssetLiabilityCardProps{
  assetLiabilityData: AssetLiabilityObject;
  viewDetailsOnClick: (assetLiabilityData: AssetLiabilityObject) => void;
}

const AssetLiabilityCard: React.FC<AssetLiabilityCardProps> = (
  { assetLiabilityData, viewDetailsOnClick }
) => {
  const { title, value, description, acquireDate, type } = assetLiabilityData;

  return (
    <div className={styles.main}>
      <div className={styles.itemCard} onClick={() => viewDetailsOnClick(assetLiabilityData)}>
        <div className={styles.title}>
          <strong>{title}</strong>
          <p className={styles.description}>{description}</p>
        </div>
        <p className={styles.date}>{acquireDate.split("T")[0]}</p>
        <div className={type==="asset" ? `${styles.asset}` : `${styles.liability}`}>{type==="asset" ? `+${value}` : `-${value}`}</div>
      </div>
    </div>
  )
}

export default AssetLiabilityCard;
