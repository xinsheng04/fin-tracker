import React from 'react';
import styles from './button.module.css'

type ButtonProps = { 
  children : React.ReactNode;
  onClick : ()=>void
}
const Button:React.FC<ButtonProps> = (props)=>{
  return (
    <button className={styles.button} onClick={props.onClick}>{props.children}</button>
  )
}

export default Button;