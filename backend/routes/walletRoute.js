import express from 'express'; 
const router = express.Router();
import registerCard from '../controllers/walletController.js';

router.post('/regCard',registerCard)

export default router;