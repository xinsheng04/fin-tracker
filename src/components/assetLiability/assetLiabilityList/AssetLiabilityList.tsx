import { useSelector } from "react-redux";
import { useState } from "react";
import type { AssetLiabilityKeyValueType } from "../../../store/assetLiability";
import AssetLiabilityCard from "../assetLiabilityCard/AssetLiabilityCard";
import styles from "./AssetLiabilityList.module.css";

interface AssetLiabilityListProps{
  viewDetailsOnClick: (openType: string, id: string) => void;
}

const AssetLiabilityList: React.FC<AssetLiabilityListProps> = ({ viewDetailsOnClick }) => {
  const [assetOrLiability, setAssetOrLiability] = useState<"asset" | "liability" | "all">("all");
  const [category, setCategory] = useState<"fixed" | "current" | "all">("all");

  const list = useSelector((state: any) => state.assetLiability.assetLiabilityItems);
  const assetOrLiabilityExists = list.some((item: any) => item.type === assetOrLiability || assetOrLiability === "all");
  const categoryExists = list.some((item: any) => item.category === category || category === "all");

  const shouldRender = assetOrLiabilityExists && categoryExists;

  return (
    <div className={styles.main}>
      <h3 className={styles.header}>Assets & Liabilities</h3>
      <div className={styles.filters}>
        <ul>
          <li>
            <p
              className={assetOrLiability === "all" ? styles.active : ""}
              onClick={() => setAssetOrLiability("all")}>All
            </p>
          </li>
          <li>
            <p
              className={assetOrLiability === "asset" ? styles.active : ""}
              onClick={() => setAssetOrLiability("asset")}>Assets
            </p>
          </li>
          <li>
            <p
              className={assetOrLiability === "liability" ? styles.active : ""}
              onClick={() => setAssetOrLiability("liability")}>Liabilities
            </p>
          </li>
        </ul>
        <ul>
          <li>
            <p
              className={category === "all" ? styles.active : ""}
              onClick={() => setCategory("all")}>All
            </p>
          </li>
          <li>
            <p
              className={category === "fixed" ? styles.active : ""}
              onClick={() => setCategory("fixed")}>Fixed
            </p>
          </li>
          <li>
            <p
              className={category === "current" ? styles.active : ""}
              onClick={() => setCategory("current")}>Current
            </p>
          </li>
        </ul>
      </div>
      <div className={styles.list}>
        {!shouldRender && <p className={styles.noItems}>No items to display</p>}
        {shouldRender && list.map((item: AssetLiabilityKeyValueType) => {
          if ((item.type === assetOrLiability || assetOrLiability === "all") &&
              (item.category === category || category === "all")) {
            return (
              <AssetLiabilityCard
                key={item.id}
                id={item.id}
                viewDetailsOnClick={viewDetailsOnClick}
              />
            );
          }
          else{
            return null;
          }
        })}
      </div>
    </div>
  )
}

export default AssetLiabilityList;