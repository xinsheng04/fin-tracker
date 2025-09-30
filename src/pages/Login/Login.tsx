import { useNavigate } from "react-router-dom"
import { useState } from 'react';
import { login } from "../../store/userInfo";
import Error from "../../ui/error/Error";
import { Link } from "react-router-dom";
import Form from "../../ui/form/Form";
import Input from "../../ui/input/Input";
import styles from './login.module.css';
import bgImage from "../../assets/background.png";
import axios from 'axios';
import { useDispatch } from "react-redux";
export default function Login({ }) {
  const [errModal, setErrModal] = useState<{ title: string; message: string } | null>(null);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);

  // use Dispatch for the userInfo
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // to dispatch all the data from the post request 
  function dispatchUser(userData:Record<string,any>){ 
    dispatch(login({
      fname:userData.fname,
      lname:userData.lname,
      email:userData.email,
      role: userData.role?? "User"
    }))
  }
  async function handleLogin(data: any) {
    try {
      const payload = {
        email: data.email,
        password: data.password
      }
      const res = await axios.post('http://localhost:5000/api/loginUser', payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      dispatchUser(res.data?.userDetails);
      setModal({title:'Success Login', message : res.data?.message})


    } catch (errs) {
      if (axios.isAxiosError(errs)) {
        const resp = errs.response;
        if (resp?.data?.errors && typeof resp.data.errors === 'object') {
          setErrModal(resp.data.errors);
        } else if (resp?.data?.message) {
          setErrModal({ title: "User Error", message: resp.data.message });
        } else {
          setErrModal({ title: "Backend Error", message: errs.message });
        }
      }
      else {
        setErrModal({ title: "Backend Error", message: String(errs) })
      }
    }

  }


  return (
    <>
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
      {modal && (
        <Error
          isError={false}
          isOpen={!!modal}
          title={modal.title}
          onClose={() => {
            setModal(null)
            navigate('/Overview')
          }
          }
        >
          {modal.message}
        </Error >
      )
      }
      <div className={styles.container}>
        <img src={bgImage} alt="background Image" className={styles.bgImage} />
        <div className={styles.loginBox}>
          <h1 className={styles.title}>💸 FinTracker</h1>
          {/* The Form component needs an onSubmit handler */}
          <Form submit={handleLogin} className={styles.form} buttonName="Login" >
            <Input label="Email" name="email" type="text" required />
            <Input label="Password" name="password" type="password" required />
            {/* The button should be inside the form to trigger submission */}

          </Form>
          <p className={styles.sentence}>Don't have an account ? <Link to="/Register">Register now</Link></p>

        </div>

      </div>
    </>
  )
}