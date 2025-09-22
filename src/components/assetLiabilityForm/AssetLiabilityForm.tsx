import React from "react";
import Form from "../../ui/form/Form";
import Input from "../../ui/input/Input";
import Dropdown from "../../ui/dropdown/Dropdown";
import { useSelector, useDispatch } from "react-redux";
// import { addRecentTransaction } from "../../store/transaction";
// import { removeAmountFromCard } from "../../store/myWallet";
// import { deductFromRemaining } from "../../store/budgeting";
import { addItem } from "../../store/assetLiability";
import styles from './assetLiability.module.css';

interface AssetLiabilityFormProps {
  closeForm: () => void;
}

const AssetLiabilityForm: React.FC<AssetLiabilityFormProps> = ({ closeForm }) => {
  const dispatch = useDispatch();
  const bankAccounts = useSelector((state: any) => state.myWallet.bankAccounts);
  const cardNos = bankAccounts.map((card: any) => ({ label: `${card.bankName} : ${card.cardNo}`, value: card.cardNo }));

  // adding date 
  let dateTime = new Date().toISOString().slice(0, 10);

  function submitHandler(data: any){
    dispatch(addItem({
      item: data.item,
      value: Number(data.value),
      description: data.description,
      date: String(dateTime),
      type: data.type,
      category: data.category
    }));
    closeForm();
  }

  return (
    <Form submit={submitHandler}>
      <h1>Add Asset/Liability</h1>
      <div className={styles.formGroup}>
        <div className={styles.typeCategory}>
          <p>1. Type and Category</p>
          <Dropdown label="Type  " name="type" options={["asset", "liability"]} />
          <Dropdown label="Category  " name="category" options={["current", "fixed"]} />
        </div>
        <div className={styles.details}>
          <p>2. Name of Asset/Liability</p>
          <Input label="Name" name="item" type="text"/>

          <p>3. Monetary value</p>
          <Input label="Value" name="value" type="number" min="0" step="0.01"/>

          <p>4. Description (optional)</p>
          <textarea className={styles.commentsBox} name="description" placeholder="Describe the asset/liability" />
        </div>
      </div>
    </Form>
  );
}

export default AssetLiabilityForm;