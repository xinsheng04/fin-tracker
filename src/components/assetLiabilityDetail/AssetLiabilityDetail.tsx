import type React from 'react';
import type { AssetLiabilityKeyValueType } from '../../store/assetLiability';
import styles from './AssetLiabilityDetail.module.css';

const AssetLiabilityDetail: React.FC<AssetLiabilityKeyValueType> = ({
  id,
  item,
  value,
  description,
  date,
  type,
  category,
}) => {
  const assetOrLiability = type === "asset" ? "Asset" : "Liability";
  return(
    <div className={styles.details}>
      <h3 className={styles.header}>{assetOrLiability} Details</h3>
      <table>
        <tbody>
          <tr>
            <th>{assetOrLiability}: </th>
            <td>{item}</td>
          </tr>
          <tr>
            <th>ID: </th>
            <td>{id}</td>
          </tr>
          <tr>
            <th>Monetary Value: </th>
            <td className={type === "asset" ? styles.asset : styles.liability}>{value}</td>
          </tr>
          <tr>
            <th>Description: </th>
            <td>{description}</td>
          </tr>
          <tr>
            <th>Date: </th>
            <td>{date}</td>
          </tr>
          <tr>
            <th>Category: </th>
            <td>{category.charAt(0).toUpperCase() + category.slice(1)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AssetLiabilityDetail;