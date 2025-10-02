import mysql from 'mysql2/promise';
import { config } from '../config.js';

const pool = mysql.createPool(config.db);

/*
?email=userEmail
*/

export const getAllTransactionData = async (req, res) => {
  const {email} = req.query;
  if(!email) {
    return res.status(400).json({error: 'Controller: Email is required'});
  }
  try{
    const [rows] = await pool.query(
      `select * from transaction t 
      join cards c on t.cardNo = c.cardNo 
      join users u on c.email = u.email
      where u.email = ?
      order by t.dateTransfer.desc;`, 
      [email]
    );
    return res.status(200).json(rows);
  } catch(error) {
    return res.status(500).json({error: `Controller: Database query error: ${error.message}`});
  }
}

/*
?email=userEmail
{
  transaction: {
    amount: number,
    typeOfTransfer: string,
    category: string,
    comments: string,
    cardNo: string,
  }
}
 */

export const addTransactionEntry = async (req, res) => {
  const {email} = req.query;
  const {transaction} = req.body;
  if(!email || !transaction){
    return res.status(400).json({error: 'Controller: Email and transaction data are required'});
  }
  try{
    const {amount, typeOfTransfer, category, comments, cardNo} = transaction;
    const date = new Date().toISOString().split('T')[0];
    const [result] = await pool.query(
      `insert into transaction 
      (cardNo, amountTransfered, category, typeOfTransfer, dateTransfer, comment) 
      values (?,?,?,?,?,?);`,
      [cardNo, amount, category, typeOfTransfer, date, comments]
    );
    await pool.query(
      `update cards set cardBalance = cardBalance + ? where cardNo = ? and email = ?;`,
      [typeOfTransfer === 'expense' ? -amount : amount, cardNo, email]
    );
    return res.status(200).json({message: 'Transaction entry added', id: result.insertId});
  } catch(error) {
    return res.status(500).json({error: `Controller: Database query error: ${error.message}`});
  }
}