import Button from "../../components/button/Button"
import { useState } from 'react';
import Input from "../../components/input/Input";
import styles from './myWallet.module.css';
import { useDispatch } from "react-redux";
import { addNewCard } from "../../store/myWallet";

const MyWallet = () => {
  const dispatch = useDispatch();
  const [addCard, setAddCard] = useState<boolean>(false);
  const [errs, setErrs] = useState<Record<string, string>>({});

  function handleClickAddCard() {
    setAddCard(!addCard);
  }

  function validation(data: Record<string, any>) {
    const newErrs: Record<string, string> = {}
    if (!data.bankName?.trim()) newErrs.bankName = "Bank Name is required";
    if (!data.card?.trim()) newErrs.card = "Bank card is required";
    if (!data.amount?.trim()) newErrs.amount = "Amount is required";

    if (data.card && data.card.length > 16){
      newErrs.cardLen = "Card number is invalid"
    }
    return newErrs;
  }

  function handleFormSubmission(event: any) {
    event.preventDefault();

    // fd short for form data 
    const fd = new FormData(event.target)
    const rawData = Object.fromEntries(fd.entries());
    console.log(rawData)
    let errs = validation(rawData)
    if (Object.keys(errs).length > 0) {
      setErrs(errs)
      return;
    }
    //if there are no errors. We will clear the seTErrro state
    setErrs({});
    console.log('Form successfully filled');
    dispatch(addNewCard({
      bankName: String(rawData.bankName), cardNo: Number(rawData.card), amount:Number(rawData.amount)
    })
  )
  }



  return (
    <div className={styles.main}>
      <h1>My Wallet</h1>
      <div>
        <Button onClick={handleClickAddCard}>Add Card</Button>
      </div>
      <div>
        {addCard &&
          <form className={styles.form} onSubmit={handleFormSubmission}>
            <Input label="Card Number" name="card" type="number" />
            {errs.card && <p>{errs.card}</p>}
            {errs.cardLen && <p>{errs.cardLen}</p>}
            <Input label="Bank Name" name="bankName" type="text" ></Input>
            {errs.bankName && <p>{errs.bankName}</p>}
            <Input label="Card Amount" name="amount" type="number"></Input>
            {errs.amount && <p>{errs.amount}</p>}

            <Button type="submit">Submit</Button>
          </form>

        }
      </div>

    </div>

  )
}

export default MyWallet