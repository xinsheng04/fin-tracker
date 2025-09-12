import Header from "../../components/header/Header"
import { useSelector } from "react-redux";
const Overview = () => {
  // BankAccount is an array
  const bankAccount = useSelector((state:any)=>state.myWallet.bankAccounts)
  console.log(bankAccount);
  return (
    <>
      <Header />
      {bankAccount.map((account:any, idx:number)=>{
        return(
        <ul key={idx}>
          <li>Bank name :{account.bankName}</li>
          <li>Card Number : {account.cardNo}</li>
          <li>Amount : {account.amount}</li>
        </ul>
      )})}
    </>
  );
}

export default Overview;