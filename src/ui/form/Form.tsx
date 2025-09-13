import styles from "./Form.module.css";
import Button from "../button/Button";

type TransactionFormProps = {
  submit: (data: any) => void;
  children: React.ReactNode;
}

const Form: React.FC<TransactionFormProps> = ({ submit, children }) => {
  function handleSubmit(event: any){
    event.preventDefault();
    const fd = new FormData(event.target);
    const rawData = Object.fromEntries(fd.entries());
    submit(rawData);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {children}
      <div className={styles.buttonGroup}>
        <Button className={styles.button} type="reset">Reset</Button>
        <Button className={styles.button} type="submit">Submit</Button>
      </div>
    </form>
  )
}

export default Form;