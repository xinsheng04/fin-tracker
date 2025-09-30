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
  const {email, bankName,cardNo, amount} = req.body
  // base case 
  if (!email || !bankName || !cardNo || !amount){
    return res.status(400).json({message:"credentials are not filled"})
  }
  try{
    await pool.query(
      'INSERT INTO cards (cardNo, email, bankName, cardBalance) VALUES ( ?,?,?,?)',
      [cardNo,email,bankName,amount]
    );
    res.status(201).json({message:"card registered successfully"})
  }catch(err){
    if (err.code === 'ER_DUP_ENTRY'){
      return res.status(409).json({message:"Card already exists"})
    }
    console.error(err);
    res.status(500).json({message:"failed to connect to backend"})
  }

}

export async function getCards(req,res){
  const{email} = req.body
  
  try{ 
   const [row]= await pool.query(
    'SELECT * from cards WHERE email = ? ',
    [email]
    )
    
    if (row.length ===0){
      return res.status(201).json({message:'no cards made yet'})
    }

  } catch(err){
    console.error(err);
    res.status(500).json({message:'Backend Error'})
  }
}