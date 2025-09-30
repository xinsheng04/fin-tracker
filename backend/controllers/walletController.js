import mysql from 'mysql2/promise';
import { config } from '../config.js';

const pool = mysql.createPool(config.db);

// verifying connection ! 
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database : ' + err.stack);
    return;
  }
  console.log('Successfullly connected to the database');
  connection.release();
})

export default async function registerCard(req, res) {
  const { email, bankName, cardNo, amount } = req.body
  // base case 
  if (!email || !bankName || !cardNo || !amount) {
    return res.status(400).json({ message: "credentials are not filled" })
  }
  if(cardNo.length !== 16){
    return res.status(400).json({message:"card entererd is invalid"})
  }
  try {
    await pool.query(
      'INSERT INTO cards (cardNo, email, bankName, cardBalance) VALUES ( ?,?,?,?)',
      [cardNo, email, bankName, amount]
    );
    res.status(201).json({ message: "card registered successfully" })
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: "Card already exists" })
    }
    console.error(err);
    res.status(500).json({ message: "Server Error" })
  }

}

export async function getCards(req, res) {
  //getCards?email=abc@gmail.com
  const { email } = req.query

  try {
    const [row] = await pool.query(
      'SELECT * from cards WHERE email = ? ',
      [email]
    )

    if (row.length === 0) {
      return res.status(201).json({ message: 'no cards made yet' })
    }
    console.log('the cards ', row);
    return res.status(200).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Backend Error' })
  }
}

/*
documentation
payload for updateAmount 
const payload  = {
  email = email, 
  cardNo = cardNo (from use selector)
  action = either expense or income
  amount = data.amount
}
*/

export async function updateAmount(req, res) {
  let { email, cardNo, amount, action } = req.body;

  if (!email || !cardNo || !amount || !action) {
    return res.status(400).json({ message: 'Controller:All fields are required' });
  }

  try {
    // check if the account and card exists
    const [accountExist] = await pool.query(
      'SELECT * FROM cards where email = ? and cardNo = ?',
      [email, cardNo]

    )

    const amt = Number(amount);
    if (Number.isNaN(amt) || amt < 0) {
      return res.status(400).json({ message: 'amoutn must be a non negative number' });
    }
    if (accountExist.length === 0) {
      return res.status(400).json({ message: 'card does not exist' });
    }
    let result;
    if (action === "increment") {
      [result] = await pool.query('update cards set cardBalance = cardBalance + ? where cardNo = ?',
        [amt, cardNo])

    } else if (action === 'decrement') {
      const currentBalanace = Number(accountExist[0].cardBalance);
      if (amt > currentBalanace) {
        return res.status(403).json({ message: `amount that you wish to decrement is way more than your current balance, ${currentBalanace} `/*show current balance*/ })
      }
      [result] = await pool.query('update cards set cardbalance = cardBalance - ? where cardNo =? ', [amt, cardNo])
    }
    return res.status(200).json({
      message: 'cardbalance succesfully updated ',
      changedRows: result.changedRows
    })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "server error" })
  }
}

export async function deleteCard(req, res) {
  const { email, cardNo } = req.body;
  if (!email || !cardNo) {
    return res.status(400).json({ message: 'all credentials needs to be filled' })
  }
  try {
    const [row] = await pool.query(
      'DELETE from cards where email= ? and cardNo = ?', [email, cardNo]
    )
    if (row.length === 0) {
      return res.status(402).json({ message: 'credentials do not exist' });
    }
    return res.status(200).json({ message: 'card successfully deleted' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'server errors' });
  }

}