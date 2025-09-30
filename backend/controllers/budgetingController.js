import mysql from 'mysql2/promise';
import { config } from '../config.js';

const pool = mysql.createPool(config.db);

/*
?email=userEmail
*/

export const getAllBudgetData = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'Controller: Email is required' });
  }
  try {
    const [rows] = await pool.query('select * from budgeting join budgetItem on budgeting.budgetId = budgetItem.budgetId where budgeting.email=?', [email]);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ error: `Controller: Database query error: ${error.message}` });
  }
};
/*
?email=userEmail
{
  title: budgetTitle
  items: [
    {category: category, limitAmount: initialValue}
  ]
}
*/

export const addBudgetEntry = async (req, res) => {
  const { email } = req.query;
  const { title, items } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Controller: Email is required' });
  }
  const todayDate = new Date().toISOString().split('T')[0];
  const date = new Date(todayDate);
  date.setDate(1);
  const firstDay = date.toISOString().split('T')[0];
  try {
    const [result] = await pool.query('insert into budgeting (email, title, trackDateFrom) values (?,?,?)', 
      [email, title, firstDay]
    );
    if(Array.isArray(items) && items.length > 0){
      for(const item of req.body.items){
        await pool.query('insert into budgetItem (budgetId, category, limitAmount) values (?,?,?)', 
          [result.insertId, item.category, item.limitAmount]
        );
      }
      return res.status(201).json({ message: 'Budget entry added', id: result.insertId });
    }
    throw new Error('No budget items provided');
  } catch (error) {
    return res.status(500).json({ error: `Controller: Database insertion error: ${error.message}` });
  }
}

/*
?email=userEmail&id=budgetId
{
  changes: {
    title?: newTitle,
    updatedBudgetItems: [
      {category: category, newLimit: updatedValue}
    ]
  }
}
*/

export const updateBudgetEntry = async (req, res) => {
  const { email, id } = req.query;
  const updateQuery = 'update budgeting set ';
  if (!email || !id) {
    return res.status(400).json({ error: 'Controller: Email and ID are required' });
  }
  try {
    const { changes } = req.body;
    if (changes.title) {
      await pool.query(updateQuery + 'title=? where budgetId=? and email=?', [changes.title, id, email]);
    }
    if (Array.isArray(changes.updatedBudgetItems)) {
      for (const { category, newLimit } of changes.updatedBudgetItems) {
        if(newLimit === ""){
          await pool.query('delete from budgetItem where budgetId=? and category=?', [id, category]);
        } else {
          const [existing] = await pool.query('select category from budgetItem where budgetId=? and category=?', [id, category]);
          if (existing.length > 0) {
            await pool.query('update budgetItem set limitAmount=? where budgetId=? and category=?', [newLimit, id, category]);
          } else {
            await pool.query('insert into budgetItem (budgetId, category, limitAmount) values (?,?,?)', [id, category, newLimit]);
          }
        }
      }
      return res.status(200).json({ message: 'Controller: Budget entry updated' });
    }
    throw new Error('No valid changes provided');
  } catch (error) {
    return res.status(500).json({ error: `Controller: Database update error: ${error.message}` });
  }
}

// ?id=entryId&email=userEmail

export const resetBudgetProgress = async (req, res) => {
  const { id, email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'Controller: Email is required' });
  }
  try {
    const today = new Date().toISOString().split('T')[0];
    await pool.query('update budgeting set trackDateFrom=? where budgetId=? and email=?', [today, id, email]);
    return res.status(200).json({ message: 'Controller: Budget progress reset' });
  } catch (error) {
    return res.status(500).json({ error: `Controller: Database update error: ${error.message}` });
  }
};

// ?id=entryId&email=userEmail

export const deleteBudgetEntry = async (req, res) => {
  const { id, email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'Controller: Email is required' });
  }
  try {
    await pool.query('delete from budgeting where budgetId=? and email=?', [id, email]);
    return res.status(200).json({ message: 'Controller: Budget entry deleted' });
  } catch (error) {
    return res.status(500).json({ error: `Controller: Database deletion error: ${error.message}` });
  }
};