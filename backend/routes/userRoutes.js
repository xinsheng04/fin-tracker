import express from 'express';
const router = express.Router();
import test from '../controllers/userController.js';
import {regUser} from '../controllers/userController.js';
import {login} from '../controllers/userController.js';

router.post('/loginUser',login)
router.get('/test',test);
router.post('/register',regUser);

// router.get('/budgeting', {controller})

export default router;