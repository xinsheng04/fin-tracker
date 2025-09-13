import { useSelector } from "react-redux";

export default function ShowCard(){ 
  // only if the wallet has been created and in the store 
  const display = useSelector((state:any)=>state.myWallet.bankAccounts)
  
  return (
    <>
        {display.map((card:any)=>{
          return(
            <ul>
              <li>bankName :{card.bankName}</li>
              <li>Card Number : {card.cardNo}</li>
              <li>balance : {card.amount}</li>
            </ul>
          )
        })}
    </>
  );

}