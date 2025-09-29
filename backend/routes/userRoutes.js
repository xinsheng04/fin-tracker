import express from 'express';
const router = express.Router();
import loginUser from '../controllers/userController.js';
import {regUser} from '../controllers/userController.js';

router.get('/login',loginUser);
router.post('/register',regUser);

// router.get('/budgeting', {controller})

export default router;