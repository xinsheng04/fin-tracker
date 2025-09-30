import express from 'express';
const router = express.Router();
import { 
  getAllBudgetData, 
  addBudgetEntry, 
  updateBudgetEntry, 
  resetBudgetProgress,
  deleteBudgetEntry
 } from '../controllers/budgetingController.js';

router.get('/budgeting/getAll', getAllBudgetData);
router.post('/budgeting/add', addBudgetEntry);
router.patch('/budgeting/edit', updateBudgetEntry);
router.patch('/budgeting/reset', resetBudgetProgress);
router.delete('/budgeting/delete', deleteBudgetEntry);

export default router;