import { useSelector } from "react-redux";
import styles from './showCard.module.css';
export default function ShowCard() {
  // only if the wallet has been created and in the store 
  const display = useSelector((state: any) => state.myWallet.bankAccounts)
  const bankCardImage: Record<string, string> = {
    'Maybank': 'src/assets/bankCards/maybankCard.png',
    'CIMB': 'src/assets/bankCards/Cimb.png',
    'Public Bank': 'src/assets/bankCards/publicBank.png',
    'RHB': 'src/assets/bankCards/Rhb.png',
    'Hong Leong': 'src/assets/bankCards/hongLeong.png'
  }
  return (
    <div className={styles.placement}>
      {display.map((card: any) => {
        return (
          
            <ul className={styles.cardList} key={card.cardNo}>
              <li>
                {bankCardImage[card.bankName] && (
                  <img
                    src={bankCardImage[card.bankName]}
                    alt={card.bankName + " card"}
                    className={styles.cardImage}
                  />
                )}
              </li>

              <li className={styles.cardLabel}>Bank Name:</li>
              <li className={styles.cardValue}>{card.bankName}</li>
              <li className={styles.cardLabel}>Card Number:</li>
              <li className={styles.cardValue}>{card.cardNo}</li>
              <li className={styles.cardLabel}>Balance:</li>
              <li className={styles.cardValue}>{card.amount}</li>
            </ul>
          
        )
      })}
    </div>
  );

}