import React from 'react';

import styles from './input.module.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>& { 
  className?: string;
  label?: string;
  value?:string;
  type?: string;
  onChange?:(e:React.ChangeEvent<HTMLInputElement>)=>void;
}
function Input({className, label, type, value="", ...inputProps}:InputProps) {
  return (
    <label className={`${styles.label} ${className || ""}`}>
      {label && label}
      <input className={styles.input} type={type || "text"} defaultValue={value} {...inputProps} />
    </label>
  )
}
export default Input