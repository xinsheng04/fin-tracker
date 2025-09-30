import mysql from 'mysql2/promise';
import { config } from '../config.js';

const pool = mysql.createPool(config.db);

/*
?email=userEmail
 */
export const getAllAssetsLiabilities = async (req, res) => {
  const {email} = req.query;
  if (!email){
    return res.status(400).json({ error: 'Controller error: Email is required' });
  }
  try {
    const [rows] = await pool.query('select * from AssetLiability where email=?', [email]);
    return res.status(200).json(rows);
  } catch (error){
    return res.status(500).json({ error: `Controller error: Database query error: ${error.message}` });
  }
}

/*
?email=userEmail
{
  assetLiability: {
    title: string,
    value: number,
    description: string,
    date: string,
    type: "asset" | "liability",
    category: "current" | "fixed",
  }
}
*/

export const addAssetLiability = async (req, res) => {
  const {email} = req.query;
  const {assetLiability} = req.body;
  if(!email || !assetLiability){
    return res.status(400).json({error: 'Controller error: Email and assetLiability data are required'});
  }
  try{
    const {title, value, description, date, type, category} = assetLiability;
    const [result] = await pool.query(
      `insert into AssetLiability (email, title, value, description, acquireDate, type, category)
      values (?,?,?,?,?,?,?);`,
      [email, title, value, description, date, type, category]
    );
    return res.status(201).json({message: 'Asset/Liability entry added', id: result.insertId});
  } catch(error){
    return res.status(500).json({error: `Controller error: Database insertion error: ${error.message}`});
  }
}

/*
?email=userEmail&id=AsLiId
{
  changes: [
    { column: columnName, value: newValue },
  ]
}
*/

export const updateAssetLiabilityEntry = async (req, res) => {
  const {email, id} = req.query;
  const {changes} = req.body;
  if(!id || !email || !changes){
    return res.status(400).json({error: 'Controller error: ID, Email and changes are required'});
  }
  try{
    if(Array.isArray(changes) && changes.length > 0){
      for(const {column, value} of changes){
        await pool.query(`update AssetLiability set ${column}=? where AsLiId=? and email=?`, [value, id, email]);
      }
      return res.status(200).json({message: 'Asset/Liability entry updated'});
    }
    throw new Error('No changes provided');
  } catch(error){
    return res.status(500).json({error: `Controller error: Database update error: ${error.message}`});
  }
}

/*?email=userEmail&id=AsLiId*/
export const deleteAssetLiabilityEntry = async (req, res) => {
  const {email, id} = req.query;
  if(!email || !id){
    return res.status(400).json({error: 'Controller error: Email and ID are required'});
  }
  try{
    const [result] = await pool.query('delete from AssetLiability where AsLiId=? and email=?;', [id, email]);
    if(result.affectedRows > 0){
      return res.status(200).json({message: 'Asset/Liability entry deleted'});
    }
    throw new Error('Asset/Liability entry not found');
  } catch(error){
    return res.status(500).json({error: `Controller error: Database deletion error: ${error.message}`});
  }
}

