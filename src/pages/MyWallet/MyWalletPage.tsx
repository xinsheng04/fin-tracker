import Button from "../../ui/button/Button"
import Dropdown from "../../ui/dropdown/Dropdown";
import { useState, useEffect } from 'react';
import Input from "../../ui/input/Input";
import styles from './myWallet.module.css';
import { useDispatch } from "react-redux";
import { addNewCard } from "../../store/myWallet";
import ShowCard from "./ShowCard";

const MyWallet = () => {
  const dispatch = useDispatch();
  const [addCard, setAddCard] = useState<boolean>(false);
  const [errs, setErrs] = useState<Record<string, string>>({});

  // two way binding for card number input 
  const [cardNoErr, setCardNoErr] = useState<number>();

  function handleClickAddCard() {
    setAddCard(!addCard);
  }

  // Real-time validation for card number length
  useEffect(() => {
    if (cardNoErr !== undefined && cardNoErr !== null) {
      const cardStr = String(cardNoErr);
      if (cardStr.length > 0 && cardStr.length !== 16) {
        setErrs(prev => ({ ...prev, cardLen: "Card number must be 16 digits" }));
      } else {
        setErrs(prev => {
          const { cardLen, ...rest } = prev;
          return rest;
        });
      }
    }
  }, [cardNoErr]);

  function validation(data: Record<string, any>) {
    const newErrs: Record<string, string> = {}
    if (!data.bankName?.trim()) newErrs.bankName = "Bank Name is required";
    if (!data.card?.trim()) newErrs.card = "Bank card is required";
    if (!data.amount?.trim()) newErrs.amount = "Amount is required";

    if (data.card && data.card.length !== 16) {
      newErrs.cardLen = "Card number is invalid"
    }
    // if amount entered is negative 
    if (data.amount <0 ){
      newErrs.amountNeg ="Amount is negative";
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
      bankName: String(rawData.bankName), cardNo: Number(rawData.card), amount: Number(rawData.amount)
    })
    )
  }



  return (
    <>
      <div className={styles.main}>
        <h1>My Wallet</h1>
        <div>
          <Button onClick={handleClickAddCard}>Add Card</Button>
        </div>
        <div>
          {addCard &&
            <form className={styles.form} onSubmit={handleFormSubmission}>
              <Input label="Card Number" name="card" type="text" value={cardNoErr} onChange={(e) => setCardNoErr(Number(e.target.value))} />
              {errs.card && <p>{errs.card}</p>}
              {!errs.cardLen&& <p style={{ color: "green" }}>Valid card!</p>}
              {errs.cardLen && <p>{errs.cardLen}</p>}
              <Dropdown
                label="Bank Name"
                name="bankName"
                required
                options={[
                  { value: "Maybank", label: "Maybank" },
                  { value: "CIMB", label: "CIMB" },
                  { value: "Public Bank", label: "Public Bank" },
                  { value: "RHB", label: "RHB" },
                  { value: "Hong Leong", label: "Hong Leong" },
                ]}
              />
              {errs.bankName && <p>{errs.bankName}</p>}
              <Input label="Card Amount" name="amount" type="number"></Input>
              {errs.amount && <p>{errs.amount}</p>}
              {errs.amountNeg && <p>{errs.amountNeg}</p>}


              <Button type="submit">Submit</Button>
            </form>
          }
        </div>


        <ShowCard></ShowCard>
      </div>

    </>

  )
}

export default MyWallet