import express from 'express';
import { sendContact } from '../controllers/contactController.js';

const contactRouter = express.Router();
contactRouter.post('/send', sendContact);

export default contactRouter;