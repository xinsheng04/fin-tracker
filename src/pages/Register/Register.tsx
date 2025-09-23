import Button from "../../ui/button/Button"
import { useNavigate } from "react-router"
export default function Register(){ 
  const navi = useNavigate()
  function handleButton(){
    navi('/')
  } 
  return (
    <>
    <h1>Register Page</h1>
    <Button onClick={handleButton}>Back to login</Button>
    
    </>
  )
}