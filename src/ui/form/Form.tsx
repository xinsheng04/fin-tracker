import styles from "./Form.module.css";
import Button from "../button/Button";
import { useRef } from "react";

type FormProps = {
  submit: (data: any) => void;
  children: React.ReactNode;
  className?:React.ReactNode;
  buttonName?:string;
  Register?:boolean;
  
}

const Form: React.FC<FormProps> = ({ submit, children,buttonName,Register }) => {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: any){
    event.preventDefault();
    const fd = new FormData(event.target);
    const rawData = Object.fromEntries(fd.entries());
    submit(rawData);
  }

  function handleReset() {
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
      {children}
      <div className={styles.buttonGroup}>
        <Button className={styles.button} type="button" onClick={handleReset}>Reset</Button>
        <Button className={styles.button} type="submit">{buttonName ||"submit"}</Button>
        {Register &&<Button className={styles.button} >Register</Button>}
      </div>
    </form>
  )
}

export default Form;