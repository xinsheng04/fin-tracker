import express from 'express';
const router = express.Router();

import {
  getAllTransactionData,
  addTransactionEntry
} from '../controllers/transactionController.js';

router.get('/transactions/getAll', getAllTransactionData);
router.post('/transactions/add', addTransactionEntry);

export default router;