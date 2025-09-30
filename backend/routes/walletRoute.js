import express from 'express';
const router = express.Router();
import registerCard from '../controllers/walletController.js';
import { getCards, updateAmount,deleteCard} from '../controllers/walletController.js';
// routes for the wallet
router.post('/regCard', registerCard);
router.get('/getCards', getCards);
router.patch('/changeAmount', updateAmount);
router.delete ('/deleteCard', deleteCard)
export default router;