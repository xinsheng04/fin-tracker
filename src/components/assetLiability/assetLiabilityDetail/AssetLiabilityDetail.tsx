import type React from 'react';
import { useDeleteAssetLiability } from '../../../api/assetLiabilityAPI';
import { useSelector } from 'react-redux';
import type { AssetLiabilityObject } from '../../../util/assetLiabilityTypes';
import Button from '../../../ui/button/Button';
import styles from './AssetLiabilityDetail.module.css';

const AssetLiabilityDetail: React.FC<{ assetLiabilityData: AssetLiabilityObject, onClose: () => void }> = ({
  assetLiabilityData, onClose
}) => {
  const { AsLiId, title, value, description, acquireDate, type, category } = assetLiabilityData;
  const { mutate: deleteAssetLiability } = useDeleteAssetLiability(useSelector((state: any) => state.userInfo.email));
  const assetOrLiability = type === "asset" ? "Asset" : "Liability";
  function deleteItem() {
    onClose();
    deleteAssetLiability(AsLiId);
  }
  return(
    <div className={styles.details}>
      <h3 className={styles.header}>{assetOrLiability} Details</h3>
      <table>
        <tbody>
          <tr>
            <th>{assetOrLiability}: </th>
            <td>{title}</td>
          </tr>
          <tr>
            <th>ID: </th>
            <td>{AsLiId}</td>
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
            <td>{acquireDate}</td>
          </tr>
          <tr>
            <th>Category: </th>
            <td>{category.charAt(0).toUpperCase() + category.slice(1)}</td>
          </tr>
        </tbody>
      </table>
      <Button onClick={()=>deleteItem()}>Remove {assetOrLiability}</Button>
    </div>
  )
}

export default AssetLiabilityDetail;