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

export default function loginUser(req, res) {
  res.json({ "users": ["userOne", "userTwo"] });
};

export async function regUser(req, res) {
  try {
    const { fname, lname, email, password, confirmPassword } = req.body || {};

    if (!fname || !lname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Missing Fields" })
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: "passwords do not match" })
    }

    await pool.query(
      'INSERT INTO users (fname, lname, email,password) VALUES (?,?,?,?)',
      [fname, lname, email, password]
    );
   res.status(201).json({message:"User registered successfully"})
  }catch (err){
    if (err.code ==='ER_DUP_ENTRY'){
      return res.status(409).json({message :"Email already exists"})
    }
    console.error(err);
    res.status(500).json({message:'Server error'})
  }

}