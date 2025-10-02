import { useSelector } from "react-redux";
import Button from "../../ui/button/Button";
import styles from './showCard.module.css';
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { delCard } from "../../api/walletApi";
import { getCards } from "../../api/walletApi";

export default function ShowCard() {
  // adding a new QueryClinet 
  const queryClient = useQueryClient();

  // need the email from the useSelector from the store 
  const email = useSelector((state: any) => state.userInfo.email);
  console.log("This is from the wallet store ", email);

  // only if the wallet has been created and in the store 
  // const display = useSelector((state: any) => state.myWallet.bankAccounts)
  const bankCardImage: Record<string, string> = {
    'Maybank': 'src/assets/bankCards/maybankCard.png',
    'CIMB': 'src/assets/bankCards/Cimb.png',
    'Public Bank': 'src/assets/bankCards/publicBank.png',
    'RHB': 'src/assets/bankCards/Rhb.png',
    'Hong Leong': 'src/assets/bankCards/hongLeong.png'
  }
  // writing a function to get the cards using tanStack querys
  const { data: cards = [], error } = useQuery({
    queryKey: ['cards', email],
    queryFn: () => getCards(email as string),
    enabled: !!email
  });
  console.log("These are the cards from the backend : ", cards);


  const {mutate:deleteSpecificCard} = useMutation({
    mutationFn: delCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cards', email] });
    }
  })

  // Handle delete card
  function onDeleteBankCard(cardNo: string) {
    if (!email) return;
    deleteSpecificCard({ email, cardNo });
  }

 
  return (
    <div className={styles.placement}>
      {(
        cards.map((card: any) => (
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
            <li className={styles.cardValue}>{card.cardBalance}</li>
            <li>
              <Button
                type="button"
                className={styles.deleteBtn}
                onClick={() => onDeleteBankCard(card.cardNo)}
              >
                Delete
              </Button>
            </li>
          </ul>
        ))
      )}
    </div>
  );


}