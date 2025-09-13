import { useSelector } from "react-redux";

export default function ShowCard(){ 
  // only if the wallet has been created and in the store 
  const display = useSelector((state:any)=>state.myWallet.bankAccounts)
  const bankCardImage:Record<string,string> = {
    'Maybank' : 'src/assets/bankCards/maybankCard.png',
    'CIMB' : 'src/assets/bankCards/Cimb.png',
    'Public Bank': 'src/assets/bankCards/publicBank.png',
    'RHB': 'src/assets/bankCards/Rhb.png',
    'Hong Leong':'src/assets/bankCards/hongLeong.png'
  }
  return (
    <>
        {display.map((card:any)=>{
          return(
            <ul>
              <li>
                {bankCardImage[card.bankName]&& (
                  <img 
                  src={bankCardImage[card.bankName]} 
                  alt={card.bankName+" card"} 
                  style={{ width: "100px", marginBottom: "0.5rem" }}
                  />
                )}
              </li>
              <li>bankName :{card.bankName}</li>
              <li>Card Number : {card.cardNo}</li>
              <li>balance : {card.amount}</li>
            </ul>
          )
        })}
    </>
  );

}