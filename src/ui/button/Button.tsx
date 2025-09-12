import React from 'react';
import styles from './button.module.css'

type ButtonProps = { 
  children : React.ReactNode;
  onClick ?: ()=>void
  type ?: "button"|"submit"|"reset";
}
function Button ({children, onClick, type ="button", ...ButtonProps} : ButtonProps){
  
  return (
    <button className={styles.button} onClick={onClick} {...ButtonProps}>{children}</button>
  )
}

export default Button;