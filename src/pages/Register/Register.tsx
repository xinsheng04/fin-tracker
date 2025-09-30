import styles from './Register.module.css';
import Form from "../../ui/form/Form";
import Input from "../../ui/input/Input";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import bgImage from '../../assets/registerBackground.jpg'
// using the Error modal (actually not an error) saying that the form was sucessful
import Error from '../../ui/error/Error';
import axios from 'axios';

export default function Register() {
  //to link to the login page 
  const navi = useNavigate();

  const [errs, setErrs] = useState<Record<string, string>>({})
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);
  const [errModal, setErrModal] = useState<{ title: string; message: string } | null>(null);

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

  async function handleRegister(data: any) {
    let errs = validation(data)
    if (Object.keys(errs).length > 0) {
      setErrs(errs)
      console.log("errs : " + errs)
      return;
    }

    try {
      const payload = {
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      }
      const res = await axios.post('http://localhost:5000/api/register', payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      //if there are no errors. We will clear the seTErrro state
      setErrs({});
      setModal({
        title: "Form succesfully filled",
        message: res.data?.message
      })
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const resp = err.response;
        if (resp?.data?.errors && typeof resp.data.errors === 'object') {
          setErrModal(resp.data.errors);
        } else if (resp?.data?.message) {
          setErrModal({ title: "Backend Error", message: resp.data.message });
        } else {
          setErrModal({ title: "Backend Error", message: err.message });
        }
      }
      else {
        setErrModal({ title: "Backend Error", message: String(err) })
      }
    }
  }

  return (
    <>
      {modal && (
        <Error
          isError={false}
          isOpen={!!modal}
          title={modal.title}
          onClose={() => {
            setModal(null)
            navi('/')
          }}
        >
          {modal.message}
        </Error>
      )}
      {errModal && (
        <Error
          isError={true}
          isOpen={!!errModal}
          title={errModal.title}
          onClose={() => setErrModal(null)}
        >
          {errModal.message}
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