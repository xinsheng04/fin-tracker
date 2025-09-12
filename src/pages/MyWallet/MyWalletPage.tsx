import Button from "../../components/button/Button"
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { addNewCard } from "../../store/myWallet";

const MyWallet = () => {
  const [addCard,setAddCard]= useState<boolean>(false);

  function handleClickAddCard (){
    setAddCard(!addCard);
  }
  return (
    <>
      <h1>My Wallet</h1>
      <Button onClick={handleClickAddCard}>Add Card</Button>
      {addCard &&
      <form>
        
      </form>
      
      }
    </>

  )
}

export default MyWallet