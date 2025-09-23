import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import Form from "../../ui/form/Form";
import Input from "../../ui/input/Input";
import styles from './login.module.css';
import bgImage from "../../assets/background.png";
export default function Login({ }) {
  const navigate = useNavigate();



  const handleLogin = (event: React.FormEvent) => {
    navigate('/Overview')
  }
  return (
    <>
      <div className={styles.container}>
        <img src={bgImage} alt="background Image" className={styles.bgImage} />
        <div className={styles.loginBox}>
          <h1 className={styles.title}>💸 FinTracker</h1>
          {/* The Form component needs an onSubmit handler */}
          <Form submit={handleLogin} className={styles.form} buttonName="Login" >
            <Input label="Username" name="username" type="text" required />
            <Input label="Password" name="password" type="password" required />
            {/* The button should be inside the form to trigger submission */}

          </Form>
          <p className={styles.sentence}>Don't have an account ? <Link to="/Register">Register now</Link></p>

        </div>

      </div>
    </>
  )
}