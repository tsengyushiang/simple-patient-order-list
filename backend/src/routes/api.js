import express from 'express';
import PatientController from '../controllers/PatientController.js';

const router = express.Router();

// Root API route
router.get('/', PatientController.getAll);

export default router;
