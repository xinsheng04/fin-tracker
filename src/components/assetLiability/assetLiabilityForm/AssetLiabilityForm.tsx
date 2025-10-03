import React from "react";
import Form from "../../../ui/form/Form";
import Input from "../../../ui/input/Input";
import Dropdown from "../../../ui/dropdown/Dropdown";
import { useSelector } from "react-redux";
import { useAddAssetLiability } from "../../../api/assetLiabilityAPI";
import styles from './assetLiability.module.css';

interface AssetLiabilityFormProps {
  closeForm: () => void;
}

const AssetLiabilityForm: React.FC<AssetLiabilityFormProps> = ({ closeForm }) => {
  const email = useSelector((state: any) => state.userInfo.email);
  const { mutate: addAssetLiability } = useAddAssetLiability(email);

  // adding date 
  let dateTime = new Date().toISOString().slice(0, 10);

  function submitHandler(data: any){
    addAssetLiability({
      title: data.title,
      value: Number(data.value),
      description: data.description,
      date: String(dateTime),
      type: data.type,
      category: data.category
    });
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
          <Input label="Name" name="title" type="text"/>

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