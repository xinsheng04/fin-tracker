import {useEffect,useRef} from "react"; 
import {createPortal} from "react-dom"; 
import Button from "../button/Button";
import styles from './Error.module.css'
type ErrorProps = {
  title :string;
  isOpen?: boolean;
  onClose ?: ()=>void;
  children: React.ReactNode;
}

export default function Error ({ title,isOpen,onClose, children}:ErrorProps){
  const errorRef = useRef<HTMLDialogElement>(null);
  
  const handleCancel = (event:Event)=> { 
    event.preventDefault()
    onClose?.();
  };

  const handleClick = (event:MouseEvent)=>{
    // when user press on the backdrop 
    if (event.target === errorRef.current){
      onClose?.();
    }
  }

  useEffect(()=>{
    const error= errorRef.current;
    if (error){ 
      if(isOpen){
        error.showModal();
      }else { 
        error?.close()
      }
    } 
    error?.addEventListener("cancel",handleCancel);
    error?.addEventListener("mousedown",handleClick);
    return ()=> { 
      error?.removeEventListener("cancel",handleCancel);
      error?.removeEventListener("mousedown",handleClick);
    }
  },[isOpen, onClose]);

  return createPortal(
    <dialog ref={errorRef} className={styles.errorDialog} >
      <h2>{title}</h2>
      <p>{children}</p>
      <div className={styles.actions}>
        <Button onClick={onClose}>Ok!</Button>
      </div>
    </dialog>,
    document.getElementById("error")!
  )

}