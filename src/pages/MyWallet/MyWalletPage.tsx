import Button from "../../components/button/Button"
import { useState } from 'react';
import Input from "../../components/input/Input";
import styles from './myWallet.module.css';
import { useDispatch } from "react-redux";
import { addNewCard } from "../../store/myWallet";

const MyWallet = () => {
  const [addCard, setAddCard] = useState<boolean>(false);

  function handleClickAddCard() {
    setAddCard(!addCard);
  }
  return (
    <div className={styles.main}>
      <h1>My Wallet</h1>
      <div>
        <Button onClick={handleClickAddCard}>Add Card</Button>
      </div>
      <div>
        {addCard &&
          <form action="">
            <Input label="Card Number" name="card" type="number" required/>
            <Input label="Bank Name" name="bankName" type="text" required></Input>
            <Input label="Card Amount" name="amount" type="number" required></Input> 
          </form>

        }
      </div>

    </div>

  )
}

export default MyWallet