import { createPool } from '../config.js';

const pool = await createPool();

// verifying connection ! 
try {
  const conn = await pool.getConnection();
  console.log('Successfully connected to the database');
  conn.release();
} catch (err) {
  console.error('Error connecting to the database : ' + err.stack);
}

export default function test(req, res) {
  res.json({ "users": ["userOne", "userTwo"] });
};

export async function login(req, res) {
  const { email, password } = req.body;
  // base case 
  if (!email || !password) { 
    return res.status(400).json({message:'missing credentials'})
  }

  try {
    const [row] = await pool.query(
      'SELECT * from users WHERE email=? ',
      [email]
    )
    if (row.length===0 ){
      return res.status(401).json({message:'Account does not exists'});
    }
    const account = row[0];
    const passwordMatch = password === account.password;

    if (!passwordMatch){
      return res.status(401).json({message:'invalid password'})
    }
    console.log(row)
    return res.status(200).json({message: 'login succesful!',userDetails:row})
  }
  catch (err) {
    console.err(err);
    return res.status(500).json({message:'Database Errors'})
  }

}

export async function regUser(req, res) {
  try {
    const { fname, lname, email, password, confirmPassword } = req.body || {};

    if (!fname || !lname || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Missing Fields" })
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: "passwords do not match"})
    }

    await pool.query(
      'INSERT INTO users (fname, lname, email,password) VALUES (?,?,?,?)',
      [fname, lname, email, password]
    );
    res.status(201).json({ message: "User registered successfully"})
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: "Email already exists" })
    }
    console.error(err);
    res.status(500).json({ message: 'Server error' })
  }

}

// need to make a get request in order to repopulate the redux store 
export async function getUserDetails(req,res){
  const {email} = req.query
  if (!email){
    return res.status(400).json({message:'user not identified'})
  }
  try{ 
    const [row] = await pool.query(
      'SELECT * FROM users WHERE email = ? ',
      [email]
    )
    return res.status(200).json({message:'Details successfully fetched',userDetails:row})
  }catch(err){
    console.error(err);
    return res.status(500).json({message:"server errors"})
  }
}