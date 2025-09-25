import styles from './Register.module.css';
import Form from "../../ui/form/Form";
import Input from "../../ui/input/Input";
import { Link } from "react-router-dom";
import {useState} from 'react';
import bgImage from '../../assets/registerBackground.jpg'

export default function Register() {
  const [errs,setErrs] = useState<Record<string,string>>({})

  function validation(data:Record<string,string>){
    const newErrs :Record<string,string> ={}

    if (!data.fname?.trim()){
      newErrs.fname ="First name is required"
    }



    // return the newErrs so that we don't directly update the state
    return newErrs
  }

  function handleRegister(data:any) {
    validation(data)
  }
  return (
    <div className={styles.main}>
      <img src={bgImage} alt="finance background image" className={styles.background} />
      <div className={styles.center}>
        <h1>Register Page</h1>
        <Form submit={handleRegister} className={styles.form}>
          <Input label="First Name" name="fname" ></Input>
          <Input label="Last Name" name="lname"></Input>
          <Input label="Email" type="email" name="email"></Input>
          <Input label="Password" type="password" name="passwword"></Input>
          <Input label="Confirm Password" type="password" name="confirmPassword"></Input>
        </Form>
        <p className={styles.sentence}>Have an Account ? <Link to="/">Login</Link></p>
      </div>
    </div>


  )
}