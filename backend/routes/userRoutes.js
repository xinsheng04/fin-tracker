import express from 'express';
const router = express.Router();
import {loginUser} from '../controllers/userController.js';


router.get('/login',loginUser);


export default router;