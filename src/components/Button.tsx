import React from 'react';
import styles from './button.module.css'

type ButtonProps = { 
  children : React.ReactNode;
}
const Button:React.FC<ButtonProps> = (props)=>{
  return (
    <button className={styles.button}>{props.children}</button>
  )
}

export default Button;