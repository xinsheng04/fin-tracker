import type React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeItem } from '../../store/assetLiability';
import Button from '../../ui/button/Button';
import styles from './AssetLiabilityDetail.module.css';

const AssetLiabilityDetail: React.FC<{ id: string, onClose: () => void }> = ({
  id, onClose
}) => {
  const dispatch = useDispatch();
  const { item, value, description, date, type, category } = useSelector((state: any) => state.assetLiability.assetLiabilityItems)
  .find((al: any) => al.id === id);
  const assetOrLiability = type === "asset" ? "Asset" : "Liability";
  function deleteItem() {
    onClose();
    dispatch(removeItem({ id }));
  }
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
      <Button onClick={()=>deleteItem()}>Remove {assetOrLiability}</Button>
    </div>
  )
}

export default AssetLiabilityDetail;