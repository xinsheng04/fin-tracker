import React from 'react';

import styles from './input.module.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>& { 
  label:string;

}
function Input({label, ...inputProps}:InputProps) {
  return (
    <label className={styles.label}>
      {label}
      <input className={styles.input} type="number" {...inputProps} />
    </label>
  )
}
export default Input