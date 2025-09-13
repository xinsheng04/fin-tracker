import React from 'react';
import styles from './button.module.css'

type ButtonProps = { 
  children : React.ReactNode;
  className ?: string;
  onClick ?: ()=>void;
  type ?: "button"|"submit"|"reset";
}
function Button ({children, className, onClick, type ="button", ...ButtonProps}:ButtonProps){

  return (
    <button 
    className={`${styles.button} ${className || ''}`} 
    onClick={onClick} 
    {...ButtonProps}>
      {children}
    </button>
  )
}

export default Button;