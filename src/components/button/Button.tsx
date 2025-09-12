import React from 'react';
import styles from './button.module.css'

type ButtonProps = { 
  children : React.ReactNode;
  // onClick : ()=>void
}
const Button:React.FC<ButtonProps> = (props)=>{
  // onClick={props.onClick}
  return (
    <button className={styles.button} >{props.children}</button>
  )
}

export default Button;