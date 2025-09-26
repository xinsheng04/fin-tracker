import styles from './Register.module.css';
import Form from "../../ui/form/Form";
import Input from "../../ui/input/Input";
import { Link } from "react-router-dom";
import { useState } from 'react';
import bgImage from '../../assets/registerBackground.jpg'
// using the Error modal (actually not an error) saying that the form was sucessful
import Error from '../../ui/error/Error';

export default function Register() {
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [modal,setModal] = useState<{title:string; message:string} | null>(null);
  function validation(data: Record<string, string>) {
    const newErrs: Record<string, string> = {}

    if (!data.fname?.trim()) {
      newErrs.fname = "First name is required"
    }
    if (!data.lname?.trim()) {
      newErrs.lname = "Last name is required"
    }
    if (!data.email?.trim()) {
      newErrs.email = "Email is required"
    }
    if (!data.password?.trim()) {
      newErrs.password = "Password is required"
    }
    if (!data.confirmPassword?.trim()) {
      newErrs.confirmPassword = "Confirm password is required"
    }

    if (data.password !== data.confirmPassword) {
      newErrs.matching = "Passwords are not matching"
    }

    // return the newErrs so that we don't directly update the state
    return newErrs
  }

  function handleRegister(data: any) {
    let errs = validation(data)
    if (Object.keys(errs).length > 0) {
      setErrs(errs)
      console.log("errs : " +errs)
      return;
    }
    //if there are no errors. We will clear the seTErrro state
    setErrs({});
    setModal({
      title: "Form succesfully filled",
      message:"All entries are good"
    })
  }
  return (
    <>
    {modal&& (
      <Error
        isError={false}
        isOpen={!!modal}
        title={modal.title}
        onClose={()=> setModal(null)}
      >
        {modal.message}
      </Error>
    )}
    <div className={styles.main}>
      <img src={bgImage} alt="finance background image" className={styles.background} />
      <div className={styles.center}>
        <h1>Register Page</h1>
        <Form submit={handleRegister} className={styles.form}>
          <Input label="First Name" name="fname" ></Input>
          {errs.fname && <p>{errs.fname}</p>}
          <Input label="Last Name" name="lname"></Input>
          {errs.lname && <p>{errs.lname}</p>}
          <Input label="Email" type="email" name="email"></Input>
          {errs.email && <p>{errs.email}</p>}
          <Input label="Password" type="password" name="password"></Input>
          {errs.password && <p>{errs.password}</p>}
          <Input label="Confirm Password" type="password" name="confirmPassword"></Input>
          {errs.confirmPassword && <p>{errs.confirmPassword}</p>}
          {errs.matching && <p>{errs.matching}</p>}

        </Form>
        <p className={styles.sentence}>Have an Account ? <Link to="/">Login</Link></p>
      </div>
    </div>
    </>


  )
}